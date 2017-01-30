jQuery( document ).ready(function() {
	var deleting = false;
	jQuery('#title-search-bar').focus()


	var tagheader = '<ul id="tag-highlight" class="nav navbar-nav">'
	// adds a new selector containsi for case-insensitive matching
	jQuery.extend(jQuery.expr[':'], {
  'containsi': function(elem, i, match, array){
    return (elem.textContent || elem.innerText || '').toLowerCase()
    .indexOf((match[3] || "").toLowerCase()) >= 0;
  	}
	});

	jQuery.get({
		url: '/bookmarks/tags/',
		dataType: 'json',
		success: (data)=>{
			sortedtags = Object.keys(data).sort(function(a,b){return data[a]-data[b]});
			jQuery(sortedtags.slice(-5).reverse()).each(function(i,tag){
				tagheader += '<li class="navbar-tag"><a href=#>' + tag.toUpperCase()
					+'</a></li>'
			});
			jQuery('.tag-navbar').append(tagheader + '</ul>');
			jQuery('.navbar-tag').click(function(){
				var tag = jQuery(this).text().toLowerCase();
				jQuery('.bookmark-item').hide();
				jQuery('.label-info:containsi(' + tag +')').parent().parent().show()

			});
		},

	});

	jQuery('#title-search-bar').keydown(function(){
		var userinput = jQuery(this).val();
		jQuery('.bookmark-item').hide();
		jQuery('.bookmark-title:containsi(' + userinput +')').parent().show()
		// TODO allow this to be deleted on a global level
		jQuery('.bookmark-url:containsi(' + userinput +')').parent().show()
		jQuery('.bookmark-description:containsi(' + userinput +')').parent().show()

	});

	jQuery('#bookmark-submit-manual').click(function(){
		url = jQuery('#url').val();
		if (!url.match(/http/i)) {
			url = 'http://' + url;
		}
		jQuery.ajax({
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
		window.location.href = "/bookmarks";
	});

	jQuery('.bookmark-item').click(function(){
		if (!deleting) {
			if (!jQuery(this).children('button').data('clicked')) {
				window.location.href = jQuery(this).children('a').attr('href');
			}
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
					jQuery(this).css('outline', '1px solid rgb(180,180,180)');
				}
				, function(){
					jQuery(this).css('outline', 'none');
			});
		}
		else {
			deleting = false;
			jQuery('#delete-btn').parent().attr('class','');
			jQuery('#delete-btn').text('DELETE');

		}
	});
	jQuery('.bookmark-item').hover(function(){
		if (!deleting) {
			var bmid = jQuery(this).attr('data');

			bmid = bmid.replace('"', '').replace('"', '');
			jQuery(this).css('background-image', 'url("/bookmarks/snapshot/' + bmid + '")');
			jQuery(this).css('background-size', 'cover');
			jQuery(this).children().hide();
			jQuery('.bookmark-newtab-btn').show();

		}
	}
	,function(){
		jQuery(this).css('background-image', 'none');

		jQuery(this).children().show();
		jQuery('.bookmark-newtab-btn').hide();

	});

	jQuery('.bookmark-newtab-btn').click(function() {
		jQuery(this).data('clicked', true);
		window.open(jQuery(this).parent().children('a').attr('href'), '_blank');
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
