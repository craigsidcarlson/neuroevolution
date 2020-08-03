class DNA {
  constructor(lifespan) {
    this.lifespan = lifespan;
    this.slice_point = ceil(random(0, this.lifespan));
    this.genes = [];
    this.fitness = 0;
    this.accept_probability = 0.01;
    this.mutation_mag = 0.1;
    for (let i = 0; i < this.lifespan; i++) {
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(0.1);
    }
 }
 
 breedWith(parent_b, _className) {
  const child = new _className(this.lifespan);
  for (let i = 0; i < this.genes.length; i++) {
    if (i < this.slice_point) child.dna.genes[i] = this.genes[i];
    else child.dna.genes[i] = parent_b.genes[i];
  }
  return child;
 }

 mutate(mutation_rate) {
  for (let i = 0; i < this.genes.length; i++) {
    const random_num = random(0,1);
    if (random_num < mutation_rate) {
      const randomVector = p5.Vector.random2D();
      randomVector.setMag(this.mutation_mag);
      this.genes[i] = randomVector;
    }
  }
 }
}