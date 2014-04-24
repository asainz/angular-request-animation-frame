'use strict';

(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

app.factory('RAF', function(){
    var stack = {};

    var start = function(animName, callback){
        if( !animName || typeof animName !== 'string' ){ console.log('Please provide a name for the animation'); return; }
        if( !callback || typeof callback !== 'function' ){ callback = function(){}; }

        if( !stack[animName] ){
            stack[ animName ] = {
                id: null,
                fn: callback
            };
        }

        stack[animName].id = window.requestAnimationFrame(function(){
            stack[animName].fn();

            start(animName);
        });

    };

    var stop = function(animName){
        if( stack[animName] ){
            window.cancelAnimationFrame( stack[animName].id );
        }
    };

    return {
        start: start,
        stop: stop
    };
});