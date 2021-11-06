class Particle {
  PVector location; // 粒子的位置
  PVector velocity; // 粒子的速度
  float scale; // 粒子半径的缩放系数
  int radius; // 粒子的直径大小，作者用 radius 含义为 半径，并不太准确
  int border; // 粒子背景圆的边框大小
  int incBorder; // 粒子的边框变化幅度值
  int type; // 粒子的类型，目前分为0、1两种

  Particle(float x, float y) {
    location  = new PVector(x, y);
    velocity  = new PVector(random(1), random(1));
    scale     = random(.35, .9);
    radius    = int(scale * 40);
    border    = MIN_BORDER + 1;		
    incBorder = 1;
    type      = int(random(2));
    // type = 0;
  }

  // 速度和位置的更新
  void update() {
    location.add(velocity);
    // 抖动效果的终极秘诀：始终让粒子本身在文字黑色像素抖动
    // 按照目前的速度，下一个帧循环中，当前像素的左右像素是非黑色（非文字像素）时，则将x轴速度乘以-1进行反向
    int nextLocX1 = int(location.y) * width + int(location.x + velocity.x);
    int nextLocX2 = int(location.y) * width + int(location.x - velocity.x);
    if ((list[nextLocX1] == 1)   ||   (list[nextLocX2] == 1)) {
      velocity.x *= -1;
    }
    // 按照目前的速度，下一个帧循环中，当前像素的上下像素是非黑色（非文字像素）时，则将y轴速度乘以-1进行反向
    int nextLocY1 = int(location.y + velocity.y) * width + int(location.x);
    int nextLocY2 = int(location.y - velocity.y) * width + int(location.x);
    if ((list[nextLocY1] == 1) || (list[nextLocY2] == 1)) {
      velocity.y *= -1;
    }
  }

  // 绘制背景边框圆
  // type 0：背景边框圆大小固定
  // type 1：背景边框圆直径来回增加/缩小
  void display() {
    if (type == 0) {
      ellipse(location.x, location.y, radius, radius);
    } else {
      updateBorder();
      ellipse(location.x, location.y, radius + border, radius + border);
    }
  }

  // 绘制前景圆
  // type 0: 前景圆直径来回缩小/增加
  // type 1: 前景圆大小固定
  void display2() {
    if (type == 0) {
      updateBorder();
      ellipse(location.x, location.y, radius - border, radius - border);
    } else {
      ellipse(location.x, location.y, radius, radius);
    }
  }

  void updateBorder() {
    // 如果边框小于最小值或者大于最大值，则将边框增量幅度 * -1， 用于将增量变为减量，或者减量变为增量
    if (border < MIN_BORDER || border > MAX_BORDER) {
      incBorder *= -1;
    }
    // 始终用 border = border + incBorder 来修改 border
    // border 的大小变会在 MIN_BORDER 和 MAX_BORDER 之间来回变换
    border += incBorder;
  }
}
