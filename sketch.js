let boatImage, group1Image, birdsImage;
let boatScale = 0.7;

//Perlin noise in mountain's movement
let mountainNoiseOffset = 0;

//Perlin noise in boat's horizontal and vertical movement
let boatXOffset = 0; 
let boatYOffset = 1000; 

function preload() {
  boatImage = loadImage('assets/transparent_boat.png');
  group1Image = loadImage('assets/Group 1.png'); 
  birdsImage = loadImage('assets/birds.png'); 
}

//Set canvas size
function setup() {
  createCanvas(windowWidth, windowHeight);

//initializa mountain noise offset
  mountainNoiseOffset = random(1000);

  boatXOffset = random(3000);
  boatYOffset = random(1000, 3000);

  loop(); // Change to loop to continuously animate
}

//the entire canvas, including the background, mountains, water, boats and birds
function draw() {
  background(230, 240, 240);
  drawLayeredMountains();
  drawWaterSurface();
  drawBoat();
  
// Draw a Group 1 image on top of everything
  image(group1Image, 460, 300, 170, 150);
  image(birdsImage, 1000, 0, 300, 150);
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
