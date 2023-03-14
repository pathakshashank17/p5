class Block {
  constructor(x, w, m, v) {
    this.x = x;
    this.w = w;
    this.m = m;
    this.v = v;
  }
  
  show() {
    rectMode(CENTER);
    fill(100);
    rect(this.x + this.w/2, height - this.w/2, this.w, this.w);
  }
  
  update() {
    this.x += this.v;
  }
  
  collide(otherBlock) {
    let m1 = this.m;
    let u1 = this.v;
    let m2 = otherBlock.m;
    let u2 = otherBlock.v;
    let massSum = m1 + m2;
    return (m1 - m2)/massSum * u1 + 2 * m2/massSum * u2;
  }
  
  doesCollideWith(otherBlock) {
    let x1 = this.x;
    let w1 = this.w;
    let x2 = otherBlock.x;
    let w2 = otherBlock.w;
    return !(x1 + w1 < x2 || x1 > x2 + w2);
  }
  
  hitWall() {
    return this.x < 0;
  }
  
  reverse() {
    this.v *= -1;
  }
}