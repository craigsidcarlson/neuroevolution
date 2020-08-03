class Rocket {
  constructor(lifespan) {
    this.pos = createVector(25,height/2);
    this.vel = createVector();
    this.acc = createVector();
    this.special = false;
    this.color = this.special ? color('red') : color(246, 193, 1, 150);
    this.dna = new DNA(lifespan);
    this.max_speed = 3;
    this.arrived = false;
    this.crashed = false;
    this.abs_dist;
    this.cycle_arrived = 0;
    this.collision_dist = 2;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  // pass in target (x & y coordinates that it is trying to reach) 
  calculate_fitness() {
    const fitness = 1 / (this.abs_dist + 0.00001);
    this.dna.fitness = pow(fitness, 4);

    if (this.crashed) {
      this.dna.fitness /= 2;
    }

    if (this.arrived) {
      this.dna.fitness *= pow(this.cycle_arrived, 4);
    }
    return this.dna.fitness;
  }

  update(cycle) {
    this.abs_dist = abs(dist(this.pos.x, this.pos.y, destination.x, destination.y));
    if (this.abs_dist < 6 && !this.arrived) {
      this.arrived = true;
      this.color = color('green');
      this.cycle_arrived = cycle;
    }

    if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
      this.crashed = true;
      this.color = color('purple');
    }

    for (let i = 0; i < obstacles.length; i++) {
      if (this.intersectsObstacles(obstacles)) {
        this.crashed = true;
        this.color = color('red');
      }
    }

    this.applyForce(this.dna.genes[cycle]);
    if (!this.arrived && !this.crashed) {
      this.vel.add(this.acc);
      this.vel.limit(this.max_speed);
      this.pos.add(this.vel);
      this.acc.mult(0);
    }
    return this.cycle_arrived;
  }

  intersectsObstacles(obs) {
    for (let i = 0; i < obs.length; i++) {
      const distance = this.calcDistanceToLineSegment(obs[i]);
      if (distance < this.collision_dist) return true;
    }
    return false;
  }

  calcDistanceToLineSegment(o) {
    const dist_a = dist(this.pos.x, this.pos.y, o.x1, o.y1);
    const dist_b = dist(this.pos.x, this.pos.y, o.x2, o.y2);
    const dist_c = dist(o.x1, o.y1,o.x2, o.y2);
    
    if (sq(dist_b) > (sq(dist_a) + sq(dist_c))) {
      return dist_a;
    } else if(sq(dist_a) > (sq(dist_b) + sq(dist_c))) {
      return dist_b;
    } else {
      const s = (dist_a + dist_b + dist_c)/2;
      return (2/dist_c) * sqrt(s * (s-dist_a)*(s-dist_b)*(s-dist_c));
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