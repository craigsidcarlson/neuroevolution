class DNA {
  constructor() {
    this.genes = [];
    this.fitness = 0;
    this.accept_probability = 0.01;
    this.init_mutation_rate = 0.01;
    this.mutation_rate = this.init_mutation_rate;
 }
 
 breedWith(parent_b, _className) {
  const slice_point = ceil(this.genes.length / 2);
  const child = new _className();
  for (let i = 0; i < this.genes.length; i++) {
    if (i < slice_point) child.dna.genes[i] = this.genes[i];
    else child.dna.genes[i] = parent_b.genes[i];
  }
  return child;
 }

 mutate() {
  for (let i = 0; i < this.genes.length; i++) {
    const random_num = random(0,1);
    if (random_num < this.mutation_rate) {
      if (i === 0 || i === 1) this.genes[i] += random(-0.1, 0.1);
      else this.genes[i] += random(-10, 10);
    }
  }
 }
}