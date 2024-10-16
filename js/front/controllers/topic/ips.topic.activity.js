/**
 * Invision Community
 * (c) Invision Power Services, Inc. - https://www.invisioncommunity.com
 *
 * ips.topic.activity.js - Topic activity controller
 *
 * Author: Rikki Tissier
 */
;( function($, _, undefined){
	"use strict";

	ips.controller.register('forums.front.topic.activity', {

		initialize: function () {
            this.on('click', '[data-action="toggleOverview"]', this.toggleOverview );
        },
        
        toggleOverview: function (e) {
            e.preventDefault();

            if( this.scope.hasClass('cTopicOverview--expanded') ){
                this.scope.find('[data-role="preview"]').removeClass('ipsHide');
                this.scope.find('[data-role="overview"]').addClass('ipsHide');
                this.scope.removeClass('cTopicOverview--expanded');
            } else {
                this.scope.find('[data-role="preview"]').addClass('ipsHide');
                this.scope.find('[data-role="overview"]').removeClass('ipsHide');
                this.scope.addClass('cTopicOverview--expanded');
            }
        }
	});
}(jQuery, _));