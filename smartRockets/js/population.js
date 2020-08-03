class Population {
  constructor(rate = 0.01, num_ind = 200) {
    this.lifespan = 600;
    this.generation = 0;
    this.finished = false;
    this.mutation_rate = rate;
    this.perfect_score = 1;
    this.num_individuals = num_ind;
    this.best = '';
    this.fitness_sum = 0;
    this.max_fitness = 0;
    this.rockets = [];
    for (let i = 0; i < this.num_individuals; i++) {
      this.rockets[i] = new Rocket(this.lifespan);
    }
    this.cycle = this.lifespan;
    this.fastest_time = Infinity;
  }

  show() {
    let rockets_finished = 0;
    if (this.cycle > this.lifespan) return;
    for (let i = 0; i < this.rockets.length; i++) {
      const cycle_arrived = this.rockets[i].update(this.cycle);
      if (cycle_arrived) {
        const time = this.lifespan - cycle_arrived;
        if (time < this.fastest_time) this.fastest_time = time;
      }
      this.rockets[i].show();
      if (this.rockets[i].crashed || this.rockets[i].arrived) rockets_finished++;
    }
    if (rockets_finished === this.rockets.length) return;
    this.cycle--;
    return this.cycle;
  }

  evolve(destination) {
    this.cycle = this.lifespan;
    this.calculate_fitness(destination, this.cycle);
    this.generate();
    this.generation++;
  }

  // Calculate Fitness
  calculate_fitness(destination) {
    this.fitness_sum = 0;
    for (let i = 0; i < this.rockets.length; i++) {
      const fitness = this.rockets[i].calculate_fitness(destination);
      this.fitness_sum += fitness;
    }
  }

  // Create next generation
  generate() {
    const next_generation = [];
    for (let i = 0; i < this.rockets.length; i++) {
      const parent_a = this.pickOne(this.rockets);
      const parent_b = this.pickOne(this.rockets);
      const child = parent_a.dna.breedWith(parent_b.dna, Rocket);
      child.dna.mutate(this.mutation_rate);
      next_generation[i] = child;
    }
    this.generation++;
    this.rockets = next_generation;
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