let width, height;
let x, y;
let start_time;
let draw_best_header, draw_best_body;
let destination;
let population;
const obstacles = [];
let x1, y1;
let newRect;

function setup() {
  width = windowWidth * 0.75;
  height = windowHeight * 0.75;
  x = (windowWidth - width) / 2;
  y = (windowHeight - height) / 2;
  const cnv = createCanvas(width, height);
  cnv.position(x, y);
  init();
}

function init() {
  const mutation_rate = 0.01;
  const population_size = 200;
  destination = createVector(width/2, 25);
  population = new Population(mutation_rate, population_size);
}
 
function draw() {
  background(44, 62, 80);
  const cycle = population.show();

  fill(255);
  noStroke();
  ellipse(destination.x, destination.y, 12, 12);
  text(`Steps remaining: ${cycle}`, 10, height - 50);
  text(`Generation: ${population.generation}`, 10, height - 30);
  text(`Fastest time: ${population.fastest_time}`, 10, height - 10);
  for (let i = 0; i < obstacles.length; i++) {
    stroke(255);
    strokeWeight(2);
    line(obstacles[i].x1, obstacles[i].y1, obstacles[i].x2, obstacles[i].y2);
  }
  if (!cycle) {
    population.evolve(destination);
  }
  if (x1) {
    stroke(255);
    strokeWeight(5);
    line(x1, y1, mouseX, mouseY);
  }

}

function mousePressed() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) { 
    if (!x1) {
      x1 = mouseX;
      y1 = mouseY;
    } else {
      obstacles.push({x1, y1, x2: mouseX, y2: mouseY });
      x1 = null;
      y1 = null;
    }
  }
  
  // prevent default
  return false;
}

