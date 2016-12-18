// jQuery('#he3').click(function(){
//
// $.ajax({
// 	  type: "POST",
// 	  url: 'http://localhost:8080/bookmarks/',
// 	  data: {
// 			url: jQuery('#url').val(),
// 			description: jQuery('#description').val(),
// 			title: jQuery('#usr').val()
// 		}
// });
//
// });
jQuery( document ).ready(function() {

	jQuery('#bookmark-submit-manual').click(function(){
		url = jQuery('#url').val();
		if (!url.match(/http/i)) {
			url = 'http://' + url;
		}
		$.ajax({
			  type: "POST",
			  url: 'http://localhost:8080/bookmarks/',
			  data: {
					url: url,
					description: jQuery('#comment').val(),
					title: jQuery('#usr').val()
				}
		});
		window.location.href = "/bookmarks";
	});
	jQuery('#bookmark-submit').click(function(){
		url = jQuery('#invisible').text()
		if (!url.match(/http/i)) {
			url = 'http://' + url;
		}
		$.ajax({
				type: "POST",
				url: 'http://localhost:8080/bookmarks/',
				data: {
					url: url,
					description: jQuery('#comment').val(),
					title: jQuery('#usr').val()
				}
		});
		console.log(jQuery('#invisible').text())
		window.location.href = "/bookmarks";

	});

	jQuery('.bookmark-item').click(function(){
		console.log(jQuery(this).children('a').attr('href'))
		window.location.href = jQuery(this).children('a').attr('href');
	});


});
