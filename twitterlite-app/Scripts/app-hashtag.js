var offset = 0;
var limit = 25;

function appendTweet(tweet){
	for (var i = 0; i < tweet.hashtags.length; i++) {
		var regex = new RegExp("#" + tweet.hashtags[i],"i");
	    var htMatches = tweet.content.match(regex);
	   
		tweet.content = tweet.content.substr(0, htMatches.index) + "<a class='hashtag'>#" + tweet.hashtags[i] + "</a>" + tweet.content.substr(tweet.hashtags[i].length + htMatches.index + 1);
	    
	}

	for (var i = 0; i < tweet.mentions.length; i++) {
		var regex = new RegExp("@" + tweet.mentions[i],"i");
	    var menMatches = tweet.content.match(regex);
	   
		tweet.content = tweet.content.substr(0, menMatches.index) + "<a class='mention'>@" + tweet.mentions[i] + "</a>" + tweet.content.substr(tweet.mentions[i].length + menMatches.index + 1);
	    
	}

	$("#tweet-container").append("<div class='panel panel-default'><div class='panel-body'><b class='red'><a class='user'>@" + tweet.username + "</a>:</b> " + tweet.content + "</div></div>");
}

$(document).ready(function(){
	$.get("http://localhost:8080/twitterlite/messages/hashtags/" + window.location.search.substr(1), { offset:offset, limit:limit }, function(data){
		for (var i = 0; i < data.length; i++) {
		   appendTweet(data[i]);
		}

		offset = offset + limit;
	});

	$("#moreTweets").click(function(){
		$.get("http://localhost:8080/twitterlite/messages/hashtags/" + window.location.search.substr(1), { offset:offset, limit:limit }, function(data){
			if (data.length != 0){
				for (var i = 0; i < data.length; i++) {
				    appendTweet(data[i]);
				}

				offset = offset + limit;
			}
		});
	});
	
	$("#tweet-container").on("click", ".user", function(data) {
		window.location.href = "user.html?" + data.currentTarget.innerText.substr(1);
	})
	$("#tweet-container").on("click", ".hashtag", function(data) {
		window.location.href = "hashtag.html?" + data.currentTarget.innerText.substr(1);
	})
	$("#tweet-container").on("click", ".mention", function(data) {
	
		window.location.href = "mention.html?" + data.currentTarget.innerText.substr(1);
		
	})

});