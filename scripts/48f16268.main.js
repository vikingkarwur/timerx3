(function(t,e){"use strict";function n(){if(!r.READY){r.event.determineEventTypes();for(var t in r.gestures)r.gestures.hasOwnProperty(t)&&r.detection.register(r.gestures[t]);r.event.onTouch(r.DOCUMENT,r.EVENT_MOVE,r.detection.detect),r.event.onTouch(r.DOCUMENT,r.EVENT_END,r.detection.detect),r.READY=!0}}var r=function(t,e){return new r.Instance(t,e||{})};r.defaults={stop_browser_behavior:{userSelect:"none",touchAction:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}},r.HAS_POINTEREVENTS=navigator.pointerEnabled||navigator.msPointerEnabled,r.HAS_TOUCHEVENTS="ontouchstart"in t,r.MOBILE_REGEX=/mobile|tablet|ip(ad|hone|od)|android/i,r.NO_MOUSEEVENTS=r.HAS_TOUCHEVENTS&&navigator.userAgent.match(r.MOBILE_REGEX),r.EVENT_TYPES={},r.DIRECTION_DOWN="down",r.DIRECTION_LEFT="left",r.DIRECTION_UP="up",r.DIRECTION_RIGHT="right",r.POINTER_MOUSE="mouse",r.POINTER_TOUCH="touch",r.POINTER_PEN="pen",r.EVENT_START="start",r.EVENT_MOVE="move",r.EVENT_END="end",r.DOCUMENT=document,r.plugins={},r.READY=!1,r.Instance=function(t,e){var i=this;return n(),this.element=t,this.enabled=!0,this.options=r.utils.extend(r.utils.extend({},r.defaults),e||{}),this.options.stop_browser_behavior&&r.utils.stopDefaultBrowserBehavior(this.element,this.options.stop_browser_behavior),r.event.onTouch(t,r.EVENT_START,function(t){i.enabled&&r.detection.startDetect(i,t)}),this},r.Instance.prototype={on:function(t,e){for(var n=t.split(" "),r=0;n.length>r;r++)this.element.addEventListener(n[r],e,!1);return this},off:function(t,e){for(var n=t.split(" "),r=0;n.length>r;r++)this.element.removeEventListener(n[r],e,!1);return this},trigger:function(t,e){var n=r.DOCUMENT.createEvent("Event");n.initEvent(t,!0,!0),n.gesture=e;var i=this.element;return r.utils.hasParent(e.target,i)&&(i=e.target),i.dispatchEvent(n),this},enable:function(t){return this.enabled=t,this}};var i=null,a=!1,o=!1;r.event={bindDom:function(t,e,n){for(var r=e.split(" "),i=0;r.length>i;i++)t.addEventListener(r[i],n,!1)},onTouch:function(t,e,n){var s=this;this.bindDom(t,r.EVENT_TYPES[e],function(u){var c=u.type.toLowerCase();if(!c.match(/mouse/)||!o){(c.match(/touch/)||c.match(/pointerdown/)||c.match(/mouse/)&&1===u.which)&&(a=!0),c.match(/touch|pointer/)&&(o=!0);var l=0;a&&(r.HAS_POINTEREVENTS&&e!=r.EVENT_END?l=r.PointerEvent.updatePointer(e,u):c.match(/touch/)?l=u.touches.length:o||(l=c.match(/up/)?0:1),l>0&&e==r.EVENT_END?e=r.EVENT_MOVE:l||(e=r.EVENT_END),l||null===i?i=u:u=i,n.call(r.detection,s.collectEventData(t,e,u)),r.HAS_POINTEREVENTS&&e==r.EVENT_END&&(l=r.PointerEvent.updatePointer(e,u))),l||(i=null,a=!1,o=!1,r.PointerEvent.reset())}})},determineEventTypes:function(){var t;t=r.HAS_POINTEREVENTS?r.PointerEvent.getEvents():r.NO_MOUSEEVENTS?["touchstart","touchmove","touchend touchcancel"]:["touchstart mousedown","touchmove mousemove","touchend touchcancel mouseup"],r.EVENT_TYPES[r.EVENT_START]=t[0],r.EVENT_TYPES[r.EVENT_MOVE]=t[1],r.EVENT_TYPES[r.EVENT_END]=t[2]},getTouchList:function(t){return r.HAS_POINTEREVENTS?r.PointerEvent.getTouchList():t.touches?t.touches:[{identifier:1,pageX:t.pageX,pageY:t.pageY,target:t.target}]},collectEventData:function(t,e,n){var i=this.getTouchList(n,e),a=r.POINTER_TOUCH;return(n.type.match(/mouse/)||r.PointerEvent.matchType(r.POINTER_MOUSE,n))&&(a=r.POINTER_MOUSE),{center:r.utils.getCenter(i),timeStamp:(new Date).getTime(),target:n.target,touches:i,eventType:e,pointerType:a,srcEvent:n,preventDefault:function(){this.srcEvent.preventManipulation&&this.srcEvent.preventManipulation(),this.srcEvent.preventDefault&&this.srcEvent.preventDefault()},stopPropagation:function(){this.srcEvent.stopPropagation()},stopDetect:function(){return r.detection.stopDetect()}}}},r.PointerEvent={pointers:{},getTouchList:function(){var t=this,e=[];return Object.keys(t.pointers).sort().forEach(function(n){e.push(t.pointers[n])}),e},updatePointer:function(t,e){return t==r.EVENT_END?this.pointers={}:(e.identifier=e.pointerId,this.pointers[e.pointerId]=e),Object.keys(this.pointers).length},matchType:function(t,e){if(!e.pointerType)return!1;var n={};return n[r.POINTER_MOUSE]=e.pointerType==e.MSPOINTER_TYPE_MOUSE||e.pointerType==r.POINTER_MOUSE,n[r.POINTER_TOUCH]=e.pointerType==e.MSPOINTER_TYPE_TOUCH||e.pointerType==r.POINTER_TOUCH,n[r.POINTER_PEN]=e.pointerType==e.MSPOINTER_TYPE_PEN||e.pointerType==r.POINTER_PEN,n[t]},getEvents:function(){return["pointerdown MSPointerDown","pointermove MSPointerMove","pointerup pointercancel MSPointerUp MSPointerCancel"]},reset:function(){this.pointers={}}},r.utils={extend:function(t,n,r){for(var i in n)t[i]!==e&&r||(t[i]=n[i]);return t},hasParent:function(t,e){for(;t;){if(t==e)return!0;t=t.parentNode}return!1},getCenter:function(t){for(var e=[],n=[],r=0,i=t.length;i>r;r++)e.push(t[r].pageX),n.push(t[r].pageY);return{pageX:(Math.min.apply(Math,e)+Math.max.apply(Math,e))/2,pageY:(Math.min.apply(Math,n)+Math.max.apply(Math,n))/2}},getVelocity:function(t,e,n){return{x:Math.abs(e/t)||0,y:Math.abs(n/t)||0}},getAngle:function(t,e){var n=e.pageY-t.pageY,r=e.pageX-t.pageX;return 180*Math.atan2(n,r)/Math.PI},getDirection:function(t,e){var n=Math.abs(t.pageX-e.pageX),i=Math.abs(t.pageY-e.pageY);return n>=i?t.pageX-e.pageX>0?r.DIRECTION_LEFT:r.DIRECTION_RIGHT:t.pageY-e.pageY>0?r.DIRECTION_UP:r.DIRECTION_DOWN},getDistance:function(t,e){var n=e.pageX-t.pageX,r=e.pageY-t.pageY;return Math.sqrt(n*n+r*r)},getScale:function(t,e){return t.length>=2&&e.length>=2?this.getDistance(e[0],e[1])/this.getDistance(t[0],t[1]):1},getRotation:function(t,e){return t.length>=2&&e.length>=2?this.getAngle(e[1],e[0])-this.getAngle(t[1],t[0]):0},isVertical:function(t){return t==r.DIRECTION_UP||t==r.DIRECTION_DOWN},stopDefaultBrowserBehavior:function(t,e){var n,r=["webkit","khtml","moz","ms","o",""];if(e&&t.style){for(var i=0;r.length>i;i++)for(var a in e)e.hasOwnProperty(a)&&(n=a,r[i]&&(n=r[i]+n.substring(0,1).toUpperCase()+n.substring(1)),t.style[n]=e[a]);"none"==e.userSelect&&(t.onselectstart=function(){return!1})}}},r.detection={gestures:[],current:null,previous:null,stopped:!1,startDetect:function(t,e){this.current||(this.stopped=!1,this.current={inst:t,startEvent:r.utils.extend({},e),lastEvent:!1,name:""},this.detect(e))},detect:function(t){if(this.current&&!this.stopped){t=this.extendEventData(t);for(var e=this.current.inst.options,n=0,i=this.gestures.length;i>n;n++){var a=this.gestures[n];if(!this.stopped&&e[a.name]!==!1&&a.handler.call(a,t,this.current.inst)===!1){this.stopDetect();break}}return this.current&&(this.current.lastEvent=t),t.eventType==r.EVENT_END&&!t.touches.length-1&&this.stopDetect(),t}},stopDetect:function(){this.previous=r.utils.extend({},this.current),this.current=null,this.stopped=!0},extendEventData:function(t){var e=this.current.startEvent;if(e&&(t.touches.length!=e.touches.length||t.touches===e.touches)){e.touches=[];for(var n=0,i=t.touches.length;i>n;n++)e.touches.push(r.utils.extend({},t.touches[n]))}var a=t.timeStamp-e.timeStamp,o=t.center.pageX-e.center.pageX,s=t.center.pageY-e.center.pageY,u=r.utils.getVelocity(a,o,s);return r.utils.extend(t,{deltaTime:a,deltaX:o,deltaY:s,velocityX:u.x,velocityY:u.y,distance:r.utils.getDistance(e.center,t.center),angle:r.utils.getAngle(e.center,t.center),direction:r.utils.getDirection(e.center,t.center),scale:r.utils.getScale(e.touches,t.touches),rotation:r.utils.getRotation(e.touches,t.touches),startEvent:e}),t},register:function(t){var n=t.defaults||{};return n[t.name]===e&&(n[t.name]=!0),r.utils.extend(r.defaults,n,!0),t.index=t.index||1e3,this.gestures.push(t),this.gestures.sort(function(t,e){return t.index<e.index?-1:t.index>e.index?1:0}),this.gestures}},r.gestures=r.gestures||{},r.gestures.Hold={name:"hold",index:10,defaults:{hold_timeout:500,hold_threshold:1},timer:null,handler:function(t,e){switch(t.eventType){case r.EVENT_START:clearTimeout(this.timer),r.detection.current.name=this.name,this.timer=setTimeout(function(){"hold"==r.detection.current.name&&e.trigger("hold",t)},e.options.hold_timeout);break;case r.EVENT_MOVE:t.distance>e.options.hold_threshold&&clearTimeout(this.timer);break;case r.EVENT_END:clearTimeout(this.timer)}}},r.gestures.Tap={name:"tap",index:100,defaults:{tap_max_touchtime:250,tap_max_distance:10,tap_always:!0,doubletap_distance:20,doubletap_interval:300},handler:function(t,e){if(t.eventType==r.EVENT_END){var n=r.detection.previous,i=!1;if(t.deltaTime>e.options.tap_max_touchtime||t.distance>e.options.tap_max_distance)return;n&&"tap"==n.name&&t.timeStamp-n.lastEvent.timeStamp<e.options.doubletap_interval&&t.distance<e.options.doubletap_distance&&(e.trigger("doubletap",t),i=!0),(!i||e.options.tap_always)&&(r.detection.current.name="tap",e.trigger(r.detection.current.name,t))}}},r.gestures.Swipe={name:"swipe",index:40,defaults:{swipe_max_touches:1,swipe_velocity:.7},handler:function(t,e){if(t.eventType==r.EVENT_END){if(e.options.swipe_max_touches>0&&t.touches.length>e.options.swipe_max_touches)return;(t.velocityX>e.options.swipe_velocity||t.velocityY>e.options.swipe_velocity)&&(e.trigger(this.name,t),e.trigger(this.name+t.direction,t))}}},r.gestures.Drag={name:"drag",index:50,defaults:{drag_min_distance:10,drag_max_touches:1,drag_block_horizontal:!1,drag_block_vertical:!1,drag_lock_to_axis:!1,drag_lock_min_distance:25},triggered:!1,handler:function(t,n){if(r.detection.current.name!=this.name&&this.triggered)return n.trigger(this.name+"end",t),this.triggered=!1,e;if(!(n.options.drag_max_touches>0&&t.touches.length>n.options.drag_max_touches))switch(t.eventType){case r.EVENT_START:this.triggered=!1;break;case r.EVENT_MOVE:if(t.distance<n.options.drag_min_distance&&r.detection.current.name!=this.name)return;r.detection.current.name=this.name,(r.detection.current.lastEvent.drag_locked_to_axis||n.options.drag_lock_to_axis&&n.options.drag_lock_min_distance<=t.distance)&&(t.drag_locked_to_axis=!0);var i=r.detection.current.lastEvent.direction;t.drag_locked_to_axis&&i!==t.direction&&(t.direction=r.utils.isVertical(i)?0>t.deltaY?r.DIRECTION_UP:r.DIRECTION_DOWN:0>t.deltaX?r.DIRECTION_LEFT:r.DIRECTION_RIGHT),this.triggered||(n.trigger(this.name+"start",t),this.triggered=!0),n.trigger(this.name,t),n.trigger(this.name+t.direction,t),(n.options.drag_block_vertical&&r.utils.isVertical(t.direction)||n.options.drag_block_horizontal&&!r.utils.isVertical(t.direction))&&t.preventDefault();break;case r.EVENT_END:this.triggered&&n.trigger(this.name+"end",t),this.triggered=!1}}},r.gestures.Transform={name:"transform",index:45,defaults:{transform_min_scale:.01,transform_min_rotation:1,transform_always_block:!1},triggered:!1,handler:function(t,n){if(r.detection.current.name!=this.name&&this.triggered)return n.trigger(this.name+"end",t),this.triggered=!1,e;if(!(2>t.touches.length))switch(n.options.transform_always_block&&t.preventDefault(),t.eventType){case r.EVENT_START:this.triggered=!1;break;case r.EVENT_MOVE:var i=Math.abs(1-t.scale),a=Math.abs(t.rotation);if(n.options.transform_min_scale>i&&n.options.transform_min_rotation>a)return;r.detection.current.name=this.name,this.triggered||(n.trigger(this.name+"start",t),this.triggered=!0),n.trigger(this.name,t),a>n.options.transform_min_rotation&&n.trigger("rotate",t),i>n.options.transform_min_scale&&(n.trigger("pinch",t),n.trigger("pinch"+(1>t.scale?"in":"out"),t));break;case r.EVENT_END:this.triggered&&n.trigger(this.name+"end",t),this.triggered=!1}}},r.gestures.Touch={name:"touch",index:-1/0,defaults:{prevent_default:!1,prevent_mouseevents:!1},handler:function(t,n){return n.options.prevent_mouseevents&&t.pointerType==r.POINTER_MOUSE?(t.stopDetect(),e):(n.options.prevent_default&&t.preventDefault(),t.eventType==r.EVENT_START&&n.trigger(this.name,t),e)}},r.gestures.Release={name:"release",index:1/0,handler:function(t,e){t.eventType==r.EVENT_END&&e.trigger(this.name,t)}},"object"==typeof module&&"object"==typeof module.exports?module.exports=r:(t.Hammer=r,"function"==typeof t.define&&t.define.amd&&t.define("hammer",[],function(){return r}))})(this),function(){"use strict";var t=function t(){var t,e,n="";for(t=0;32>t;t++)e=0|16*Math.random(),(8===t||12===t||16===t||20===t)&&(n+="-"),n+=(12===t?4:16===t?8|3&e:e).toString(16);return n},e=function e(t){var e=Math.floor(t/3600),n=Math.floor((t-3600*e)/60),r=t-3600*e-60*n;return 10>e&&(e="0"+e),10>n&&(n="0"+n),10>r&&(r="0"+r),e+":"+n+":"+r},n=function n(){var t=0,e=null,n=new Audio("media/beep.ogg");n.loop=!0,this.startAlarm=function(){t++,2>t&&(n.play(),navigator.vibrate&&a())},this.stopAlarm=function(){t>0&&t--,0===t&&(n.pause(),n.currentTime=0,navigator.vibrate&&i())};var r=function r(){navigator.vibrate(200)},i=function i(){window.clearInterval(e),navigator.vibrate(0)},a=function a(){e=window.setInterval(r,1e3)}},r=function r(t,n,r){this.time=0,this.status="off",this.elDisplay=t,this.elButton=n,this.alarm=r;var i=null,a=this;this.start=function(t){s(t),a.status="ticking",a.alarm.stopAlarm(),c()},this.stop=function(){u(),a.status="off",c()},this.dismissAlarm=function(){"alarm"===a.status&&(a.status="off",c())};var o=function o(){a.time--,0===a.time&&(u(),a.status="alarm"),c()},s=function s(t){a.time=t,i=window.setInterval(o,1e3)},u=function u(){a.time=0,window.clearInterval(i)},c=function c(){switch(a.elDisplay.textContent=e(a.time),a.status){case"ticking":a.elButton.innerHTML="Stop",a.elDisplay.classList.remove("finished");break;case"alarm":a.elButton.innerHTML="Start",a.elDisplay.classList.add("finished"),a.alarm.startAlarm();break;case"off":a.elButton.innerHTML="Start",a.elDisplay.classList.remove("finished"),a.alarm.stopAlarm();break;default:alert("Something went wrong")}}},i=function i(e,n){this.id=t(),this.duration=e,this.description=n};document.onreadystatechange=function(){if("interactive"===document.readyState){var t=[],a=0,o=new n,s=document.getElementById("hplus"),u=document.getElementById("hminus"),c=document.getElementById("hours"),l=document.getElementById("mplus"),m=document.getElementById("mminus"),d=document.getElementById("mins"),p=document.getElementById("splus"),h=document.getElementById("sminus"),g=document.getElementById("secs"),E=document.getElementById("btn1"),v=document.getElementById("btn2"),f=document.getElementById("btn3"),_=document.getElementById("timer1"),T=document.getElementById("timer2"),N=document.getElementById("timer3"),I=document.getElementById("sidepanelbtn"),y=document.getElementById("addpreset"),D=new r(_,E,o),O=new r(T,v,o),S=new r(N,f,o);E.timer=_.timer=D,v.timer=T.timer=O,f.timer=N.timer=S;var b=function b(){return 3600*Number(c.value)+60*Number(d.value)+Number(g.value)},w=function w(t){var e=Number(t),n=0,r=0,i=0;n=Math.floor(e/3600),r=Math.floor((e-3600*n)/60),i=e-3600*n-60*r,c.value=n,d.value=r,g.value=i},P=function P(){document.getElementById("center-panel").classList.toggle("sidepanel-enabled")},M=function M(){document.getElementById("presets").innerHTML="",t.forEach(function(t){var n=e(t.duration),r=t.description,i='<div class="description">'+r+'</div><div class="duration">'+n+"</div>",a=document.createElement("li");a.dataset.id=t.id,a.innerHTML=i,new Hammer(a).on("tap",L),new Hammer(a).on("hold",G),document.getElementById("presets").appendChild(a)})},V=function V(){var t=Number(c.value)+1;c.value=t>23?0:t},R=function R(){var t=Number(c.value)-1;c.value=0>t?23:t},x=function x(){var t=Number(d.value)+1;d.value=t>59?0:t},H=function H(){var t=Number(d.value)-1;d.value=0>t?59:t},C=function C(){var t=Number(g.value)+1;g.value=t>59?0:t},A=function A(){var t=Number(g.value)-1;g.value=0>t?59:t},k=function k(){this.value.length>2&&(this.value=this.value.slice(0,2))},B=function B(t){var e=t.target.timer;"ticking"===e.status?e.stop():b()?(e.start(b()),a=b(),z()):alert("Select time first")},Y=function Y(t){var e=t.target.timer;e.dismissAlarm()},U=function(t){t.preventDefault(),t.stopPropagation(),t.gesture.stopDetect(),P()},L=function L(e){e.preventDefault(),e.stopPropagation();var n=e.currentTarget.dataset.id;t.forEach(function(t){return t.id===n?(w(t.duration),P(),void 0):void 0})},X=function X(e){e.preventDefault(),e.stopPropagation();var n=b();if(n){var r=prompt("Preset description"),a=r.trim();if(a){var o=new i(n,a);t.push(o),j(),M()}else alert("You must enter a description first.")}else alert("Enter duration first."),P()},G=function G(e){e.preventDefault(),e.stopPropagation();var n,r=e.currentTarget.dataset.id;for(n=t.length-1;n>=0;n-=1)if(t[n].id===r){var i=confirm('Delete "'+t[n].description+'" preset?');return i&&(t.splice(n,1),j(),M()),void 0}};new Hammer(s).on("tap",V),new Hammer(u).on("tap",R),new Hammer(l).on("tap",x),new Hammer(m).on("tap",H),new Hammer(p).on("tap",C),new Hammer(h).on("tap",A),new Hammer(E).on("tap",B),new Hammer(v).on("tap",B),new Hammer(f).on("tap",B),new Hammer(_).on("tap",Y),new Hammer(T).on("tap",Y),new Hammer(N).on("tap",Y),c.addEventListener("input",k,!1),d.addEventListener("input",k,!1),g.addEventListener("input",k,!1),new Hammer(I).on("tap",U),new Hammer(y).on("tap",X),new Hammer(document).on("swipeleft",U),new Hammer(document).on("swiperight",U);var j=function j(){localStorage.setItem("presets",JSON.stringify(t))},W=function W(){localStorage.getItem("presets")||localStorage.setItem("presets",JSON.stringify([])),t=JSON.parse(localStorage.getItem("presets"))},z=function z(){a=localStorage.setItem("last",a)},F=function F(){localStorage.getItem("last")||localStorage.setItem("last",0),a=localStorage.getItem("last")};F(),w(a),W(),M()}}}();