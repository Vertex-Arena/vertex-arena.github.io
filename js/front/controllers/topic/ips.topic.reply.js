/**
 * Invision Community
 * (c) Invision Power Services, Inc. - https://www.invisioncommunity.com
 *
 * ips.topic.reply.js - Topic reply controller for "Reply" button
 *
 * Author: Rikki Tissier
 */
;( function($, _, undefined){
	"use strict";

	ips.controller.register('forums.front.topic.reply', {

		initialize: function () {
			this.on( 'click', '[data-action="replyToTopic"]', this.replyToTopic );
		},

		/**
		 * Handles a click on the reply to topic button. Triggers an event caught by the main topic view controller.
		 *
		 * @param 	{event} 	e 	Event object
		 * @returns {void}
		 */
		replyToTopic: function (e) {
			$( document ).trigger( 'replyToTopic' );
		}
	});
}(jQuery, _));