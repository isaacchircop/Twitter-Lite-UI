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
});