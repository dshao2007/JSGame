var rec1;

var xInc = 400; // horixontal spacing between each rectangle that will be changed later
var yInc = 0; // vertical spacing between each rectangle that will be changed later
var rectLength = 150; // X value
var rectWidth = 75; // Y value
var rectX = 0; //initial top left x coordinate of the rectangle
var rectY = 0; //initial top left y coordinate of the rectangle
var rectangles = new Array (10); //stores all x and y coordinates of top left vertice of each rectangle in an array
var playerStorage = new Map();
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
const socket = new WebSocket('ws://127.0.0.1:5000/ws');
var playerCircle;

socket.onmessage = function (event) {
  var ev = (JSON.parse(event.data))
  switch(ev.name) {
    case 'new':
      //function to add new player
      new Circle(parseFloat(ev.centerX), parseFloat(ev.centerY), parseFloat(ev.radius), ev.identifier);
    case 'delete':
      //function to delete player
    case 'move':
      //function to move player by id
      playerStorage.get(ev.id).moveCircle(ev.centerX, ev.centerY);
    case 'getId':
      //store id
      playerCircle = new Circle(centerX, centerY, radius, ev.uid);
    default:
      //nothing
  }
}

class Rectangle {
  constructor(xLeftValue, yLeftValue, length, width) {
    this.xLeftValue = xLeftValue;
    this.yLeftValue = yLeftValue;
    this.length = length;
    this.width = width;
  }

  wouldCollideWithCircle(x, y, r) {
     if (y+r < this.yLeftValue || y-r > (this.yLeftValue + this.width)
        || (x+r) < this.xLeftValue || (x-r) > (this.xLeftValue + this.length)) {
        return false;
     }
     else {
        beep();
        return true;
      }
  }
}

class Circle {

  createCircle() {
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
    ctx.stroke();
    console.log(playerStorage.get(this.id));
  }

  moveCircle(newX, newY) {

    ctx.clearRect(this.x - radius - 0.9, this.y - radius -0.9,
    radius * 2 + 1.9, radius * 2 + 1.9);

    ctx.beginPath();
    ctx.arc(newX,newY,radius,0,2*Math.PI);
    ctx.stroke();

    this.x = newX;
    this.y = newY;
  }

  changeId(uid) {
    this.id = uid;
  }
  /*
  circleCollision() {
    for (var circle of myMap.values()) {
      console.log(circle);
    }
    if ((Math.sqrt(((circle.x - this.x) (circle.x - this.x)) + (circle.y - this.y)(circle.y - this.y))) == (this.r + circle.radius)){
      return true;
    }
    else{
      return false;
    }
  }
  */
  constructor(x, y, r, id) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.id = id;
    playerStorage.set(id, this);
    this.createCircle();
  }

}

ctx.fillSxtyle = "#FF0000";
  playerCircle = new Circle(centerX, centerY, radius,"16");
for (let j = 0; j < 10; j++) {
  ctx.fillRect(rectX,rectY,rectLength,rectWidth);
  rectangles[j] = new Rectangle(rectX, rectY, rectLength, rectWidth);
  rectX += xInc;

  if (rectX >=(1024 + xInc) ) {
    rectX = 0;
    rectY += 200;
    rectangles[j] = new Rectangle(rectX, rectY, rectLength, rectWidth);
  }
}
var centerX = 512;
var centerY = 512;
var radius = 25;



//var bbb = new Circle(552, 552 , radius, "7");
//c.createCircle();

function beep() {
    var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
    snd.play();
}

function collisionDetection () {
  for (let j = 0; j < rectangles.length; j++) {

    if (rectangles[j].wouldCollideWithCircle(centerX, centerY, radius)) {
      return true;
    }
  }
}


function circleCollision(){
  if ((Math.sqrt(((centerX - 552) * (centerX - 552)) + (centerY - 552) * (centerY - 552))) <= (2 * radius)){
    return true;
  }
  else{
    return false;
  }
}

//MOVE
document.addEventListener('keydown', function(event) {
  const displacement = 10;
    var prevX = centerX;
    var prevY = centerY;

  if (event.keyCode == 65) {
      centerX -= displacement;
      socket.send(JSON.stringify({name: "move", id: playerCircle.id, positionX: centerX, positionY: centerY}));
  } else if(event.keyCode == 87) {
      centerY -= displacement;
      socket.send(JSON.stringify({name: "move", id: playerCircle.id, positionX: centerX, positionY: centerY}));
  } else if(event.keyCode == 68) {
      centerX += displacement;
      socket.send(JSON.stringify({name: "move", id: playerCircle.id, positionX: centerX, positionY: centerY}));
  } else if (event.keyCode == 83) {
      centerY += displacement;
      socket.send(JSON.stringify({name: "move", id: playerCircle.id, positionX: centerX, positionY: centerY}));
  }

  if (collisionDetection() || circleCollision ()) {
       centerX = prevX;
       centerY = prevY;
  } else {
    //clears user circle
    ctx.clearRect(prevX - radius - 0.9, prevY - radius -0.9,
    radius * 2 + 1.9, radius * 2 + 1.9);

    //clears other rectangle
    ctx.clearRect(552 - radius - 0.9, 552 - radius -0.9,
    radius * 2 + 1.9, radius * 2 + 1.9);

    //redraw other rectangle
    ctx.beginPath();
    ctx.arc(552,552,radius,0,2*Math.PI);
    ctx.stroke();

    //redraw current rectangle
    ctx.beginPath();
    ctx.arc(centerX,centerY,radius,0,2*Math.PI);
    ctx.stroke();
  }



});
