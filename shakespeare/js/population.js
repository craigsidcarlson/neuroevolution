class Population {
  constructor(target, rate = 0.01, num_ind = 200) {

    this.generation = 0;
    this.finished = false;
    this.target = target;
    this.mutation_rate = rate;
    this.perfect_score = 1;
    this.num_individuals = num_ind;
    this.best = '';
    this.fitness_sum = 0;
    this.max_fitness = 0;
    this.individuals = [];
    for (let i = 0; i < this.num_individuals; i++) {
      this.individuals[i] = new DNA(this.target.length);
    }
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
    this.fitness_sum = 0;
    for (let i = 0; i < this.individuals.length; i++) {
      const fitness = this.individuals[i].calculate_fitness(this.target);
      this.fitness_sum += fitness;
    }
  }
  // Generate mating pool
  natural_selection() {
    this.max_fitness = 0;
    for (let i = 0; i < this.individuals.length; i++) {
      if (this.individuals[i].fitness > this.max_fitness) {
        this.max_fitness = this.individuals[i].fitness;
        this.best = this.individuals[i].genes.join('');
        if (this.best === this.target) this.finished = true;
      }
    }

  }
  // Create next generation
  generate() {
    const next_generation = [];
    for (let i = 0; i < this.individuals.length; i++) {
      const parent_a = this.pickOne(this.individuals);
      const parent_b = this.pickOne(this.individuals);
      const child = parent_a.breedWith(parent_b);
      child.mutate(this.mutation_rate);
      next_generation[i] = child;
    }
    this.generation++;
    this.individuals = next_generation;
  }

  pickOne(list) {
    let index = 0;
    let r = random(0, this.fitness_sum);
    while (r > 0) {
      r -= list[index].fitness;
      index++;
    }

    return list[index-1];
  }
}