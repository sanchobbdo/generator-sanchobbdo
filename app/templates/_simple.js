var <%= _.classify(siteName) %> = <%= _.classify(siteName) %> || {};
<%= _.classify(siteName) %>.Site = (function(){
	'use strict';
	$(document).on('ready', function(){
		// TODO(dev): Write here the Javascript

		var <%= _.classify(siteName) %> = {
			init: function () {
				this.bindUIActions();

				// Placeholder Polyfill
				$('input, textarea').placeholder();
			},
			bindUIActions: function () {

				$('#id').on('click', function (e) {
					//actions
					e.preventDefault();
				});

				//GOOGLE ANALYTICS EVENTS
				$('.btn').on('click', function () {
					var title = $(this).text();

					ga('send', {
						'hitType': 'event',          // Required.
						'eventCategory': 'button',   // Required.
						'eventAction': 'click',      // Required.
						'eventLabel': 'Clic en: ' + title
					});
				});
			}
		};

		<%= _.classify(siteName) %>.init();

	});

}());