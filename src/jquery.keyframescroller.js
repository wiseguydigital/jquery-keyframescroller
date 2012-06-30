/**
 * keyframescroller.js v1.0
 * https://github.com/wiseguydigital/jquery-keyframescroller
 * 
 * A simple jQuery plugin to trigger keyframe events using a custom scrollbar. 
 *
 * Depends on touchswipe for the swipe navigation
 * https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
 *
 * Copyright (c) 2012, Wiseguy Digital Ltd. All rights reserved. 
 * Licensed under the MIT license.
 **/
(function($) {
	
	$.keyframescroller = function(options) {
		
		var kfs, defaults, curKeyframe, trackWidth, carriageWidth;
		
		keyframescroller = this;
		curKeyframe = 0;
		
		defaults = {
			debug: false,
			orientation:'horizontal',
			totalKeyframes: 10,
			keyframeScrollEle: $('#keyframeScroll'),
			trackEle: $('#keyframeScroll-track'),
			carriageEle: $('#keyframeScroll-carriage'),
		};
		keyframescroller.settings = $.extend({}, defaults, options);		
		
		/**
		 * Initiate
		 */
		function init() {
			keyframescroller.curKeyframe = 0;
			keyframescroller.trackWidth = keyframescroller.settings.trackEle.outerWidth();
			keyframescroller.carriageWidth = keyframescroller.settings.carriageEle.outerWidth();
			
			// Debug
			if (keyframescroller.settings.debug) {
				this.addDebugHtml();
			}
			
			// Resize
			keyframescroller.resize();
			$(window).resize(function(){
				keyframescroller.resize();
			});
			
			// On keyframe change listener
			$(keyframescroller.settings.keyframeScrollEle).bind('keyframechanged', function(event, newKeyframe){
				//console.log('Keyframe changed: ' + newKeyframe)
			});
			
			// Scrollbar navigation
			$(keyframescroller.settings.carriageEle).draggable({
				axis: "x",
				containment: "parent",
				drag: function() {
					keyframescroller.calculateCurKeyFrame();
				},
				stop: function() {
					keyframescroller.correctCarriagePos();
				}
			});
			
			// Keyboard navigation
			this.keyboardNav();
			
			// Swipe navigation
			$("section").swipe({
				swipe: keyframescroller.swipeNav,
				threshold: 0,
				allowPageScroll: "auto"
			});
			
			// Fire initial event
			$(keyframescroller.settings.keyframeScrollEle).trigger('keyframechanged', 0);
			
		};
		
		// We use the position of the scroll carriage to work out the keyframe
		keyframescroller.calculateCurKeyFrame = function()
		{
			var keyframeScrollEle, trackEle, carriageEle, offset, percentage, oldKeyFrame, newKeyFrame;
			keyframeScrollEle = keyframescroller.settings.keyframeScrollEle;
			trackEle = keyframescroller.settings.trackEle;
			carriageEle = keyframescroller.settings.carriageEle;
			offset = $(carriageEle).offset();
			percentage = (offset.left / (keyframescroller.trackWidth - keyframescroller.carriageWidth));
			
			oldKeyFrame = keyframescroller.curKeyframe;
			newKeyFrame = Math.round(percentage * keyframescroller.settings.totalKeyframes);

			// Fire an event if the keyframe has changed
			if (oldKeyFrame !== newKeyFrame) {
				keyframescroller.setCurKeyFrame(newKeyFrame);
				$(keyframeScrollEle).trigger('keyframechanged', [newKeyFrame]);
			}			
		}
		
		// Correct the position of the carriage after dragging
		keyframescroller.correctCarriagePos = function()
		{
			var trackEle, carriageEle, correctPos;
			trackEle = keyframescroller.settings.trackEle;
			carriageEle = keyframescroller.settings.carriageEle;
			correctPos = (keyframescroller.trackWidth / keyframescroller.settings.totalKeyframes) * keyframescroller.curKeyframe;

			// Too far to the right?
			if(correctPos >= keyframescroller.trackWidth) {
				correctPos = keyframescroller.trackWidth - carriageEle.outerWidth();
			}

			$(carriageEle).animate({
				left: correctPos
			}, 300);
		}
		
		// Set the current frame
		keyframescroller.setCurKeyFrame = function(key)
		{
			keyframescroller.curKeyframe = key;
		}
		
		keyframescroller.resize = function() {
			var keyframeScrollEle, trackEle, carriageEle, keyframes;
			keyframeScrollEle = this.settings.keyframeScrollEle;
			trackEle = this.settings.trackEle;
			carriageEle = this.settings.carriageEle;
			keyframes = this.settings.totalKeyframes;
			this.trackWidth = $(trackEle).outerWidth();
			$(carriageEle).css({width:(this.trackWidth / keyframes)});
			this.carriageWidth = $(carriageEle).outerWidth();
		};
		
		// Swipe navigation
		keyframescroller.swipeNav = function(event, direction)
		{
			var newKey;
			switch (direction) {
				// Down
			    case 'down':
					if (keyframescroller.settings.orientation == 'horizontal') return;
					if (keyframescroller.curKeyframe == keyframescroller.settings.totalKeyframes-1) return;
					newKey = keyframescroller.curKeyframe + 1;
		            break;
				// Up
		        case 'up':
					if (keyframescroller.settings.orientation == 'horizontal') return;
					if (keyframescroller.curKeyframe == 0) return;
					newKey = keyframescroller.curKeyframe -1;
		            break;
				// Right
		        case 'right':
					if (keyframescroller.settings.orientation == 'vertical') return;
					if (keyframescroller.curKeyframe == 0) return;
					newKey = keyframescroller.curKeyframe - 1;
		            break;
				// Left
		        case 'left':
					if (keyframescroller.settings.orientation == 'vertical') return;
					if (keyframescroller.curKeyframe == keyframescroller.settings.totalKeyframes-1) return;
					newKey = keyframescroller.curKeyframe + 1;
		            break;
			}

			keyframescroller.setCurKeyFrame(newKey);
			$(keyframescroller.settings.keyframeScrollEle).trigger('keyframechanged', newKey);
			keyframescroller.correctCarriagePos();
		}
		
		/**
		 * Private functions
		 */
		
		// Add debug html
		addDebugHtml = function()
		{
			$('body').prepend('<div id="keyframeScroll-debug"><p id="keyframeScroll-debug-total-keyframes">Total keyframes: <span></span></p><p id="keyframeScroll-debug-current-keyframe">Current keyframe: <span></span></p></div>');
		}
		
		// Keyboard navigation
		keyboardNav = function()
		{
			var newKey;
			
			$(document).keydown(function(e){
				switch (e.which) {
					// Down
				    case 40:
						if (keyframescroller.settings.orientation == 'horizontal') return;
						if (keyframescroller.curKeyframe == keyframescroller.settings.totalKeyframes-1) return;
						newKey = keyframeScroll.curKeyframe + 1;
			            break;
					// Up
			        case 38:
						if (keyframescroller.settings.orientation == 'horizontal') return;
						if (keyframescroller.curKeyframe == 0) return;
						newKey = keyframescroller.curKeyframe -1;
			            break;
					// Left
			        case 37:
						if (keyframescroller.settings.orientation == 'vertical') return;
						if (keyframescroller.curKeyframe == 0) return;
						newKey = keyframescroller.curKeyframe - 1;
			            break;
					// Right
			        case 39:
						if (keyframescroller.settings.orientation == 'vertical') return;
						if (keyframescroller.curKeyframe == keyframescroller.settings.totalKeyframes-1) return;
						newKey = keyframescroller.curKeyframe + 1;
			            break;
				}

				keyframescroller.setCurKeyFrame(newKey);
				$(keyframescroller.settings.keyframeScrollEle).trigger('keyframechanged', newKey);
				keyframescroller.correctCarriagePos();

			});
		}		
		
		/**
		 * Initiate
		 */
		init();
		
		return keyframescroller;
	};
	
})(jQuery);