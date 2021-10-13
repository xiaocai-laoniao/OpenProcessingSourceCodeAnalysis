
function setup() {

  
}


function draw() {


}

class Box {
  constructor(x, y, w, h, depth) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.depth = depth;

    this.ratio = random(0.3, 0.8);
  }
}