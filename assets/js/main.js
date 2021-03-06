/*
	Full Motion by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {

	// Define breakpoints for responsiveness
	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	// Handling for qtip tool tips
	$(document).ready(function() {
		$('.qtip-container').each(function() {
			$(this).qtip({
				content: {
					text: $(this).next('.qtip-text')
				},
				style: {
					classes: 'qtip-tipsy'
				},
				position: {
					my: 'top center',
					at: 'bottom center',
					target: $(this)
				}
			});
		});
	});

	$(function() {

		var $window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
		$body.addClass('is-loading');

		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-loading');
			}, 100);
		});

		// Fix: Placeholder polyfill.
		$('form').placeholder();

		// Banner.
		var $banner = $('#banner');

		if ($banner.length > 0) {

			// IE fix.
			if (skel.vars.IEVersion < 12) {

				$window.on('resize', function() {

					var wh = $window.height() * 0.60,
						bh = $banner.height();

					$banner.css('height', 'auto');

					window.setTimeout(function() {

						if (bh < wh)
							$banner.css('height', wh + 'px');

					}, 0);

				});

				$window.on('load', function() {
					$window.triggerHandler('resize');
				});

			}

			// Video check.
			var video = $banner.data('video');

			if (video)
				$window.on('load.banner', function() {

					// Disable banner load event (so it doesn't fire again).
					$window.off('load.banner');

					// Append video if supported.
					if (!skel.vars.mobile
						&& !skel.breakpoint('large').active
						&& skel.vars.IEVersion > 9)
						$banner.append('<video autoplay loop><source src="' + video + '.mp4" type="video/mp4" /><source src="' + video + '.webm" type="video/webm" /></video>');

				});

			// More button.
			$banner.find('.more')
				.addClass('scrolly');

		}

		// // Mouseover Video
		// var $mouseover = $('.mouseover');
		//
		// $mouseover.on('mouseenter', function() {
		// 	$mouseover.get(0).play();
		// });
		//
		// $mouseover.on('mouseout', function() {
		// 	$mouseover.get(0).pause();
		// 	$mouseover.get(0).currentTime = 0;
		// });


		/****************************************************************************
		X.X - Play-on-Hover Video */

		var figure = $("video.mouseover");

		[].forEach.call(figure, function (item,index) {
		    item.addEventListener('mouseover', hoverVideo.bind(item,index), false);
		    item.addEventListener('mouseout', hideVideo.bind(item,index), false);
		});

		function hoverVideo(index, e) {
		    figure[index].play();
		}

		function hideVideo(index, e) {
		    figure[index].pause();
				figure[index].currentTime = 0;
		}



		// Scrolly.
		$('.scrolly').scrolly();

		// Poptrox.
		$window.on('load', function() {

			var $thumbs = $('.poptrox');

			if ($thumbs.length > 0)
				$thumbs.poptrox({
					onPopupClose: function() { $body.removeClass('is-covered'); },
					onPopupOpen: function() { $body.addClass('is-covered'); },
					baseZIndex: 10001,
					useBodyOverflow: false,
					overlayColor: '#222226',
					overlayOpacity: 0.75,
					popupLoaderText: '',
					fadeSpeed: 500,
					usePopupDefaultStyling: false,
					windowMargin: (skel.breakpoint('small').active ? 5 : 50)
				});

		});

		// Initial scroll.
		$window.on('load', function() {
			$window.trigger('scroll');
		});

	});

})(jQuery);
