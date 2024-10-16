/**
 * Invision Community
 * (c) Invision Power Services, Inc. - https://www.invisioncommunity.com
 *
 * ips.topic.answers.js - Profile body controller
 *
 * Author: Rikki Tissier
 */
;( function($, _, undefined){
	"use strict";

	ips.controller.register('forums.front.topic.answers', {

		ajaxObj: null,

		/**
 		 * Initialize controller events
		 *
		 * @returns 	{void}
		 */
		initialize: function () {
			this.on( 'click', 'a.cAnswerRate', this.rate );
		},

		/**
		 * Rate answers
		 *
		 * @param 	{event} 	e 	Event object
		 * @returns {void}
		 */
		rate: function (e) {
			e.preventDefault();

			var self = this;
			var clicked = $( e.currentTarget );

			if( this.scope.find('.cAnswerRate_up').is('.ipsType_positive') ) {
				var currentVote	= 'positive';
			} 
			else if( this.scope.find('.cAnswerRate_down').is('.ipsType_negative') ) {
				var currentVote	= 'negative';
			}
			else {
				var currentVote = false;
			}

			var positive		= clicked.hasClass('cAnswerRate_up');
			var voteCount		= this.scope.find('[data-role="voteCount"]');
			var currentVotes	= parseInt( voteCount.attr('data-voteCount') );

			var newVoteCount	= 0;
			var setPositive		= false;
			var setNegative		= false;

			// Do we have a current vote?
			if( currentVote !== false ) {
				// If our current vote is positive and we clicked it again, we're removing our vote 
				if( positive && currentVote == 'positive' ) {
					newVoteCount = currentVotes - 1;
				}
				// If our current vote is negative and we clicked it again, we're removing our vote 
				else if( !positive && currentVote == 'negative' ) {
					newVoteCount = currentVotes + 1;
				}
				// Otherwise if our current vote is positive and we clicked negative...
				else if( !positive && currentVote == 'positive' ) {
					newVoteCount = currentVotes - 2;
					setNegative  = true;
				}
				// Or our current vote is negative and we clicked positive
				else if( positive && currentVote == 'negative' ) {
					newVoteCount = currentVotes + 2;
					setPositive  = true;
				}
			}
			// Otherwise if we clicked the positive icon...
			else if( positive ) {
				newVoteCount = currentVotes + 1;
				setPositive  = true;
			}
			// Or we clicked the negative icon
			else {
				newVoteCount = currentVotes - 1;
				setNegative  = true;
			}

			this.setStyles( setPositive, setNegative );

			voteCount
				.toggleClass( 'ipsType_positive', setPositive )
				.toggleClass( 'ipsType_negative', setNegative )
				.text( newVoteCount )
				.attr( 'data-voteCount', newVoteCount );

			// Send request
			if( this.ajaxObj && _.isFunction( this.ajaxObj.abort ) ){
				this.ajaxObj.abort();
			}

			this.ajaxObj = ips.getAjax()( clicked.attr('href') )
				.done( function (response) {

					Debug.log( response );

					voteCount.text( response.votes );
					self.scope.find('.ipsType_light').text( ips.pluralize( ips.getString( 'votes_no_number' ), response.votes ) );
				});
		},

		/**
		 * Reset CSS classes
		 *
		 * @param {bool}	Set positive
		 * @param {bool}	Set negative
		 */
		 setStyles: function( setPositive, setNegative ) {
			this.scope.find('.cAnswerRate_up').toggleClass( 'ipsType_positive', setPositive );
			this.scope.find('.cAnswerRate_down').toggleClass( 'ipsType_negative', setNegative );
			this.scope.toggleClass( 'cRatingColumn_up', setPositive ).toggleClass( 'cRatingColumn_down', setNegative );

			// Reset tooltips
			this.scope.find('a.cAnswerRate_up').removeAttr( '_title' );
			this.scope.find('a.cAnswerRate_down').removeAttr( '_title' );

			if( setPositive ) {
				this.scope.find('a.cAnswerRate_up').attr( 'title', ips.getString('js_remove_your_vote') );
			}
			else {
				this.scope.find('a.cAnswerRate_up').attr( 'title', ips.getString('js_vote_answer_up') );
			}
			
			if( setNegative ) {
				this.scope.find('a.cAnswerRate_down').attr( 'title', ips.getString('js_remove_your_vote') );
			}
			else {
				this.scope.find('a.cAnswerRate_down').attr( 'title', ips.getString('js_vote_answer_down') );
			}
		 }
	});
}(jQuery, _));