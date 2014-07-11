var offset = 0;
var limit = 25;

$(document).ready(function(){
	$.get("http://localhost:8080/twitterlite/messages", { offset:offset, limit:limit }, function(data){
		for (var i = 0; i < data.length; i++) {
		    $("#tweet-container").append("<div class='panel panel-default'><div class='panel-body'><b class='red'>@" + data[i].username + ":</b> " + data[i].content + "</div></div>");
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
		var username = $("#username").val();
		var content = $("#content").val();
		
		$.ajax({
			url: 'http://localhost:8080/twitterlite/tweets',
			type: 'POST',
			data: {
				username: username,
				content: content
			},
			success: function(data){
				$("#tweet-container").prepend("<div class='panel panel-default'><div class='panel-body'><b class='red'>@" + username + ":</b> " + content + "</div></div>");
			}
		});
		
	});
});