(function( $ ) {
	'use strict';

	$.fn.talkative = function(options) {

		var settings = $.extend({
			selector: 'span',
			start: 1000,  // first rotation after (ms)
			delay: 4000, // delay between rotation (ms)
			animation_delay: 600
		}, options );

		if (settings.animation_delay < 100)
			settings.animation_delay = 100;
		if (settings.delay <= settings.animation_delay)
			settings.delay = settings.animation_delay + 100;

		this.filter( "div, p" ).each(function() {
			var $el = $(this);

			var alternatives = $el.find(settings.selector);
			if (alternatives.length < 1)
			  return;

			var $container = $('<div class="talkative-container"></div>').appendTo($el);
			var rgba = $container.css('color').replace('rgb(', '').replace(')', ', 0.5');
			$(alternatives).prependTo($container);

			// adjust container height
			var $first = $(alternatives[0]);
			var h = $first.outerHeight(true); // full element height including margins
			$el.innerHeight(h);

			var timeout = setTimeout(rotate, settings.start);
			function rotate() {
				var alternative = getRandomFromjQueryObject(alternatives);
				if (!alternative)
					return console.log('Unable to find next alternative for '+$el);

				// calculate alternative position
				var $alternative = $(alternative);
				var top = $alternative.position().top;

				// blur
				$container.addClass('roll');
				$(alternatives).css('text-shadow', '0 0 5px rgba('+rgba+')');

				// animate
				$container.animate({
					'top': '-'+top+'px'
				}, settings.animation_delay, function() {
					$container.removeClass('roll');
					$(alternatives).css('text-shadow', 'none');
				});

				//console.log($alternative.text(),top);

				var timeout = setTimeout(rotate, settings.delay);
			}
		});

		function getRandomFromjQueryObject(arr) {
			for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
			return arr[0];
		};

		return this;

	};

}( jQuery ));


