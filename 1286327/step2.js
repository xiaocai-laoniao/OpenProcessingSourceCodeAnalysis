let box;

function setup() {
  createCanvas(800, 800);
  
  // box = new SizeBox(50, 50, 700, 700);
  box = new DepthBox(50, 50, 700, 700, 0);
}


function draw() {
  background(255);
  box.display();
}

function keyPressed() {
  if (key == 's' || key == 'S') {
    save("box.png");
  }
}

class DepthBox {
  constructor(x, y, w, h, depth) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.depth = depth

    this.isSplitH = random() > 0.5;
    this.children = [];
    this.ratio = random(0.15, 0.75)
    if (depth < 6) {
      if (this.depth % 2 == 0) {
        this.children[0] = new DepthBox(x, y, w * this.ratio, h, depth + 1);
        this.children[1] = new DepthBox(x + w * this.ratio, y, w * (1 - this.ratio), h, depth + 1);
      } else {
        this.children[0] = new DepthBox(x, y, w, h * this.ratio, depth + 1);
        this.children[1] = new DepthBox(x, y + h * this.ratio, w, h * (1 - this.ratio), depth + 1);
      }
    } 
  }


  display() {
    fill(0, 255, 0);
    noFill();
    strokeWeight(4);
    stroke(0);

    if (this.children.length == 0) {
      rect(this.x, this.y, this.w, this.h);
    } else {
      for (let c of this.children) {
        c.display();
      }
    }
  }
}

class SizeBox {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y
    this.w = w;
    this.h = h;

    this.isSplitH = random() > 0.5;
    this.children = [];
    this.ratio = random(0.15, 0.75)
    if (w > 20 && h > 20) {
      if (this.isSplitH) {
        this.children[0] = new SizeBox(x, y, w * this.ratio, h);
        this.children[1] = new SizeBox(x + w * this.ratio, y, w * (1 - this.ratio), h);
      } else {
        this.children[0] = new SizeBox(x, y, w, h * this.ratio);
        this.children[1] = new SizeBox(x, y + h * this.ratio, w, h * (1 - this.ratio));
      }
    }
  }

  display() {
    fill(0, 255, 0);
    noFill();
    strokeWeight(4);
    stroke(0);

    if (this.children.length == 0) {
      rect(this.x, this.y, this.w, this.h);
    } else {
      for (let c of this.children) {
        c.display();
      }
    }
  }
}

