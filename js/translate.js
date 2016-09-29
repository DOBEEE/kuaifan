;(function () {
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

	function Translate() {
		this.txt = null;
		this.x = null;
		this.y = null;
		this.orstart = 1;
		this.key = 1;	
	}
	Translate.prototype = {
		constructor:Translate,
		init: function () {
			var self = this;
			chrome.runtime.sendMessage('check', function(response) {
				self.orstart=response;
			});
			self.bind();
		},
		createTransbtn: function(event) {
			var self = this;
			chrome.runtime.sendMessage('check', function(response) {
	    		self.orstart=response;
			});

			var e=EventUtil.getEvent(event);
			this.txt = window.getSelection();	
			var transbtns;
			if (this.txt.toString().length>1 && self.orstart) {
				if (document.getElementsByClassName('transbtn').length==0){
					this.x=e.clientX;
					this.y=e.clientY;
					var transbtn=document.createElement("img");
					transbtn.className='transbtn';
					transbtn.src="http://blog.immaster.cn/icon.png";
					transbtn.style.width=30+"px";
					transbtn.style.height=30+"px";
					transbtn.style.left=this.x+"px";
					transbtn.style.top=this.y+"px";
					transbtn.style.position="fixed";
					transbtn.style.zIndex=9999;
					document.body.appendChild(transbtn);
				}
			}
				
		},
		startTrans: function (event) {
			var self = this;
			var e=EventUtil.getEvent(event);
			var target=EventUtil.getTarget(e);
			if (target.className=='transbtn') {
				if (document.getElementsByClassName('translation').length==0 && self.key){
					self.key = 0;
					var url='http://fanyi.youdao.com/openapi.do?keyfrom=immaster&key=521155450&type=data&doctype=json&version=1.1&q='+this.txt;
					this.httpRequest(url,function (data) {
						self.key = 1;
						var jsonobj=JSON.parse(data);
						
						var translate=document.createElement("div");
						translate.className='translation';
						translate.innerHTML=jsonobj.translation;
						translate.style.padding=5+"px";
						translate.style.left=self.x+40+"px";
						translate.style.top=self.y+"px";
						translate.style.fontSize=16+"px";
						translate.style.color="white";
						translate.style.backgroundColor="black";
						translate.style.position="fixed";
						translate.style.zIndex=10000;
						document.body.appendChild(translate);
					})
				}
			} else{
				var transbtns;
				var translates;
				if (document.getElementsByClassName('transbtn')) {
					transbtns=document.getElementsByClassName('transbtn');
					for (var i = 0; i < transbtns.length; i++) {
						document.body.removeChild(transbtns[i]);
					}
				}
				if (document.getElementsByClassName('translation')) {
					translates=document.getElementsByClassName('translation');
					for (var i = 0; i < translates.length; i++) {
						document.body.removeChild(translates[i]);
					}
				}
			}
			
		},
		httpRequest: function (url, callback){
			var xhr = new XMLHttpRequest();
			xhr.open("GET", url, true);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
				    callback(xhr.responseText);
				}
			}
			xhr.send();
		},
		bind: function () {
			var self = this;
			document.documentElement.onmouseup = function (e) {
				self.createTransbtn(e);
			}
			document.documentElement.onmousedown = function (e) {
				self.startTrans(e);
			}
		}
	};
var translate=new Translate();
translate.init();
})()