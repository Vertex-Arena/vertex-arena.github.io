/**
 * Invision Community
 * (c) Invision Power Services, Inc. - https://www.invisioncommunity.com
 *
 * ips.forum.forumPage.js - Forum page controller
 *
 * Author: Rikki Tissier
 */
;( function($, _, undefined){
	"use strict";

	ips.controller.register('forums.front.forum.forumPage', {

		initialize: function () {
			this.on( 'click', '[data-action="markForumRead"]', this.markForumRead );
		},

		/**
		 * Marks all topics in a forum table as read, triggering an event on the table
		 *
		 * @param 	{event} 	e 	Event object
		 * @returns {void}
		 */
		markForumRead: function (e) {
			e.preventDefault();

			var self = this;

			ips.ui.alert.show( {
				type: 'confirm',
				icon: 'question',
				message: ips.getString('markForumAsReadConfirm'),
				subText: '',
				callbacks: {
					ok: function () {
						var url = $( e.currentTarget ).attr('href');

						ips.getAjax()( url, {
							showLoading: true,
							bypassRedirect: true
						})
							.done( function () {
								// Trigger event on the table to hide unread markets
								self.triggerOn( 'core.global.core.table', 'markTableRead' );

								// Hide the link we've just clicked
								ips.utils.anim.go( 'fadeOut', $( e.currentTarget ) );

								ips.ui.flashMsg.show( ips.getString('forumMarkedRead') );
							})
							.fail( function (jqXHR, textStatus, errorThrown) {
								window.location = url;
							});
					}
				}
			});
		}
	});
}(jQuery, _));