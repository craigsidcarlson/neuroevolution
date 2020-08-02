let width, height;
let header, body;
let start_time;
let draw_best_header, draw_best_body;
function setup() {
  width = 400;
  height = 400;
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  const cnv = createCanvas(width, height);
  cnv.position(x, y);
  init();
}

function init() {
  const mutation_rate = 0.01;
  const population_size = 200;
  header = new Population("Hi, I'm Craig!", mutation_rate, population_size);
  body = new Population("Welcome to my site.", mutation_rate, population_size);
  start_time = Date.now();
}
 
function draw() {
  background(51);
  header.evolve();
  body.evolve();
  textSize(24);
  fill(255);
  if(frameCount % 5 === 0)  {
    draw_best_header = header.best;
    draw_best_body = body.best;
  }
  if (header.finished) draw_best_header = header.best;
  if (body.finished) draw_best_body = body.best;

  text(draw_best_header, 10, 30);
  text(draw_best_body, 10, 60);

  textSize(14);

  // text(`Current generation: ${population.generation}`, 10, height - 30);
  // text(`Time taken: ${(Date.now() - start_time) / 1000} seconds`, 10, height - 10)
  if (header.finished && body.finished) noLoop();
}

