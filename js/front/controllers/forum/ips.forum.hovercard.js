/**
 * Invision Community
 * (c) Invision Power Services, Inc. - https://www.invisioncommunity.com
 *
 * ips.forum.hovercard.js - Topic hovercard in forum view
 *
 * Author: Rikki Tissier
 */
;( function($, _, undefined){
	"use strict";

	ips.controller.register('forums.front.forum.hovercard', {

		initialize: function () {
			this.on( 'click', '[data-action="markTopicRead"]', this.markTopicRead );
		},

		/**
		 * Marks a topic read from inside a hovercard
		 *
		 * @param 	{event} 	e 	Event object
		 * @returns {void}
		 */
		markTopicRead: function (e) {
			e.preventDefault();

			// Ignore if we've already done this
			if( $( e.currentTarget ).attr('data-disabled') ){
				return;
			}

			// Trigger event for table to mark the row
			this.trigger( 'markTableRowRead', {
				tableID: 'topics',
				rowID: this.scope.attr('data-topicID')
			});

			// Let the user know
			ips.ui.flashMsg.show( ips.getString('topicMarkedRead') );

			// And do the actual request
			ips.getAjax()( $( e.currentTarget ).attr('href'), {
				bypassRedirect: true
			});

			// Hide the link
			$( e.currentTarget ).addClass('ipsFaded').attr('data-disabled');
		}
	});
}(jQuery, _));