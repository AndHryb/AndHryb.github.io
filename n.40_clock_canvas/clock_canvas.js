"use strict"

var clockRadius = 300; //радиус часов в пикселях
var hoursOnClockFace = 12;// количество часов

function str0l(val,len) {
    var strVal=val.toString();
    while ( strVal.length < len )
        strVal='0'+strVal;
    return strVal;
}

function clockBuilder() {
    var clockArea = document.getElementById('clockArea');
    clockArea.setAttribute('width',clockRadius*2);
    clockArea.setAttribute('height',clockRadius*2);
    clockArea.style.marginLeft = (document.documentElement.clientWidth/2)-clockRadius + 'px';
    var context = clockArea.getContext('2d');

    context.fillStyle = '#FF7100';
    context.arc(clockRadius,clockRadius,clockRadius,0,Math.PI*2,false);
    context.fill();


    for(var i= 1;i<= hoursOnClockFace;i++){
        context.fillStyle = '#007B25';
        var cx = clockRadius + Math.round((clockRadius*0.85)*Math.sin(Math.PI *(360/hoursOnClockFace)*i/180));
        var cy = clockRadius - Math.round((clockRadius*0.85)*Math.cos(Math.PI *(360/hoursOnClockFace)*i/180));
        context.beginPath();
        context.arc(cx,cy,clockRadius*0.1,0,Math.PI*2,false);
        context.fill();
        context.fillStyle = '#000';
        context.font ='normal '+clockRadius*0.14+'px Arial';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(i,cx,cy);
    }


    var soon = new Date();
    var hours = soon.getHours();

    if(hoursOnClockFace < 12){
        hours = hours % 12;
    }

    var minutes = soon.getMinutes();
    var seconds = soon.getSeconds();

    var hourClockHand = {   x1:clockRadius - Math.round((clockRadius*0.05)*Math.sin(Math.PI *((360/hoursOnClockFace)*(hours + minutes/60))/180)),
                            y1:clockRadius + Math.round((clockRadius*0.05)*Math.cos(Math.PI *((360/hoursOnClockFace)*(hours + minutes/60))/180)),
                            x2:clockRadius + Math.round((clockRadius*0.6)*Math.sin(Math.PI *((360/hoursOnClockFace)*(hours + minutes/60))/180)),
                            y2:clockRadius - Math.round((clockRadius*0.6)*Math.cos(Math.PI *((360/hoursOnClockFace)*(hours + minutes/60))/180))};

    context.strokeStyle = '#000';
    context.lineWidth = clockRadius*0.1;
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(hourClockHand.x1,hourClockHand.y1);
    context.lineTo(hourClockHand.x2,hourClockHand.y2);
    context.stroke();

    var minuteClockHand = { x1:clockRadius - Math.round((clockRadius*0.05)*Math.sin(Math.PI *(minutes*(360/60))/180)),
                            y1:clockRadius + Math.round((clockRadius*0.05)*Math.cos(Math.PI *(minutes*(360/60))/180)),
                            x2:clockRadius + Math.round((clockRadius*0.7)*Math.sin(Math.PI *(minutes*(360/60))/180)),
                            y2:clockRadius - Math.round((clockRadius*0.7)*Math.cos(Math.PI *(minutes*(360/60))/180))};

    context.strokeStyle = '#000';
    context.lineWidth = clockRadius*0.05;
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(minuteClockHand.x1,minuteClockHand.y1);
    context.lineTo(minuteClockHand.x2,minuteClockHand.y2);
    context.stroke();

    var secondClockHand = { x1:clockRadius - Math.round((clockRadius*0.05)*Math.sin(Math.PI *(seconds*(360/60))/180)),
                            y1:clockRadius + Math.round((clockRadius*0.05)*Math.cos(Math.PI *(seconds*(360/60))/180)),
                            x2:clockRadius + Math.round((clockRadius*0.8)*Math.sin(Math.PI *(seconds*(360/60))/180)),
                            y2:clockRadius - Math.round((clockRadius*0.8)*Math.cos(Math.PI *(seconds*(360/60))/180))};

    context.strokeStyle = '#000';
    context.lineWidth = clockRadius*0.025;
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(secondClockHand.x1,secondClockHand.y1);
    context.lineTo(secondClockHand.x2,secondClockHand.y2);
    context.stroke();

    context.fillStyle ='#929292';
    context.beginPath();
    context.arc(clockRadius,clockRadius,clockRadius*0.01,0,Math.PI*2,false);
    context.fill();

    context.fillStyle = '#000';
    context.font ='normal '+clockRadius*0.17+'px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(str0l(hours,2) + ':' +str0l( minutes,2) + ':' +str0l(seconds,2),clockRadius,clockRadius*0.45);

}
clockBuilder();

setInterval(clockBuilder,(1010 - new Date().getMilliseconds()));