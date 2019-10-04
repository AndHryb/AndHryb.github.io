"use strict"
var imgs = document.getElementsByTagName('img');

for(var i = (imgs.length-1);i >=0;i--){
    var curentImg = imgs[i];
    var leftDist = curentImg.offsetLeft;
    var topDist = curentImg.offsetTop;
    curentImg.style.left = leftDist + 'px';
    curentImg.style.top = topDist +'px';
    curentImg.style.position = 'absolute';
    curentImg.addEventListener('mousedown',mouseDown);
    curentImg.addEventListener('mouseup',moseUp);
}


var shiftX;
var shiftY;
var movingImg;

function mouseDown(EO) {
    EO = EO || window.event;
    movingImg = EO.target;
    shiftX = EO.pageX-EO.target.offsetLeft;
    shiftY = EO.pageY-EO.target.offsetTop;
    window.addEventListener('mousemove',mouseMove );
    document.body.appendChild(movingImg);
    document.body.style.cursor = 'move';
}

function mouseMove(EO) {
    EO = EO || window.event;
    EO.preventDefault();
    movingImg.style.left = (EO.pageX - shiftX )+ 'px';
    movingImg.style.top = (EO.pageY - shiftY )+ 'px';
}
function moseUp(EO) {
    window.removeEventListener('mousemove',mouseMove);
    document.body.style.cursor = 'default';

}