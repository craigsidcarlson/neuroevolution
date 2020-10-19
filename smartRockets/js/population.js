class Population {
  constructor(rate = 0.005, num_individuals = 200) {
    this.lifespan = floor(width);
    this.generation = 0;
    this.max_rockets = num_individuals;
    this.min_per_species = 33;
    this.species_count = 3;
    this.max_per_species = this.max_rockets - ((this.species_count - 1) * this.min_per_species);
    this.best_time = Infinity;
    this.best_name = "";
    this.gen_best_time = Infinity;
    this.first_arrived_color;
    this.species = [];
    for ( let i  = 0; i< this.species_count; i++) {
      this.species.push(new Species(i, rate, this.lifespan));
    }
    this.num_rockets = 0;
    const rockets_per_species = floor(num_individuals/this.species_count);
    for (let i = 0; i < this.species.length; i++) {
      this.species[i].addRockets(rockets_per_species);
      this.num_rockets += rockets_per_species;
    }

    this.cycle = this.lifespan;
  }

  update() {
    let rockets_finished = 0;
    if (this.cycle > this.lifespan) return;
    for (let i = 0; i < this.species.length; i++) {
      rockets_finished += this.species[i].update(this.cycle);
      if (this.species[i].species_arrived && !this.first_arrived_color) {
        this.first_arrived_color = this.species[i].color;
        if (this.species[i].gen_fastest_time < this.gen_best_time)  { 
          this.gen_best_time = this.species[i].gen_fastest_time;
        }
        if (this.species[i].gen_fastest_time < this.best_time) {
          this.best_time = this.species[i].gen_fastest_time;
          this.best_name = this.species[i].name;
        }
      }
    }
    if (rockets_finished === this.num_rockets) return;
    this.cycle--;
    return this.cycle;
  }

  // Calculate Fitness
  evolve(destination) {
    this.cycle = this.lifespan;
    this.num_rockets = 0;
    let fitness_sum = 0;
    for (let i = 0; i < this.species.length; i++) {
      const avg_species_performance = this.species[i].calculate_fitness(destination, this.cycle);
      fitness_sum += avg_species_performance;
    }
    for (let i = 0; i < this.species.length; i++) {
      let num_in_next_gen = ceil((this.species[i].avg_fitness / fitness_sum) * this.max_rockets);
      if (num_in_next_gen < this.min_per_species) num_in_next_gen = this.min_per_species;
      if (num_in_next_gen > this.max_per_species) num_in_next_gen = this.max_per_species;
      this.num_rockets += num_in_next_gen;
      this.species[i].generate(num_in_next_gen);
      this.species[i].species_arrived = false;
      this.species[i].gen_fastest_time = Infinity;
    }
    if (this.gen_best_time === Infinity) {
      this.best_time = Infinity;
      this.best_name = undefined;
    }
    this.gen_best_time = Infinity;
    this.first_arrived_color = undefined;
    this.generation++;
  }
}