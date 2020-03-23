var bubbleX = []; 
var bubbleY = []; 

let fishMouthX = 220;
let fishMouthY = 380; 
var diameter;
let bubbleFrequency = 3; 

let img;

function preload() {
  img = loadImage('bgPhish.jpg');
  soundFile = loadSound('wading-phish.mp3');
}

function setup() {
  let canvas= createCanvas(480, 640);
  canvas.mouseClicked(togglePlay); 
  canvas.parent('sketch-wrapper');
  fft = new p5.FFT();
  
  
  for (i=0; i<bubbleFrequency; i++) {
    bubbleX[i] = fishMouthX; 
    bubbleY[i] = random((fishMouthY+10),(fishMouthY-10));
  } 
}

function draw() {
  image(img, 0,0);
  stroke("#Bc2b1b");
  noFill();
  
  analyseSound();
 
   for (i=0; i<bubbleX.length; i++){
     
      var myDataVal = getNewSoundDataValue("highMid");
      var myDataVal2 = getNewSoundDataValue("bass");
     //console.log(myDataVal);
  
      diameter = map(myDataVal, 0, 255, 0, 1000)*20;
      newStroke = map(myDataVal2, 0, 255, 0, 500)*10;
     
      
       strokeWeight(newStroke); 
     
     circle(bubbleX[i],bubbleY[i], diameter); 
    
     bubbleY[i] = bubbleY[i] - random(1, 10)  * random(0.15, 0.95);
     bubbleX[i]= bubbleX[i] + random((myDataVal*2), (myDataVal*-3)); 
    
    if (bubbleY[i] < 0) {
    
      bubbleY[i] = fishMouthY; 
      bubbleX[i] = fishMouthX;
        
    }
   }
}

// -------------------------  Sound Stuff -------------------------------
// a custom function for requesting the data from the audio analysis.
// this function converts the response from the API from a range of 0 to 255, to a range of 0 to 1.
// it's helpful to convert your data to this range as you can use it more easily when mapping the data value
// to visual parameters like scale, speed or colour, etc...
function getNewSoundDataValue(freqType) { 
  return map(fft.getEnergy(freqType),0,255,0,1); // get energy from frequency, scaled from 0 to 1
}

//Setup a new FFT instance (to analyse the sound) and set the sound’s amplification.
function initSound() { 
  fft = new p5.FFT(0.4,1024); // (smoothing, bins)
  soundFile.amp(0.7); 
}

function togglePlay() {
  if (soundFile.isPlaying()) {
    soundFile.pause();
  } else {
    soundFile.loop();
  }
}

function analyseSound() {
  soundSpectrum = fft.analyze(); // spectrum is array of amplitudes of each frequency?
}

