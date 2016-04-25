var EventUtil={
	addHandler:function (element,type,handler) {
		if (element.addEventListener) {
			element.addEventListener(type,handler,false);
		} else if(element.attachEvent){
			element.attachEvent("on"+type,handler);
		} else{
			element["on"+type]=handler;
		}
	},
	removeHandler:function (element,type,handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type,handler,false);
		} else if(element.detachEvent){
			element.detachEvent("on"+type,handler);
		} else{
			element["on"+type]=null;
		}
	},
	getEvent:function (event) {
		return event ? event:window.event;
	},
	getTarget:function (event) {
		return event.target||event.srcElement;
	},
	preventDefault:function (event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue=false;
		}
	},
	stopPropagation:function (event) {
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble=true;
		}
	}
}

var Translate=function () {
	var txt;
	var x,y;
	this.createTransbtn=function(event) {
		chrome.runtime.sendMessage('check', function(response) {
    		orstart=response;
    		// alert(orstart);
		});
		var e=EventUtil.getEvent(event);
		txt = window.getSelection();	
		var transbtns;
		if (txt.toString().length>1 && orstart) {
			if (document.getElementsByClassName('transbtn').length==0){
				x=e.clientX;
				y=e.clientY;
				var transbtn=document.createElement("img");
				transbtn.className='transbtn';
				transbtn.src="http://www.immaster.cn/icon.png";
				transbtn.style.width=30+"px";
				transbtn.style.height=30+"px";
				transbtn.style.left=x+"px";
				transbtn.style.top=y+"px";
				transbtn.style.position="fixed";
				transbtn.style.zIndex=9999;
				document.body.appendChild(transbtn);
			}
		}
			
	}
	this.startTrans=function (event) {
		var e=EventUtil.getEvent(event);
		var target=EventUtil.getTarget(e);
		if (target.className=='transbtn') {
			if (document.getElementsByClassName('translation').length==0){
				var url='http://fanyi.youdao.com/openapi.do?keyfrom=immaster&key=521155450&type=data&doctype=json&version=1.1&q='+txt;
				httpRequest(url,function (data) {
					var jsonobj=JSON.parse(data);
					
						var translate=document.createElement("div");
						translate.className='translation';
						translate.innerHTML=jsonobj.translation;
						translate.style.padding=5+"px";
						translate.style.left=x+40+"px";
						translate.style.top=y+"px";
						translate.style.fontSize=16+"px";
						translate.style.color="white";
						translate.style.backgroundColor="black";
						translate.style.position="fixed";
						translate.style.zIndex=10000;
						document.body.appendChild(translate);
				})
			}
		} else if(target.className!='translation'){
			var transbtns;
			var translates;
			if (transbtns=document.getElementsByClassName('transbtn')) {
				transbtns=document.getElementsByClassName('transbtn');
				for (var i = 0; i < transbtns.length; i++) {
					document.body.removeChild(transbtns[i]);
				}
			}
			if (translates=document.getElementsByClassName('translation')) {
				translates=document.getElementsByClassName('translation');
				for (var i = 0; i < translates.length; i++) {
					document.body.removeChild(translates[i]);
				}
			}
		}
		
	}
	function httpRequest(url, callback){
			var xhr = new XMLHttpRequest();
			xhr.open("GET", url, true);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
				    callback(xhr.responseText);
				}
			}
			xhr.send();
	}
}

var orstart=true;
var trans1=new Translate();
document.body.onmouseup=trans1.createTransbtn;
document.body.onmousedown=trans1.startTrans;

chrome.runtime.sendMessage('check', function(response) {
    orstart=response;
    // alert(orstart);
});

