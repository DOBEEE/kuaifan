var check=document.getElementById('check');
var n=0;
check.onclick=function () {
    if (check.checked) {
        n=1;
    } else {
        n=0;
    }
  chrome.runtime.sendMessage(n, function(response){
    check.checked=response;
  });
}
window.onload=function (argument) {
    chrome.runtime.sendMessage('check', function(response){
        check.checked=response;
    });
}