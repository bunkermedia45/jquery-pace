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
	$.pace = function (key, func, pace) {
		var newpace = new Date().getTime() + pace;
		var key = {
			key: key,
			func: func,
			runat: newpace,
			complete: false
		};
		var haspace = false;
		for (var i = 0; i < $.pacekeys.length; i++) {
			key = $.pacekeys[i];
			if (key == key) {
				if (newpace > key.runat) {
					key.runat = newpace;
					key.complete = false;
				}
				haspace = true;
				break;
			}
		}
		if (!haspace) $.pacekeys.push({
			key: key,
			func: func,
			runat: newpace,
			complete: false
		});
	};
	var paceloop = function () {
		if ($.pacekeys == null) $.pacekeys = [];
		setTimeout(function () {
			try {
				for (var i = 0; i < $.pacekeys.length; i++) {
					var pace = $.pacekeys[i];
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
