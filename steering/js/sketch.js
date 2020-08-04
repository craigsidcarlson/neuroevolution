let width, height;
let x, y;
let start_time;
let env;

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
  env = new Environment(mutation_rate, population_size);
}
 
function draw() {
  background(44, 62, 80);

  env.addFood()
  env.addPoison();
  env.showFood();
  env.showPoison();
  env.showPopulation();

}

function mouseClicked() {
  env.addNewCreature(mouseX, mouseY);
}
