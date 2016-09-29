var orstart=true;
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    // alert(message);

    if(message==1){
        sendResponse(true);
        orstart=true;
        chrome.browserAction.setIcon({path: 'images/icon38.png'});
    }else if(message=='check'){
    	sendResponse(orstart);
    }else{
    	orstart=false;
        chrome.browserAction.setIcon({path: 'images/38-off.png'});
    	sendResponse(false);
    }
});