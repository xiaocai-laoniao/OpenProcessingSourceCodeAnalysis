let ratio = 0.4;
function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(255);

  drawBox(50, 50, 700, 700);
  noLoop();
}

function drawBox(x, y, w, h) {
  // 1. 终止条件
  if (w < 50 || h < 50) {
    return;
  }

  // 2. 绘制部分
  noFill();
  strokeWeight(4);
  stroke(0);

  rect(x, y, w, h);

  // 3. 递归调用
  // 随机小于0.5 竖线分割，比例 ratio 可以调整
  if (random(1) < 0.5) {
    drawBox(x, y, w * ratio, h);
    drawBox(x + w * ratio, y, w * (1 - ratio), h);
  } else {
    // 横线分割，比例 ratio 可以调整
    drawBox(x, y, w, h * ratio);
    drawBox(x, y + h * ratio, w, h * (1 - ratio));
  }
}

function keyPressed() {
  if (key == "s" || key == "S") {
    save("box.png");
  }
}
