var offset = 0;
var limit = 25;

$(document).ready(function(){
	$.get("http://localhost:8080/twitterlite/messages", { offset:offset, limit:limit }, function(data){
		for (var i = 0; i < data.length; i++) {
		    $("#tweet-container").append("<div class='panel panel-default'><div class='panel-body'><b class='red'><span id=\"userMention\" onClick=\"searchUser\">@" + data[i].username + ":</span></b> " + data[i].content + "</div></div>");
		}

		offset = offset + limit;
	});

	$("#moreTweets").click(function(){
		$.get("http://localhost:8080/twitterlite/messages", { offset:offset, limit:limit }, function(data){
			if (data.length != 0){
				for (var i = 0; i < data.length; i++) {
				    $("#tweet-container").append("<div class='panel panel-default'><div class='panel-body'><b class='red'>@" + data[i].username + ":</b> " + data[i].content + "</div></div>");
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
	
	fucntion searchUser() {
	
		console.log("searching user");
	
	}
	
	
	
	
});