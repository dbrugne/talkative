(function( $ ) {
	'use strict';

	$.fn.talkative = function(options) {

		var settings = $.extend({
			selector: 'span',
			start: 1000,  // first rotation after (ms)
			delay: 4000, // delay between rotation (ms)
			animation_delay: 600,
			mode: 'natural'
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
			var $alternatives = $(alternatives);
			$alternatives.prependTo($container);

			// adjust container height
			var $first = $(alternatives[0]);
			var h = $first.outerHeight(true); // full element height including margins
			$el.innerHeight(h);

			// on first run the first element is the current
			var current = '0'; // top: 0
			var $current = $first;

			var timeout = setTimeout(rotate, settings.start);
			function rotate() {
				// choose next
				var next;
				if (settings.mode == 'random')
					next = getRandomFromjQueryObject(alternatives);
				else
					next = getNextFromjQueryObject(alternatives, $current);
				if (!next)
					return console.log('Unable to find next alternative for ', $el);

				// calculate next position
				var $next = $(next);
				var top = $next.position().top;

				// next is already displayed
				if (current == top) {
					timeout = setTimeout(rotate, settings.delay);
					return;
				}

				// blur
				$container.addClass('roll');
				$alternatives.css('text-shadow', '0 0 5px rgba('+rgba+')');

				// animate
				$container.animate({
					'top': '-'+top+'px'
				}, settings.animation_delay, function() {
					$container.removeClass('roll');
					$alternatives.css('text-shadow', 'none');
				});

				current = top;
				$current = $next;
				timeout = setTimeout(rotate, settings.delay);
			}
		});

		function getNextFromjQueryObject(o, current) {
			var nextIndex = o.index(current) + 1;

			// end of list
			if (nextIndex >= o.length) {
				nextIndex = 0;
			}

			return o[nextIndex];
		}

		function getRandomFromjQueryObject(o) {
			for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			return o[0];
		};

		return this;

	};

}( jQuery ));


