"use strict"

var fieldWidth = 600; //Длина поля

var RAF=
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame
;

var CAF = window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame||
    window.oCancelAnimationFrame||
    window.msCancelAnimationFrame
;

var myReq;

 function tennisBulder() {
     var startButton =  document.createElement('button');
     startButton.textContent = 'Старт!';
     startButton.style.marginLeft = (document.documentElement.clientWidth/2)-fieldWidth/2 + 'px';
     startButton.id = 'start';
     document.body.appendChild(startButton);

     var score = document.createElement('div');
     score.style.width = fieldWidth*0.3+'px';
     score.style.height = fieldWidth*0.15+'px';
     score.style.marginLeft = (document.documentElement.clientWidth/2)-fieldWidth*0.15 + 'px';
     score.style.backgroundColor = '#aaffee';
     score.style.fontSize = fieldWidth*0.14+'px';
     score.style.lineHeight = '100%';
     score.style.textAlign = 'center';
     score.textContent = '0:0';
     score.id = 'score';

     document.body.appendChild(score);


     var field = document.createElement('div');
     field.style.width = fieldWidth + 'px';
     field.style.height = Math.round(fieldWidth*0.6) +'px';
     field.style.marginLeft = (document.documentElement.clientWidth/2)-fieldWidth/2 + 'px';
     field.style.position = 'relative';
     field.style.backgroundColor = '#FFDD40';
     field.style.border = 'solid 1.5px #238D43';
     field.id = 'field';
     document.body.appendChild(field);

     var leftPlatform =  document.createElement('div');
     leftPlatform.style.width = fieldWidth*0.02 + 'px';
     leftPlatform.style.height = fieldWidth*0.2 +'px';
     leftPlatform.style.position = 'absolute';
     leftPlatform.style.top = fieldWidth*0.1 + 'px';
     leftPlatform.style.left = 0 + 'px';
     leftPlatform.style.backgroundColor = '#238D43';
     leftPlatform.id = 'leftPlatform';
     field.appendChild(leftPlatform);

     var rightPlatform =  document.createElement('div');
     rightPlatform.style.width = fieldWidth*0.02 + 'px';
     rightPlatform.style.height = fieldWidth*0.2 +'px';
     rightPlatform.style.position = 'absolute';
     rightPlatform.style.top = fieldWidth* 0.3 + 'px';
     rightPlatform.style.left = fieldWidth - fieldWidth*0.02  + 'px';
     rightPlatform.style.backgroundColor = '#238D43';
     rightPlatform.id = 'rightPlatform';
     field.appendChild(rightPlatform);

     var ball = document.createElement('div');
     ball.style.width = fieldWidth*0.05 +'px';
     ball.style.height = fieldWidth*0.05 + 'px';
     ball.style.borderRadius = '50%';
     ball.style.backgroundColor = '#FF1D00';
     ball.style.position = 'absolute';
     ball.style.left = fieldWidth/2 - fieldWidth*0.025 + 'px';
     ball.style.top = (fieldWidth*0.6)/2 - fieldWidth*0.025 + 'px';
     ball.id = 'ball';
     field.appendChild(ball);
 }

 tennisBulder();

 var ballModel = {
        posX:document.getElementById('ball').offsetLeft ,
        posY:document.getElementById('ball').offsetTop ,
        speedX:3,
        speedY:3,
        width:fieldWidth*0.05,
        height:fieldWidth*0.05,

        update:function () {
            var ballElem = document.getElementById('ball');
            ballElem.style.left = Math.round(this.posX)+'px';
            ballElem.style.top = Math.round(this.posY)+'px';
            ballElem.style.transform="translateZ(0)";
        }

 };

 var leftPlatformModel = {
     posY:document.getElementById('leftPlatform').offsetTop ,
     speedY:5,
     height:fieldWidth*0.2,
     width:fieldWidth*0.02,
     up:undefined,
     down:undefined,

     update:function () {
         var platformElem = document.getElementById('leftPlatform');
         platformElem.style.top = Math.round(this.posY)+'px';
         platformElem.style.transform= "translateZ(0)";

     }

};

var rightPlatformModel = {
    posY:document.getElementById('rightPlatform').offsetTop ,
    speedY:5,
    height:fieldWidth*0.2,
    width:fieldWidth*0.02,
    up:undefined,
    down:undefined,

    update:function () {
        var platformElem = document.getElementById('rightPlatform');
        platformElem.style.top = Math.round(this.posY)+'px';
        platformElem.style.transform=" translateZ(0)";

    }

};

var scoreModel = {
    leftPlayerScore:0,
    rightPlayerScore:0,
    update:function () {
        var scoreElem = document.getElementById('score');
        scoreElem.textContent = scoreModel.leftPlayerScore + ':' +scoreModel.rightPlayerScore;
    }
}



 function tick() {

     myReq = RAF(tick);

     ballModel.posX += ballModel.speedX;

     //вылетел ли правее стены?
     if(ballModel.posX + ballModel.width  > fieldWidth){
         ballModel.posX = fieldWidth - ballModel.width;
         CAF(myReq);
         scoreModel.rightPlayerScore++;
         scoreModel.update();
     }
     //вылетел ли мяч левее стены?
     if(ballModel.posX<0){
         ballModel.posX = 0;
         CAF(myReq);
         scoreModel.leftPlayerScore++;
         scoreModel.update();
     }

     ballModel.posY +=ballModel.speedY;

     //вылетел ли мяч ниже пола?
     if(ballModel.posY +ballModel.height> fieldWidth*0.6){
         ballModel.speedY = -ballModel.speedY;
         ballModel.posY = fieldWidth*0.6 - ballModel.height;
     }
    //вылетел ли мяч выше потолка?
     if(ballModel.posY<0){
         ballModel.speedY = -ballModel.speedY;
         ballModel.posY = 0;
     }

     //пересекается ли мяч с левой ракеткой?
     if((ballModel.posY +ballModel.height/2)>leftPlatformModel.posY&&
         (ballModel.posY+ballModel.height/2)<(leftPlatformModel.posY+leftPlatformModel.height)&&
         (ballModel.posX<=leftPlatformModel.width)){
         ballModel.speedX = -ballModel.speedX;
         ballModel.posX = leftPlatformModel.width;
     }

     //пересекается ли мяч с правой ракеткой?
     if((ballModel.posY+ ballModel.height/2)>rightPlatformModel.posY&&
         (ballModel.posY+ballModel.height/2)<(rightPlatformModel.posY+rightPlatformModel.height)&&
         (ballModel.posX >=(fieldWidth-rightPlatformModel.width-ballModel.width))){
         ballModel.speedX = -ballModel.speedX;
         ballModel.posX = fieldWidth - rightPlatformModel.width-ballModel.width;

     }



     if(leftPlatformModel.up){
         leftPlatformModel.posY += leftPlatformModel.speedY;
         leftPlatformModel.vector = 1;
     }

     if(leftPlatformModel.down){
         leftPlatformModel.posY -= leftPlatformModel.speedY;
         leftPlatformModel.vector = -1;
     }

     //платформа ниже поля?
     if (leftPlatformModel.posY > fieldWidth * 0.6 - leftPlatformModel.height) {
         leftPlatformModel.posY = fieldWidth * 0.6 - leftPlatformModel.height;
     }

     //платформа выше поля?
     if (leftPlatformModel.posY < 0) {
         leftPlatformModel.posY = 0;
     }

     if(rightPlatformModel.up){
         rightPlatformModel.posY += rightPlatformModel.speedY;
         rightPlatformModel.vector = 1;
     }

     if(rightPlatformModel.down){
         rightPlatformModel.posY -= rightPlatformModel.speedY;
         rightPlatformModel.vector = -1;
     }

     //платформа ниже поля?
     if (rightPlatformModel.posY > fieldWidth * 0.6 - rightPlatformModel.height) {
         rightPlatformModel.posY = fieldWidth * 0.6 - rightPlatformModel.height;
     }
     //платформа выше поля?
     if (rightPlatformModel.posY < 0) {
         rightPlatformModel.posY = 0;
     }


     ballModel.update();
     leftPlatformModel.update();
     rightPlatformModel.update();

 }


 function startGame() {
     ballModel.posX = fieldWidth/2 - fieldWidth*0.025 ;
     ballModel.posY = (fieldWidth*0.6)/2 - fieldWidth*0.025;
     ballModel.speedX = ((Math.random() < 0.5) ? -1 : 1)*3;
     ballModel.speedY = ((Math.random() < 0.5) ? -1 : 1)*3;
     ballModel.update();
     myReq = RAF(tick);

 }


 document.getElementById('start').addEventListener('click',startGame);

 window.addEventListener('keydown',pressedControlKey);
 window.addEventListener('keyup',releasedControlKey);

 function pressedControlKey(EO) {
    EO.preventDefault();
    if (EO.which === 17) {
        leftPlatformModel.up = true;
    }
    if (EO.which === 16) {
        leftPlatformModel.down = true;
    }
    if (EO.which === 40) {
        rightPlatformModel.up = true;

    }
    if (EO.which === 38) {
        rightPlatformModel.down = true;
    }
}

 function releasedControlKey(EO) {
    if (EO.which === 17) {
        leftPlatformModel.up = false;
    }
    if (EO.which === 16) {
        leftPlatformModel.down = false;
    }
    if (EO.which === 40) {
        rightPlatformModel.up = false;

    }
    if (EO.which === 38) {
        rightPlatformModel.down = false;
    }
}
