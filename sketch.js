var bubbleX = []; 
var bubbleY = []; 

let fishMouthX = 220;
let fishMouthY = 380; 
let diameter = 25;
 
let img;
function preload() {
  img = loadImage('bgPhish.jpg');
}

function setup() {
  let canvas= createCanvas(480, 640);
  canvas.parent('sketch-wrapper');
  
  for (i=0; i<7; i++) {
    bubbleX[i] = fishMouthX; 
    bubbleY[i] = random((fishMouthY+10),(fishMouthY-10));
  } 
}

function draw() {
  image(img, 0,0);
  strokeWeight(10);
  stroke("#Bc2b1b");
  noFill();
  
  
   for (i=0; i<bubbleX.length; i++){
     
     circle(bubbleX[i],bubbleY[i], diameter); 
    
     bubbleY[i] = bubbleY[i] - random(1, 10)  * random(0.15, 0.95);
     bubbleX[i]= bubbleX[i] + random(-1, 1); 
    
    if (bubbleY[i] < 0) {
    
      bubbleY[i] = fishMouthY; 
      bubbleX[i] = fishMouthX;
        
    }
   }
    
}

