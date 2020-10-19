class Species {
  constructor(id, rate, lifespan) {
    this.id = id;
    this.init_mutation_rate = rate;
    this.lifespan = lifespan;
    this.rockets = [];
    this.gen_fastest_time = Infinity;
    this.fastest_time = Infinity;
    this.finished = false;
    this.mutation_rate = this.init_mutation_rate;
    this.mutation_change = 0.97;
    this.perfect_score = 1;
    this.fitness_sum = 0;
    this.avg_fitness;
    this.max_fitness = 0;
    this.species_arrived = false;
    switch(id) {
      case 0:
        this.color = color(246, 193, 1, 255);
        this.name = " - Yellow";
        break;
      case 1:
        this.color = color(1, 193, 246, 255);
        this.name = " - Blue";
        break;
      case 2: 
        this.color = color(50, 205, 50, 255);
        this.name = " - Green";
        break;
    }
  }

  get count() {
    return this.rockets.length;
  }

  addRockets(count) {
    for (let i = 0; i < count; i++) {
      this.rockets.push(new Rocket({lifespan: this.lifespan, species: this.id, color: this.color}));
    }
  }

  // Update goes before Evolution logic
  update(cycle) {
    let rockets_finished = 0;
    for (let i = 0; i < this.rockets.length; i++) {
      const cycle_arrived = this.rockets[i].update(cycle);
      if (cycle_arrived) {
        this.species_arrived = true;
        const time = this.lifespan - cycle_arrived;
        if (time < this.gen_fastest_time) this.gen_fastest_time = time;
        if (time < this.fastest_time) this.fastest_time = time;
      }
      this.rockets[i].show();
      if (this.rockets[i].crashed || this.rockets[i].arrived || this.rockets[i].fled) rockets_finished++;
    }
    return rockets_finished;
  }

  // Evolution functions
  calculate_fitness(destination) {
    this.fitness_sum = 0;

    // Calculate fitness for all rockets in this species
    for (let i = 0; i < this.rockets.length; i++) {
      const fitness = this.rockets[i].calculate_fitness(destination);
      if (fitness > this.max_fitness)  {
        this.max_fitness = fitness;
      }
      this.fitness_sum += fitness;
    }
    // If arrived then reduce mutation rate
    if (this.species_arrived) {
      this.mutation_rate *= this.mutation_change;
    } else {
      this.mutation_rate = this.init_mutation_rate;
    }
    // Get the average for the species
    this.avg_fitness = this.fitness_sum / this.rockets.length;
    return this.avg_fitness;
  }

  // Generate list of offspring
  generate(num_in_next_gen) {
      const next_generation = [];
      for (let i = 0; i < num_in_next_gen; i++) {
        const parent_a = this.pickOne(this.rockets);
        const parent_b = this.pickOne(this.rockets);
        const child = parent_a.dna.breedWith(parent_b.dna, Rocket, { lifespan: this.lifespan, species: this.id, color: this.color });
        child.dna.mutate(this.mutation_rate);
        next_generation[i] = child;
      }
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