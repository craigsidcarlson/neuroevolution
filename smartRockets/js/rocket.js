class Rocket {
  constructor(lifespan) {
    this.pos = createVector(width/2,height);
    this.vel = createVector();
    this.acc = createVector();
    this.special = false;
    this.color = this.special ? color('red') : color(246, 193, 1, 150);
    this.dna = new DNA(lifespan);
    this.max_speed = 3;
    this.arrived = false;
    this.crashed = false;
    this.abs_dist;
    this.cycle_arrived;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  // pass in target (x & y coordinates that it is trying to reach) 
  calculate_fitness() {
    const fitness = 1 / (this.abs_dist + 0.00001);
    this.dna.fitness = pow(fitness, 4);

    if (this.crashed) {
      this.dna.fitness /= 10;
    }

    if (this.arrived) {
      if (this.cycle_arrived > 1 ) debugger;
      this.dna.fitness *= this.cycle_arrived;
    }
    return this.dna.fitness;
  }

  update(cycle) {
    this.abs_dist = abs(dist(this.pos.x, this.pos.y, destination.x, destination.y));
    if (this.abs_dist < 4) {
      this.arrived = true;
      this.color = color('red');
      this.cycle_arrived = cycle;
    }

    if (
      this.pos.x > rx &&
      this.pos.x < rx + rw && 
      this.pos.y > ry &&
      this.pos.y < ry + rh
    ) {
      this.crashed = true;
    }

    this.applyForce(this.dna.genes[cycle]);
    if (!this.arrived && !this.crashed) {
      this.vel.add(this.acc);
      this.vel.limit(this.max_speed);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
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