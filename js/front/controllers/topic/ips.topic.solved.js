/**
 * Invision Community
 * (c) Invision Power Services, Inc. - https://www.invisioncommunity.com
 *
 * ips.topic.solved.js - Topic view controller
 *
 * Author: Matthew Mecham
 */
;( function($, _, undefined){
	"use strict";

	ips.controller.register('forums.front.topic.solved', {

		initialize: function () {
			this.on( 'click', '[data-action="mailSolvedReminders"]', this.mailSolvedReminders );
		},
		
		/**		
		 * Toggle on email reminders to come back and mark replies as the solution
		 *
		 * @param 	{event} 	e 	Event object
		 * @returns {void}
		 */
		mailSolvedReminders: function (e) {
			e.preventDefault();
			var _self = this;
			
			// Load the content
			ips.getAjax()( ips.getSetting('baseURL') + 'index.php?app=core&module=system&controller=ajax&do=subscribeToSolved' )
				.done( function (response) {
					var elem = _self.scope.find('[data-action="mailSolvedReminders"]');
					
					ips.utils.anim.go( 'fadeOutDown', elem );
					ips.ui.flashMsg.show( response.message, { timeout: 5 } );
			});
		}
	});
}(jQuery, _));