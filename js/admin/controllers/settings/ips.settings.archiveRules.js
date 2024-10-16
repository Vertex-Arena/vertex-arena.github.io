/**
 * Invision Community
 * (c) Invision Power Services, Inc. - https://www.invisioncommunity.com
 *
 * ips.forums.archiveRules.js - makes the progress bar increase as archive rules settings are changed
 *
 * Author: Mark Wade
 */
;( function($, _, undefined){
	"use strict";

	ips.controller.register('forums.admin.settings.archiveRules', {

		initialize: function () {
			this.on( 'change', 'input,select', this.changeField );
			this.on( 'nodeSelectedChanged', '.ipsSelectTree', this.changeField );
			this.on( 'tokenAdded', '[data-ipsAutocomplete]', this.changeField );
			this.on( 'tokenDeleted', '[data-ipsAutocomplete]', this.changeField );
			this.setup();
		},
		
		setup: function () {
			var currentPercentage = parseInt( this.scope.find('[data-role="percentage"]').text() );

			this.scope
				.find('.ipsProgressBar')
					.toggleClass('ipsFaded', !currentPercentage );
		},

		/**
		 * Save the keywords
		 *
		 * @param 	{event} 	e 	Event object
		 * @returns {void}
		 */
		changeField: function (e) {			
			var form = $( e.currentTarget ).closest('form');
			var self = this;
			
			ips.getAjax()( form.attr('action') + '&getCount=1', {
				data: form.serialize(),
				type: 'post'
			}).done( function (response) {									

				var currentPercentage = parseInt( self.scope.find('[data-role="percentage"]').text() );

				self.scope
					.find('.ipsProgressBar')
						.toggleClass('ipsFaded', !parseInt( response.percentage ) )
					.end()
					.find('[data-role="percentage"]')
						.text( response.percentage )
					.end()
					.find('[data-role="number"]')
						.text( response.count )
					.end()
					.find('[data-role="percentageBar"]')
						.animate( { 'width': response.percentage + '%' }, 'fast' );
			}).fail(function(err){
				// Nothing
			});
		},
	});
}(jQuery, _));
