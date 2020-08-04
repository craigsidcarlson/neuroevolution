class Environment {
  constructor() {
    this.population_size = 100;
    this.population = new Population(this.population_size);
    this.food = [];
    this.poison = [];
    this.num_food = 40;
    this.num_poison = 20;

    // Populate food
    for (let i = 0; i < this.num_food; i++) {
      const x = random(width);
      const y = random(height);
      this.food.push(createVector(x, y));
    }
    // Populate Poison
    for (let i = 0; i < this.num_poison; i++) {
      const x = random(width);
      const y = random(height);
      this.poison.push(createVector(x, y));
    }
  }

  addNewCreature(x, y) {
    this.population.creatures.push(new Creature(x, y));
  }

  addFood() {
    if (random(1) < 0.015) {
      var x = random(width);
      var y = random(height);
      this.food.push(createVector(x, y));
    }
  }
  addPoison() {
    if (random(1) < 0.01) {
      var x = random(width);
      var y = random(height);
      this.poison.push(createVector(x, y));
    }
  }

  showFood() {
    for (let i = 0; i < this.food.length; i++) {
      fill(0, 255, 0);
      noStroke();
      ellipse(this.food[i].x, this.food[i].y, 4, 4);
    }
  }

  showPoison() {
    for (let i = 0; i < this.poison.length; i++) {
      fill(255, 0, 0);
      noStroke();
      ellipse(this.poison[i].x, this.poison[i].y, 4, 4);
    }
  }

  showPopulation() {
    this.population.show(this.food, this.poison);
  }
}