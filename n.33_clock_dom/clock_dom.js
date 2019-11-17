"use strict"

var clockRadius = 300; //радиус часов в пикселях
var hoursOnClockFace = 12;// количество часов


function clockBuilder() {

    var clock = document.createElement('div');
    clock.style.width = (clockRadius*2)+'px';
    clock.style.height = (clockRadius*2)+'px';
    clock.style.borderRadius = '50%';
    clock.style.backgroundColor = '#FF7100';
    clock.style.marginLeft = (document.documentElement.clientWidth/2)-clockRadius + 'px';
    clock.id = "clock";
    document.body.appendChild(clock);

    var clockCenterX = clock.offsetLeft+clock.offsetWidth/2;

    var clockCenterY = clock.offsetTop+clock.offsetHeight/2;


    for(var i= 1;i<= hoursOnClockFace;i++) {
        var clockNumb = document.createElement('div');
        clockNumb.style.width = (clockRadius / 6) + 'px';
        clockNumb.style.height = (clockRadius / 6) + 'px';
        clockNumb.style.borderRadius = '50%';
        clockNumb.style.lineHeight = '100%';
        clockNumb.style.fontSize= (clockRadius / 6) + 'px';
        clockNumb.style.textAlign = 'center';
        clockNumb.style.backgroundColor = '#007B25';
        clockNumb.style.position = 'absolute';
        clockNumb.textContent = i ;
        var clockNumbCenterX = clockCenterX +(clockRadius*0.85 )*Math.sin(Math.PI *(360/hoursOnClockFace)*i/180);
        var clockNumbCenterY = clockCenterY  - (clockRadius*0.85)*Math.cos((Math.PI *(360/hoursOnClockFace)*i/180));
        clockNumb.style.left=Math.round(clockNumbCenterX - (clockRadius / 12))+'px';
        clockNumb.style.top=Math.round(clockNumbCenterY - (clockRadius / 12))+'px';
        clock.appendChild(clockNumb);
    }

    var hourClockHand = document.createElement('div');
    hourClockHand.style.width = clockRadius*0.1+'px';
    hourClockHand.style.height = clockRadius*0.65 + 'px';
    hourClockHand.style.borderRadius = clockRadius*0.05 + 'px';
    hourClockHand.style.backgroundColor =  '#000';
    hourClockHand.style.position = 'absolute';
    hourClockHand.style.left = clockCenterX  - clockRadius*0.05+'px';
    hourClockHand.style.top = clockCenterY  - clockRadius*0.65 + clockRadius*0.65*0.1  +'px';
    hourClockHand.style.transformOrigin = '50% 90%';
    hourClockHand.id = "hoursHand"
    clock.appendChild(hourClockHand);


    var minuteClockHand = document.createElement('div');
    minuteClockHand.style.width = clockRadius*0.05+'px';
    minuteClockHand.style.height = clockRadius*0.9 + 'px';
    minuteClockHand.style.borderRadius = clockRadius*0.025 + 'px';
    minuteClockHand.style.backgroundColor =  '#000';
    minuteClockHand.style.position = 'absolute';
    minuteClockHand.style.left = clockCenterX  - clockRadius*0.025+'px';
    minuteClockHand.style.top = clockCenterY  - clockRadius*0.9 + clockRadius*0.9*0.1  +'px';
    minuteClockHand.style.transformOrigin = '50% 90%';
    minuteClockHand.id = "minutesHand";
    clock.appendChild(minuteClockHand);


    var secondClockHand = document.createElement('div');
    secondClockHand.style.width = clockRadius*0.02+'px';
    secondClockHand.style.height = clockRadius*0.98 + 'px';
    secondClockHand.style.borderRadius = clockRadius*0.01 + 'px';
    secondClockHand.style.backgroundColor =  '#000';
    secondClockHand.style.position = 'absolute';
    secondClockHand.style.left = clockCenterX  - clockRadius*0.01+'px';
    secondClockHand.style.top = clockCenterY  - clockRadius*0.98 + clockRadius*0.98*0.1  +'px';
    secondClockHand.style.transformOrigin = '50% 90%';
    secondClockHand.id = "secondsHand";
    clock.appendChild(secondClockHand);


    var digitalClock = document.createElement('div');
    digitalClock.style.width = clockRadius*0.6+'px';
    digitalClock.style.height = clockRadius*0.2 + 'px';
    digitalClock.style.position = 'absolute';
    digitalClock.style.left = clockCenterX  - clockRadius*0.3+'px';
    digitalClock.style.top = clockCenterY  - clockRadius*0.6   +'px';
    digitalClock.textContent = ('00:00:00');
    digitalClock.style.lineHeight = '100%';
    digitalClock.style.fontSize = clockRadius*0.15 + 'px';
    digitalClock.style.textAlign = 'center';
    digitalClock.id ="digitalClock";
    clock.appendChild(digitalClock);
}






function str0l(val,len) {
    var strVal=val.toString();
    while ( strVal.length < len )
        strVal='0'+strVal;
    return strVal;
}


function setTime() {
    var soon = new Date();
    var hours = soon.getHours();

    if(hoursOnClockFace < 12){
        hours = hours % 12;
    }

    var minutes = soon.getMinutes();
    var seconds = soon.getSeconds();

    document.getElementById("digitalClock").textContent = str0l(hours,2) + ':' +str0l( minutes,2) + ':' +str0l(seconds,2);


    var hourAngle = (360/hoursOnClockFace *hours )+ (360/hoursOnClockFace)/60*minutes;
    document.getElementById("hoursHand").style.transform = "rotate("+hourAngle+"deg)";

    var minuteAngle = (360/60)*minutes;
    document.getElementById("minutesHand").style.transform = "rotate("+minuteAngle+"deg)";

    var secondAngle = (360/60)*seconds;
    document.getElementById("secondsHand").style.transform = "rotate("+secondAngle+"deg)";
}
clockBuilder();
setTime();

setInterval(setTime,(1010 - new Date().getMilliseconds()));