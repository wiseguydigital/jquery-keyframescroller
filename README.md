jQuery Keyframescroller v1.0
============================

##A nifty little keyframe generating scrollbar

###About

This little jQuery plugin is a way of creating keyframes and triggering them
using a custom scrollbar. 

1. You configure it with the total number of keyframes that you require for your
app, and it resizes the scrollbar accordingly. 
2. As you move the scrollbar the current keyframe is calculated based on the position
of the scrubber in relation to the length of the track.
3. You may also manually adjust the current keyframe using arrows keys or swipe gestures.
4. When the current keyframe changes, a 'keyframechanged' event is triggered and this
can then be listened to in your app for animations, text changes etc.

###Dependencies
We use touchSwipe for the swipe gestures:
https://github.com/mattbryson/TouchSwipe-Jquery-Plugin

###Parameters
There are only a few config parameters:

* `debug` 
    * default: __false__
* `orientation` 
    * default: __'horizontal'__
* `totalKeyframes` 
    * default: __10__
* `keyframeScrollEle` 
    * default: __$('#keyframeScroll')__
* `trackEle` 
    * default: __$('#keyframeScroll-track')__
* `carriageEle` 
    * default: __$('#keyframeScroll-carriage')__

--

Hopefully that's all you need.

--

by Wiseguy Digital (http://wiseguydigital.com)
