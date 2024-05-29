//Class to manage preloading of all images
class ResourceLoader {
  constructor() {
    this.boatImage = null;
    this.group1Image = null;
    this.birdsImage = null;
  }

  preload() {
    this.boatImage = loadImage('assets/transparent_boat.png');
    this.group1Image = loadImage('assets/dove.png');
    this.birdsImage = loadImage('assets/birds.png');
  }
}
//Manage canvas properties and resize, and let the canvas to fit the window
class CanvasManager {
  constructor() {
    createCanvas(windowWidth, windowHeight);
  }

  windowResized() {
    resizeCanvas(windowWidth, windowHeight);
 //Resize the canvas and redraw
    redraw(); 
  }
}

//Class the background and layered mountains
class Background {
  constructor() {
    // Perlin noise in mountain's movement
    this.mountainNoiseOffset = random(1000);
  }

  draw() {
    background(230, 240, 240);
    this.drawLayeredMountains();
  }

  drawLayeredMountains() {
    let layers = 5;
    let maxHeight = height / 6;
    let noiseScale = 0.01;
    this.mountainNoiseOffset += 0.002;

    //Each layer's color
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
        let noiseVal = noise(x * noiseScale, this.mountainNoiseOffset + i * 100);
        let y = baseHeight - noiseVal * maxHeight;
        vertex(x, y);
      }
      vertex(width, height);
      endShape(CLOSE);
    }
  }
}

//Draw the water surface
class WaterSurface {
  draw() {
    fill(180, 200, 200, 180);
    rect(0, height - 100, width, 100);
  }
}

//Draw the boat on the water surface
class Boat {
  constructor(image, scale = 0.7) {
    this.image = image;
    this.scale = scale;

    //Perlin noise in boat's horizontal and vertical movement
    this.xOffset = random(3000);
    this.yOffset = random(1000, 3000);
  }

  draw() {
    this.xOffset += 0.002;
    this.yOffset += 0.002;

    let x = noise(this.xOffset) * (width - this.image.width * this.scale);
    let y = height - this.image.height * this.scale + 40 + noise(this.yOffset) * 20;
    
    tint(150, 150, 150, 150);
    image(this.image, x, y, this.image.width * this.scale, this.image.height * this.scale);
    noTint();
  }
}

//Manages the dove and bird flock, positioning them on the canvas
class Overlay {
  constructor(group1Image, birdsImage) {
    this.group1Image = group1Image;
    this.birdsImage = birdsImage;

    //Perlin noise in bird flock's horizontal and vertical movement
    this.birdXOffset = random(1000);
    this.birdYOffset = random(2000, 3000);
  }

  draw(doveX, doveY) {
    image(this.group1Image, doveX - 85, doveY - 75, 170, 150);
  }

  drawBirds() {
    this.birdXOffset += 0.001;
    this.birdYOffset += 0.001;

    let birdX = noise(this.birdXOffset) * width;
    let birdY = noise(this.birdYOffset) * (height / 4);

    image(this.birdsImage, birdX, birdY, 300, 150);
  }
}

//Create a film snow effect on the canvas
class FilmEffect {
  draw() {
    for (let i = 0; i < 50; i++) {
      fill(255, 255, 255, random(250, 400));
      noStroke();
      ellipse(random(width), random(height), 4, 3);
    }
    
    if (random(100) < 1) {
      fill(255, 255, 255, random(100, 300));
      rect(0, 0, width, height);
    }
  }
}

let resourceLoader = new ResourceLoader();
let canvasManager;
let background;
let waterSurface;
let boat;
let overlay;
let filmEffect;

let doveX, doveY, targetDoveX, targetDoveY;

function preload() {
  resourceLoader.preload();
}

function setup() {
  canvasManager = new CanvasManager();
  background = new Background();
  waterSurface = new WaterSurface();
  boat = new Boat(resourceLoader.boatImage);
  overlay = new Overlay(resourceLoader.group1Image, resourceLoader.birdsImage);
  filmEffect = new FilmEffect();

  //Initializes the initial position and target position of the dove
  doveX = targetDoveX = width / 2;
  doveY = targetDoveY = height / 2;
  
  //keep change to loop to continuously animate
  loop();
}

function draw() {
  background.draw();

  //Let dove's position smoothly approach the target
  doveX = lerp(doveX, targetDoveX, 0.05);
  doveY = lerp(doveY, targetDoveY, 0.05);

  waterSurface.draw();
  boat.draw();
  overlay.draw(doveX, doveY);
  overlay.drawBirds();
  filmEffect.draw();
}

function drawSnowOrFilmGrain() {
  for (let i = 0; i < 50; i++) {
    fill(255, 255, 255, random(250, 400)); 
    noStroke();
    ellipse(random(width), random(height), 4, 3);
  }
  
  if (random(100) < 1) { 
    fill(255, 255, 255, random(100, 300));
    rect(0, 0, width, height);
  }
}

function mousePressed() {
  let d = dist(mouseX, mouseY, doveX, doveY);
  if (d < 85) {
    targetDoveX = constrain(random(width), 0, width); 
    targetDoveY = random(height / 2 - 100, height / 2 + 200);  
  }
}

function windowResized() {
  canvasManager.windowResized();
}
