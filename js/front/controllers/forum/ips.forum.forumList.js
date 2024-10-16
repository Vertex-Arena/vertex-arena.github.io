/**
 * Invision Community
 * (c) Invision Power Services, Inc. - https://www.invisioncommunity.com
 *
 * ips.forum.forumList.js - Controller for a forum listing
 *
 * Author: Rikki Tissier
 */
;( function($, _, undefined){
	"use strict";

	ips.controller.register('forums.front.forum.forumList', {
		initialize: function () {
			this.on( 'click', '[data-action="toggleCategory"]', this.toggleCategory );
			this.on( 'markedAsRead', this.forumMarkedRead );
			this.setup();
		},

		/**
		 * Setup method
		 * Hides categories the user has already hidden
		 *
		 * @returns {void}
		 */
		setup: function () {
			var self = this;
			var hiddenCategories = ips.utils.db.get( 'hiddenCategories' );

			if( _.isObject( hiddenCategories ) && _.size( hiddenCategories ) ){
				_.each( hiddenCategories, function (val, key) {
					self.scope.find('[data-categoryID="' + key + '"]')
						.addClass('cForumRow_hidden')
						.attr( 'data-hidden', true )
						.find( '[data-role="forums"]' )
							.hide();
				});
			}
		},

		/**
		 * Event handler for toggling a category
		 * Hidden categories are stored localDB
		 *
		 * @param 	{event} 	e 	Event object
		 * @returns {void}
		 */
		toggleCategory: function (e) {
			e.preventDefault();

			var category = $( e.currentTarget ).closest('[data-categoryID]');

			if( !category.attr('data-hidden') ){
				ips.utils.db.set( 'hiddenCategories', category.attr('data-categoryID'), true );
				category
					.addClass('cForumRow_hidden')
					.attr( 'data-hidden', true )
					.find('[data-role="forums"]')
						.hide();
			} else {
				ips.utils.anim.go( 'fadeIn', category.find('[data-role="forums"]') );
				ips.utils.db.remove( 'hiddenCategories', category.attr('data-categoryID') );
				category
					.removeClass('cForumRow_hidden')
					.removeAttr( 'data-hidden' );
			}
		},

		/**
		 * Event handler for a forum being marked as read
		 * We need to do some extra work for grid-style forums
		 *
		 * @param 	{event} 	e 	Event object
		 * @returns {void}
		 */
		forumMarkedRead: function(e) {
			$( e.target ).closest( '.cForumGrid' ).removeClass('cForumGrid--unread').removeClass('ipsDataItem_unread').addClass('cForumGrid--read');
		}
	});
}(jQuery, _));