var centerX = 0;
var centerY = 0;

function myMove() {
  var elem = document.getElementById("myAnimation");
  var id = setInterval(frame, 500);
  function frame() {
      movement();
      if ((centerX >= 1600) || (centerY >= 1600)){
        console.log("Collision");
      }
      else if ((centerX <= 0) || (centerY <= 0)){
        console.log("Collision");
      }
      else{
      elem.style.top = centerY + 'px';
      elem.style.left = centerX + 'px';
      }
    }

}

function movement() {
  document.addEventListener('keydown', function(event){
    const displacement = 0.5;

    if (event.keyCode == 65) {
        centerX -= displacement;
        console.log(centerX , centerY);
    } else if(event.keyCode == 87) {
        centerY -= displacement;
        console.log(centerX , centerY);
    } else if(event.keyCode == 68) {
        centerX += displacement;
        console.log(centerX , centerY);
    } else if (event.keyCode == 83) {
        centerY += displacement;
        console.log(centerX , centerY);
    }

  })
}
