class Rocket {
  constructor(lifespan) {
    this.pos = createVector(width/2,height);
    this.vel = createVector();
    this.acc = createVector();
    this.special = false;
    this.color = this.special ? color('red') : color(246, 193, 1, 150);
    this.dna = new DNA(lifespan);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  calculate_fitness(target) {
    const d = dist(this.pos.x, this.pos.y, target.x, target.y);
    const fitness = 1 / d;
    this.dna.fitness = pow(fitness, 4);
    return this.dna.fitness;
  }

  update(cycle) {
    this.applyForce(this.dna.genes[cycle]);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    strokeWeight(1);
    stroke(this.color);
    noFill(); // It is more performant without filling

		const r = 3;
		const angle = this.vel.heading();
		const anglePlus = 2.5;
    triangle(
			this.pos.x + Math.cos(angle) * r, this.pos.y + Math.sin(angle) * r,
			this.pos.x + Math.cos(angle + anglePlus) * r, this.pos.y + Math.sin(angle + anglePlus) * r,
			this.pos.x + Math.cos(angle - anglePlus) * r, this.pos.y + Math.sin(angle - anglePlus) * r
    );
   }
}