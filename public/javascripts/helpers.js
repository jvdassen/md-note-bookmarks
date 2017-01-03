jQuery( document ).ready(function() {
	var deleting = false;

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
				},
				success: function(){
					window.location.href = "/bookmarks";
				}
		});
		console.log(jQuery('#invisible').text())
		window.location.href = "/bookmarks";

	});

	jQuery('.bookmark-item').click(function(){
		console.log(jQuery(this).children('a').attr('href'))
		window.location.href = jQuery(this).children('a').attr('href');
	});
	jQuery('#delete-btn').click(function(){
		jQuery('.bookmark-item').css('outline', 'none')
		jQuery('.bookmark-item').hover(
			function(){
				jQuery(this).css('outline', '1px solid rgb(180,180,180)');},
			function(){
				jQuery(this).css('outline', 'none');
		});
		jQuery('.bookmark-item').click(function(e){
			e.preventDefault();
			jQuery(this).remove();
		});
	});


	// jQuery('#delete-btn').click(function(){
	// 	jQuery('.bookmark-item').css('filter', 'blur(2px)')
	// 	jQuery('.bookmark-item').hover(
	// 		function(){
	// 			jQuery(this).css('filter', 'none')},
	// 		function(){
	// 			jQuery(this).css('filter', 'blur(2px)')
	// 	});
	// 	jQuery('.bookmark-item').click(function(e){
	// 		e.preventDefault();
	// 		jQuery(this).remove();
	// 	});
	// });


});
