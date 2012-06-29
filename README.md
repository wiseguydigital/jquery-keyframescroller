jQuery Keyscroll
================

A nifty little plugin by Wiseguy Digital (http://wiseguydigital.com)
--------------------------------------------------------------------

This little jQuery plugin is a way of creating keyframes and triggering them
using a custom scrollbar. 

You configure it with the total number of keyframes that you require for your
app, and it resizes the scrollbar accordingly. 

As you move the scrollbar the current keyframe is calculated based on the position
of the scrubber in relation to the length of the track.

You may also manually adjust the current keyframe using arrows keys or swipe gestures.

When the current keyframe changes, a 'keyframechanged' event is triggered and this
can then be listened to in your app for animations, text changes etc.

