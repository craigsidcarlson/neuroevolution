let width, height;
let x, y;
let start_time;
let draw_best_header, draw_best_body;
let destination;
let population;
const obstacles = [];
let rx, ry;
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
    rect(obstacles[i].x, obstacles[i].y, obstacles[i].w, obstacles[i].h);
  }
  if (!cycle) {
    population.evolve(destination);
  }
  if (rx) {
    rect(rx, ry, mouseX-rx, mouseY-ry);
  }

}

function mousePressed() {
  console.log(`x: ${mouseX}, y: ${mouseY}`);
  if (!rx) {
    rx = mouseX;
    ry = mouseY;
  } else {
    obstacles.push({x: rx, y: ry, w: mouseX-rx, h: mouseY-ry });
    rx = null;
    ry = null;
  }
  // prevent default
  return false;
}

