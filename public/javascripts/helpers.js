jQuery( document ).ready(function() {
	var deleting = false;

	jQuery('#bookmark-submit-manual').click(function(){
		url = jQuery('#url').val();
		if (!url.match(/http/i)) {
			url = 'http://' + url;
		}
		$.ajax({
			  type: "POST",
			  url: '/bookmarks/',
			  data: {
					url: url,
					description: jQuery('#comment').val(),
					title: jQuery('#usr').val(),
					tags: jQuery('#tags').tagsinput('items')
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
				url: '/bookmarks/',
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
		if (!deleting) {
			window.location.href = jQuery(this).children('a').attr('href');
		}
		else {
			jQuery(this).parent().remove();
			var dataid = jQuery(this).attr('data').replace(/^"/, '').replace(/"$/, '');
			jQuery.ajax({
				url: '/bookmarks/' + dataid,
				type: 'DELETE',
				success: function(data) {
					console.log(data);
				}
			});
			console.log('deleting: ' + dataid);
		}
	});

	jQuery('#delete-btn').click(function(){
		if (!deleting) {
			deleting = true;
			jQuery('#delete-btn').parent().attr('class','active');
			jQuery('#delete-btn').text('X');
			jQuery('.bookmark-item').css('outline', 'none');
			jQuery('.bookmark-item').hover(
				function(){
					jQuery(this).css('outline', '1px solid rgb(180,180,180)');},
				function(){
					jQuery(this).css('outline', 'none');
			});
		}
		else {
			deleting = false;
			jQuery('#delete-btn').parent().attr('class','');
			jQuery('#delete-btn').text('DELETE');

		}
	});
	jQuery('#brand-icon-container').hover(
		function() {
			jQuery('#brand-icon').attr('src', '/images/inclined-puspin-32-active.png')
		},
		function(){
			if (jQuery('#brand-icon').attr('class') !== 'brand-active') {
				jQuery('#brand-icon').attr('src', '/images/inclined-puspin-32-inactive.png')
			}
		}
	);

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
