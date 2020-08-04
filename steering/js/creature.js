class Creature {
  constructor(x, y, parent_dna) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.max_speed = 2;
    this.vel.limit(this.max_speed);
    this.acc = createVector(0, 0);
    this.r = 4;
    this.max_force = 0.5;
    this.health = 1;
    this.clone_prob = 0.00225;
    if (!parent_dna) {
      this.dna = new DNA();
      this.dna.genes[0] = random(-2, 2);
      this.dna.genes[1] = random(-2, 2);
      this.dna.genes[2] = random(0, 100);
      this.dna.genes[3] = random(0, 100);
    } else {
      this.dna = parent_dna;
      this.dna.mutate();
    }
  }
  
  update() {
    this.health -= 0.003;

    this.vel.add(this.acc);
    this.vel.limit(this.max_speed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  behaviors(good, bad) {
    const steer_good = this.eat(good, 0.2, this.dna.genes[2]);
    const steer_bad = this.eat(bad, -1, this.dna.genes[3]);

    steer_good.mult(this.dna.genes[0]);
    steer_bad.mult(this.dna.genes[1]);
    
    steer_good.limit(this.max_force);
    steer_bad.limit(this.max_force);

    this.applyForce(steer_good);
    this.applyForce(steer_bad);
  }

  clone() {
    if (random(1) < this.clone_prob) {
      return new Creature(this.pos.x, this.pos.y, this.dna);
    }
  }

  eat(targets, nutrition, perception) {
    let record = Infinity;
    let closest = null;

    for ( let i = targets.length - 1; i >= 0; i--) {
      const dist = this.pos.dist(targets[i]);

      // This might the wrong check, might need to be max speed
      if (dist < this.max_speed) {
        targets.splice(i, 1);
        this.health += nutrition;
      } else {
         if (dist < record && dist < perception) {
           record = dist;
           closest = targets[i];
         }
      }
    }

    if (closest) {
      return this.seek(closest);
    }
    return createVector(0,0);
  }

  seek(target) {
    const desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.max_speed);

    const steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.max_force);

    return steer;
  }

  dead() { return this.health < 0 }

  show() {
    strokeWeight(1);
    var gr = color(0, 255, 0);
    var rd = color(255, 0, 0);
    this.color = lerpColor(rd, gr, this.health);
    stroke(this.color);
    fill(this.color);
		const r = 3;
		const angle = this.vel.heading();
		const anglePlus = 2.5;
    triangle(
			this.pos.x + Math.cos(angle) * r, this.pos.y + Math.sin(angle) * r,
			this.pos.x + Math.cos(angle + anglePlus) * r, this.pos.y + Math.sin(angle + anglePlus) * r,
			this.pos.x + Math.cos(angle - anglePlus) * r, this.pos.y + Math.sin(angle - anglePlus) * r
    );
  }

  boundaries(d) {
    let desired = null;

    if (this.pos.x < d) {
      desired = createVector(this.max_speed, this.vel.y);
    } else if (this.pos.x > width - d) {
      desired = createVector(-this.max_speed, this.vel.y);
    }

    if (this.pos.y < d) {
      desired = createVector(this.vel.x, this.max_speed);
    } else if (this.pos.y > height - d) {
      desired = createVector(this.vel.x, -this.max_speed);
    }

    if (desired) {
      desired.normalize();
      desired.mult(this.max_speed);
      const steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.max_force);
      this.applyForce(steer);
    }
  }
}