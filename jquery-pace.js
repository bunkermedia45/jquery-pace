/*
jQuery Pacing Utility.

Open License.


Allows calling a function after a givin time, while pushing
the time offset further on each call, and execute when not done.

This is a good utlitity for updates on change of a textbox using 
keydown event, and making sure it doesn't run the update too much.


usage:
$.pace('key',function(){
    code...
},500); 


By Leo Barsukov

*/



(function ($) {
    $.pace_keys = [];
    $.pace = function (pushkey, func, pace) {
        var newpace = new Date().getTime() + pace;

        var key = {
            key: pushkey,
            func: func,
            runat: newpace,
            complete: false
        };
        var haspace = false;

        for (var i = 0; i < $.pace_keys.length; i++) {
            var pkey = $.pace_keys[i];
            if (pkey.key == pushkey) {
                console.log('haskey');
                if (newpace > pkey.runat) {
                    pkey.runat = newpace;
                    pkey.complete = false;
                    pkey.func = func;
                }
                haspace = true;
                break;
            }
        }
        if (!haspace) $.pace_keys.push({
            key: pushkey,
            func: func,
            runat: newpace,
            complete: false
        });
    };
    var paceloop = function () {
        setTimeout(function () {
            try {
                for (var i = 0; i < $.pace_keys.length; i++) {
                    var pace = $.pace_keys[i];
                    if (pace.complete == false) {
                        if (pace.runat < new Date().getTime()) {
                            pace.func();
                            pace.complete = true;
                        }
                    }
                }
            } catch (ex) { }
            paceloop();
        }, 10);
    }
    paceloop();
})(jQuery)
