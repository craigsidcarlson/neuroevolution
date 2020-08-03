let width, height;
let x, y;
let start_time;
let draw_best_header, draw_best_body;
let destination;
let population;
let lifeCycleText, genText;
const rx = 100;
const ry = 150;
const rw = 200;
const rh = 10;


function setup() {
  width = 500;
  height = 500;
  x = (windowWidth - width) / 2;
  y = (windowHeight - height) / 2;
  const cnv = createCanvas(width, height);
  cnv.position(x, y);
  lifeCycleText = createP();
  genText = createP();

  init();
}

function init() {
  const mutation_rate = 0.01;
  const population_size = 200;
  destination = createVector(width/2, 25);
  population = new Population(mutation_rate, population_size);
}
 
function draw() {
  background(51);
  const cycle = population.show();
  ellipse(destination.x, destination.y, 12, 12);
  lifeCycleText.html(`Life cycle: ${cycle}`);
  genText.html(`Generation: ${population.generation}`);

  fill(255);
  rect(rx, ry, rw, rh);



  if (!cycle) {
    population.evolve(destination);
  }
}

function mouseClicked() {
  console.log(`x: ${mouseX}, y: ${mouseY}`);
  // prevent default
  return false;
}

