var offset = 0;
var limit = 25;

function searchUser() {
	
	console.log("searching user");

}

function appendTweet(tweet){
	for (var i = 0; i < tweet.hashtags.length; i++) {
		var regex = new RegExp("#" + tweet.hashtags[i],"i");
	    var htMatches = tweet.content.match(regex);
	   
		tweet.content = tweet.content.substr(0, htMatches.index) + "<a class='hashtag'>#" + tweet.hashtags[i] + "</a>" + tweet.content.substr(tweet.hashtags[i].length + htMatches.index + 1);
	    
	}

	$("#tweet-container").append("<div class='panel panel-default'><div class='panel-body'><b class='red'><a class='userMention'>@" + tweet.username + ":</a></b> " + tweet.content + "</div></div>");
}

$(document).ready(function(){
	$.get("http://localhost:8080/twitterlite/messages", { offset:offset, limit:limit }, function(data){
		for (var i = 0; i < data.length; i++) {
		   appendTweet(data[i]);
		}

		offset = offset + limit;
	});

	$("#moreTweets").click(function(){
		$.get("http://localhost:8080/twitterlite/messages", { offset:offset, limit:limit }, function(data){
			if (data.length != 0){
				for (var i = 0; i < data.length; i++) {
				    appendTweet(data[i]);
				}

				offset = offset + limit;
			}
		});
	});

	$("#button").click(function(){
	
		var valid = true;
	
		var username = $("#username").val();
		var content = $("#content").val();
		
		if (username == "") {
		
			valid = false;
			$("#usernameError").text("* Empty Username Field");
		
		}
		
		if (content == "") {
		
			valid = false;
			$("#messageError").text("* Empty Content Field");
		
		}
		
		if (valid == true) {
		
			$.ajax({
				url: 'http://localhost:8080/twitterlite/tweets',
				type: 'POST',
				data: {
				
					username: $("#username").val(),
					content: $("#content").val()
				
				},
				success: function(data){
				
					console.log("OK");
				
				}
			});
			
			}
		
	});
	
	$("#tweet-container").on("click", ".userMention", function() {
		console.log("Searching");
	})
	$("#tweet-container").on("click", ".hashtag", function(data) {
		window.location.href = "hashtag.html?" + data.currentTarget.innerText.substr(1);
	})

});