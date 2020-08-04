class Population {
  constructor(size) {
    this.generation = 0;
    this.size = size;
    this.fitness_sum = 0;
    this.max_fitness = 0;
    this.creatures = [];
    for (let i = 0; i < this.size; i++) {
      const x = random(width);
      const y = random(height);
      this.creatures[i] = new Creature(x, y);
    }

  }

  show(food, poison) {
    for (let i = 0; i < this.creatures.length; i++) {

      this.creatures[i].boundaries();
      this.creatures[i].behaviors(food, poison);
      this.creatures[i].update();
      this.creatures[i].show();

      const new_creature = this.creatures[i].clone();
      if (new_creature != null) {
        this.creatures.push(new_creature);
      }

      if (this.creatures[i].dead()) {
        const x = this.creatures[i].pos.x;
        const y = this.creatures[i].pos.y;
        food.push(createVector(x,y));
        this.creatures.splice(i, 1);
      }      
    }
  }

  evolve() {
    this.calculate_fitness();
    this.generate();
    this.generation++;
  }

  // Calculate Fitness
  calculate_fitness() {
    for (let i = 0; i < this.creatures.length; i++) {
      const fitness = this.creatures[i].calculate_fitness(destination);
      if (fitness > this.max_fitness) this.max_fitness = fitness;
      this.fitness_sum += fitness;
    }
  }

  // Create next generation
  generate() {
    const next_generation = [];
    for (let i = 0; i < this.creatures.length; i++) {
      const parent_a = this.pickOne(this.creatures);
      const parent_b = this.pickOne(this.creatures);
      const child = parent_a.dna.breedWith(parent_b.dna, Creature);
      child.dna.mutate(this.mutation_rate);
      next_generation[i] = child;
    }
    this.generation++;
    this.creatures = next_generation;
  }

  // Natural selection based on a weighted random based on fitness
  pickOne(list) {
    let index = 0;
    let r = random(0, this.fitness_sum);
    while (r > 0) {
      r -= list[index].dna.fitness;
      index++;
    }

    return list[index-1];
  }
}