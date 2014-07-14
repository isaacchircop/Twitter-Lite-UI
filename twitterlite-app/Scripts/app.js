var offset = 0;
var limit = 25;

$(document).ready(function(){
	$.get("http://localhost:8080/twitterlite/messages", { offset:offset, limit:limit }, function(data){
		for (var i = 0; i < data.length; i++) {
		    $("#tweet-container").append("<div class='panel panel-default'><div class='panel-body'><b class='red'><a class = \"userMention\">@" + data[i].username + "</a>:</b> " + data[i].content + "</div></div>");
		}

		offset = offset + limit;
	});

	$("#moreTweets").click(function(){
		$.get("http://localhost:8080/twitterlite/messages", { offset:offset, limit:limit }, function(data){
			if (data.length != 0){
				for (var i = 0; i < data.length; i++) {
				    $("#tweet-container").append("<div class='panel panel-default'><div class='panel-body'><b class='red'><a class = \"userMention\">@" + data[i].username + "</a>:</b> " + data[i].content + "</div></div>");
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
				
					username: username,
					content: content
				
				},
				success: function(data){
				
					$("#tweet-container").prepend("<div class='panel panel-default'><div class='panel-body'><b class='red'><a class = \"userMention\">@" + username + "</a>:</b> " + content + "</div></div>");
				
				}
			});
			
		}
		
	});
	
	$("#tweet-container").on("click", ".userMention", function() {
	
		var user = $(this).text().substring(1);
		
		$.get("http://localhost:8080/twitterlite/messages/user/" + user, { offset:0, limit:25 }, function(data){
		
			var searchWindow = window.open('search-results.html', 'Search results for user ' + user);
		
			if (data.length != 0){
			
				for (var i = 0; i < data.length; i++) {
				
				    $(searchWindow.search-container).append("<div class='panel panel-default'><div class='panel-body'><b class='red'><a class = \"userMention\">@" + data[i].username + "</a>:</b> " + data[i].content + "</div></div>");
				
				}
			}
			
			
			
		});
		
	});
	
});