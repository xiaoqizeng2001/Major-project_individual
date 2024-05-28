let boatImage;
let group1Image; 
let birdsImage;

//set boat's size
let boatScale = 0.7;

//Perlin noise in mountain's movement
let mountainNoiseOffset = 0;

//Perlin noise in boat's horizontal and vertical movement
let boatXOffset = 0; 
let boatYOffset = 1000; 

//Perlin noise in bird flock's horizontal and vertical movement
let birdXOffset = 0;
let birdYOffset = 1000;

// Dove's position and target position
let doveX, doveY; 
let targetDoveX, targetDoveY;

function preload() {
  boatImage = loadImage('assets/transparent_boat.png');
  group1Image = loadImage('assets/dove.png');
  birdsImage = loadImage('assets/birds.png');
}

//Set canvas size
function setup() {
  createCanvas(windowWidth, windowHeight);

//initializa mountain noise offset
  mountainNoiseOffset = random(1000);

//initializa boat noise offset
  boatXOffset = random(3000);
  boatYOffset = random(1000, 3000);

//initializa bird's flock noise offset
  birdXOffset = random(1000);  
  birdYOffset = random(2000, 3000);

// Initialize the position of the dove in the center
  doveX = targetDoveX = width / 2;
  doveY = targetDoveY = height / 2;


//keep change to loop to continuously animate
  loop(); 
}

//the entire canvas, including the background, mountains, water, boats and birds
function draw() {
  background(230, 240, 240);

//let dove's position smoothly to the target
  doveX = lerp(doveX, targetDoveX, 0.05);
  doveY = lerp(doveY, targetDoveY, 0.05);

  drawLayeredMountains();
  drawWaterSurface();
  drawBoat();
  drawBirds();

//draw the dove in the new position
  image(group1Image, doveX - 85, doveY - 75, 170, 150); 
}

//make sure the mouse click is within the dove's image
function mousePressed() {
  let d = dist(mouseX, mouseY, doveX, doveY);
  if (d < 85) 
    targetDoveX = constrain(random(width), 0, width); 
    targetDoveY = random(height / 2 - 100, height / 2 + 200);  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  redraw(); // Redraw the screen when the window size changes
}

//draw mountains
function drawLayeredMountains() {
  let layers = 5;
  let maxHeight = height / 6;
  let noiseScale = 0.01;
  mountainNoiseOffset += 0.002;

// Each layer's color
  let colors = [
    color(50, 100, 100, 150), 
    color(70, 120, 120, 130),  
    color(90, 140, 140, 110),  
    color(110, 160, 160, 90),  
    color(130, 180, 180, 70)  
  ];
  for (let i = 0; i < layers; i++) {
    let baseHeight = height - (i * maxHeight * 0.5 + 120);
    fill(colors[i]);
    noStroke();
    beginShape();
    vertex(0, height);
    for (let x = 0; x <= width; x += 20) {
      let noiseVal = noise(x * noiseScale, mountainNoiseOffset + i * 100);
      let y = baseHeight - noiseVal * maxHeight;
      vertex(x, y);
    }
    vertex(width, height);
    endShape(CLOSE);
  }
}

//draw water surface
function drawWaterSurface() {
  fill(180, 200, 200, 180);
  rect(0, height - 100, width, 100);
}

//draw boat
function drawBoat() {

  boatXOffset += 0.002;
  boatYOffset += 0.002;

 //Set boat position using Perlin noise
  let boatX = noise(boatXOffset) * (width - boatImage.width * boatScale); 
  let boatY = height - boatImage.height * boatScale + 40 + noise(boatYOffset) * 20;
  
  tint(150, 150, 150, 150);
  image(boatImage, boatX, boatY, boatImage.width * boatScale, boatImage.height * boatScale);
  noTint();
}

function drawBirds() {
  birdXOffset += 0.001; 
  birdYOffset += 0.001; 

//Perlin noise is used to calculate the current position of the bird's flock
  let birdX = noise(birdXOffset) * width;
  let birdY = noise(birdYOffset) * (height / 4); 

  image(birdsImage, birdX, birdY, 300, 150);
}