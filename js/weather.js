function httpRequest(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
        }
    }
    // xhr.setRequestHeader('apikey','4e7eb9b999bc059d5280af320bbc182c');
    xhr.send();
}

function showWeather(result){
    result = JSON.parse(result);
    var wea=document.getElementById('weather');
    var weacode=parseInt(result['HeWeather data service 3.0'][0].now.cond.code);
 // alert(weacode);
    if (weacode==100||weacode==900||weacode==901) {
       
        document.getElementsByClassName('sunny')[0].style.visibility='visible';
    } else if(weacode>=101&&weacode<=213||weacode>=500&&weacode<=508){
        document.getElementsByClassName('cloudy')[0].style.visibility='visible';
    } else if(weacode>=300&&weacode<=304){
        document.getElementsByClassName('thunder-storm')[0].style.visibility='visible';
    } else if(weacode==305&&weacode==309){
        document.getElementsByClassName('sun-shower')[0].style.visibility='visible';
    } else if(weacode>=306&&weacode<=308||weacode>=310&&weacode<=313) {
        document.getElementsByClassName('rainy')[0].style.visibility='visible';
    } else if(weacode>=400&&weacode<=407){
        document.getElementsByClassName('flurries')[0].style.visibility='visible';
    }
}

var city = localStorage.city;
city = city?city:'changsha';
var url = 'https://api.heweather.com/x3/weather?city='+city+'&key=14226b16573f4f39898eb4d9d4a7e730 ';
httpRequest(url, showWeather);
