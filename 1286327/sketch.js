const URL = "https://coolors.co/bbdef0-00a6a6-efca08-f49f0a";
const COLS = createCols(URL);
let t, noiseGra;

function setup() {
  createCanvas(windowHeight, windowHeight);
  background(100);
  t = new SpringBox(0, 0, width, height, 0);

  // 设置纹理
  noiseGra = createGraphics(width, height);

  noiseGra.loadPixels();
  for (let x = 0; x <= width; x++) {
    for (let y = 0; y <= height; y++) {
      noiseGra.set(
        x,
        y,
        color(255, noise(x / 10, y / 10, (x * y) / 50) * random([0, 40, 80]))
      );
    }
  }
  noiseGra.updatePixels();
}

function draw() {
  background(100);

  // 弹性方块更新
  t.update();
  // 弹性方块绘制
  t.draw();

  // 显示噪波纹理
  image(noiseGra, 0, 0); 
}

const MAX_DIV = 6;

class SpringBox {
  constructor(x, y, w, h, dc) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.targetDivRatio = 0.5;
    this.divRatio = 0.5;
    this.divCount = dc;
    this.children = [];
    // 变动时间间隔，让方块有静止的时间，而不是一直在动
    // this.moveTimeSpan = int(random(100, 250));
    this.moveTimeSpan = int(random(10, 20));
    this.col = random(COLS);
    this.charactor = int(random(0, 9)).toString();
    // this.charactor = dc.toString();

    //springparam
    this.spMass = (w * h) / 10000;
    this.spK = 0.5;
    // this.spDamp = 0.9;
    this.spDamp = 0.2;
    this.spVel = 0;

    if (dc < MAX_DIV) {
      if (dc % 2 == 0) {
        this.children[0] = new SpringBox(x, y, w * this.divRatio, h, dc + 1);
        this.children[1] = new SpringBox(x + w * this.divRatio, y, w * (1 - this.divRatio), h, dc + 1);
      } else {
        this.children[0] = new SpringBox(x, y, w, h * this.divRatio, dc + 1);
        this.children[1] = new SpringBox(x, y + h * this.divRatio, w, h * (1 - this.divRatio), dc + 1);
      }
    }
  }

  // 更新各种属性
  update() {
    this.updateDiv();
    this.updateTL(this.x, this.y, this.w, this.h);
  }

  updateDiv() {
    // 鼠标按下的时候，将目标比例恢复成 0.5
    if (mouseIsPressed) {
      this.targetDivRatio = 0.5;
    } 
    // 按照初始化时随机的方块变动时间间隔这样的频率，进行随机一个目标比例
    else if (frameCount % this.moveTimeSpan == 0) {
      this.targetDivRatio = random(0.15, 0.85);
    }

    // 弹性
    let f = this.spK * (this.targetDivRatio - this.divRatio);
    let accel = f / this.spMass;
    this.spVel = this.spDamp * (this.spVel + accel);
    this.divRatio += this.spVel;
    
    // 一般的缓动减速
    // this.divRatio += (this.targetDivRatio - this.divRatio) * 0.02;

    for (const c of this.children) c.updateDiv();
  }

  // 实际画面绘制部分
  draw() {
    if (this.children.length == 0) {
      let sw = 10;
      noStroke();
      fill(0);
      rect(this.x, this.y, this.w, this.h);
      fill(this.col);
      rect(
        this.x + sw / 2,
        this.y + sw / 2,
        this.w - sw,
        this.h - sw,
        // abs(this.divRatio * 50)
        0
      );

      push();
      translate(this.x + this.w / 2, this.y + this.h / 2);
      fill(0);
      textSize(40);
      scale((this.w - sw) / 24, (this.h - sw) / 40);
      textAlign(CENTER, CENTER);
      text(this.charactor, 0, 0);
      pop();
    } else {
      for (const c of this.children) c.draw();
    }
  }

  updateTL(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    if (this.children.length > 0) {
      if (this.divCount % 2 == 0) {
        this.children[0].updateTL(x, y, w * this.divRatio, h);
        this.children[1].updateTL(
          x + w * this.divRatio,
          y,
          w * (1 - this.divRatio),
          h
        );
      } else {
        this.children[0].updateTL(x, y, w, h * this.divRatio);
        this.children[1].updateTL(
          x,
          y + h * this.divRatio,
          w,
          h * (1 - this.divRatio)
        );
      }
    }
  }
}

// 从url中创建颜色数组
function createCols(url) {
  let slaIndex = url.lastIndexOf("/");
  let colStr = url.slice(slaIndex + 1);
  let cols = colStr.split("-");
  return cols.map(c => "#" + c);
}
