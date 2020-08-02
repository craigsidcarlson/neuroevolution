class DNA {
 constructor(target_length, child = false) {
  this.target_length = target_length;
  this.slice_point = ceil(random(0, this.target_length));
  this.genes = [];
  this.fitness = 0;
  this.accept_probability = 0.01;
  this.possible_characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789\'.!?,:;/@\\ ';
  if (!child) {
    for ( var i = 0; i < target_length; i++ ) {
      const char = this.generateRandomChar();
      this.genes.push(char);
    }
  }
 }

 generateRandomChar() {
    return this.possible_characters.charAt(floor(random(0, this.possible_characters.length)));
 }

 calculate_fitness(target) {
   let score = 0;
   for (let i = 0; i < this.genes.length; i++) {
     const this_ascii = this.genes[i].charCodeAt(0);
     const target_ascii = target.charCodeAt(i);
    if(this_ascii === target_ascii) score++;
   }
   this.fitness = score / target.length;
   this.fitness = pow(this.fitness, 5);
   return this.fitness;
 }

 breedWith(parent_b) {
  const child = new DNA(this.target_length, true);
  for (let i = 0; i < this.target_length; i++) {
    if (i < this.slice_point) child.genes[i] = this.genes[i];
    else child.genes[i] = parent_b.genes[i];
  }
  return child;
 }

 mutate(mutation_rate) {
  for (let i = 0; i < this.genes.length; i++) {
    const random_num = random(0,1);
    if (random_num < mutation_rate) {
      this.genes[i] = this.generateRandomChar();
    }
  }
 }
}