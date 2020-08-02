class Population {
  constructor(target, rate = 0.01, num_ind = 200) {

    this.generation = 0;
    this.finished = false;
    this.target = target;
    this.mutation_rate = rate;
    this.perfect_score = 1;
    this.num_individuals = num_ind;
    this.best = '';

    this.individuals = [];
    for (let i = 0; i < this.num_individuals; i++) {
      this.individuals[i] = new DNA(this.target.length);
    }

    this.mating_pool = [];
  }

  evolve() {
    if (!this.finished) {
      this.calculate_fitness();
      this.natural_selection();
      this.generate();
    }
    // this.evaluate();
  }

  // Calculate Fitness
  calculate_fitness() {
    for (let i = 0; i < this.individuals.length; i++) {
      this.individuals[i].calculate_fitness(this.target);
    }
  }
  // Generate mating pool
  natural_selection() {
    this.mating_pool = [];
    let max_fitness = 0;
    for (let i = 0; i < this.individuals.length; i++) {
      if (this.individuals[i].fitness > max_fitness) {
        max_fitness = this.individuals[i].fitness;
        this.best = this.individuals[i].genes.join('');
        if (this.best === this.target) this.finished = true;
      }
    }

    for (let i = 0; i < this.individuals.length; i++) {
      // Normalize the individuals fitness and inject a proportional number of the individuals into the mating pool
      const fitness = map(this.individuals[i].fitness, 0, max_fitness, 0, 1);
      const n = floor(fitness * 100);
      for (let j = 0; j < n; j++) {
        this.mating_pool.push(this.individuals[i])
      }
    }

  }
  // Create next generation
  generate() {
    for (let i = 0; i < this.individuals.length; i++) {
      const a = floor(random(0, this.mating_pool.length));
      const b = floor(random(0, this.mating_pool.length));
      const parent_a = this.mating_pool[a];
      const parent_b = this.mating_pool[b];
      const child = parent_a.breedWith(parent_b);
      child.mutate(this.mutation_rate);
      this.individuals[i] = child;
    }
    this.generation++;
  }
}