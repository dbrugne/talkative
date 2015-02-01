(function( $ ) {
	'use strict';

	$.fn.talkative = function(options) {

		var settings = $.extend({
			selector: 'span',
			start: 1000,  // first rotation after (ms)
			delay: 4000, // delay between rotation (ms)
			animation: true
		}, options );

		this.filter( "div, p" ).each(function() {
			var $el = $(this);
			$el.css('color', 'red');

			var alternatives = $el.find(settings.selector);
			if (alternatives.length < 1)
			  return;

			$(alternatives).css('display', 'block'); // doing this by JS avoid all content to be displayed on page load

			var $container = $('<div></div>').appendTo($el);
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

				var $alternative = $(alternative);

				var top = $alternative.position().top;
				$container.css('top', '-'+top+'px');

				console.log($alternative.text(),top);

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


