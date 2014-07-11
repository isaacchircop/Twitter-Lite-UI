$(document).ready(function() {

	$("#button").click(function(){
		var username = $("#username").text();
		var content = $("#content").text();
		
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
		
	});

});

