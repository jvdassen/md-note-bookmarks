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
		$.ajax({
			  type: "POST",
			  url: 'http://localhost:8080/bookmarks/',
			  data: {
					url: jQuery('#url').val(),
					description: jQuery('#comment').val(),
					title: jQuery('#usr').val()
				}
		});
	});
	jQuery('#bookmark-submit').click(function(){
		$.ajax({
				type: "POST",
				url: 'http://localhost:8080/bookmarks/',
				data: {
					url: jQuery('#invisible').text(),
					description: jQuery('#comment').val(),
					title: jQuery('#usr').val()
				}
		});
		console.log(jQuery('#invisible').text())
	});
	jQuery('#bookmark-item').click(function(){
		console.log(jQuery(this).children('a').click());
	});


});
