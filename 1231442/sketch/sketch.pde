/** 微信公众号：小菜与老鸟，源码解析不迷路 */

/**
 final 关键字，表明这些变量数值不可后续修改，属于常量
 */

final int MAX = 600; // 最多600个粒子泡泡
final int MIN_BORDER = 10; // 粒子的最小边框值
final int MAX_BORDER = 15; // 粒子的最大边框值

final color BG_COLOR 		 = color(170, 220, 255); // 画布背景填充色
final color FG_COLOR     = color(0xFFFFFF); // 粒子的前景填充色
final color BORDER_COLOR = color(20, 20, 20); // 粒子的边框色

ArrayList<Particle> particles; // 粒子动态数组
int[] list; // list 这里的命名不得不说，有些草率，并不能很直观的表达啥意思，其实是存储所有像素的黑白信息的
int posX, posY; // 整个代码中并没有用到，属于多余字段
PVector axis; //
PFont font; // 画面中的字体
int count; // 粒子的实际个数
String typedText = "小菜与老鸟";
// String typedText = "2";
String inputText = ""; // 支持运行时进行输入文字，进行实时替换文字，输入后，回车Enter进行确认更换

void setup() {
  // 设置颜色模式为 RGB 模式，且每个通道最大值是255
  colorMode(RGB, 255, 255, 255);

  fullScreen(); // 全屏模式
  //size(1000, 800); // 也可以指定一个较大的尺寸，用来显示文字，文字的个数不需要太多，不然可能显示不完整
  background(BG_COLOR); // 设置背景色
  frameRate(30); // 设置帧率为30帧/秒
  noStroke(); // 无线条模式
  noCursor(); // 不显示鼠标

  // 原作者用了一个小菜电脑上没有的字体
  // 小菜打印了下本机上所有的字体，然后选择了一个黑体
  String[] fontList = PFont.list();
  printArray(fontList);

  font = createFont("STHeiti", 260); // 创建黑体字体
  textFont(font); // 设定字体
  fill(0); // 字体填充为黑色
  textAlign(CENTER, CENTER); // 设定字体的对齐模式，水平居中，垂直居中
  text(typedText, width/2, height/2 - 70); // 显示字体
  typedText = "";
  inputText = "";

  count = 0; // 粒子个数从 0 开始
  // 小菜：注意这里是 width * heigh，其实正确的应该用 pixelWidth * pixelHeight，因为默认像素密度 pixelDensity 为 1
  // 见公众号文章：https://mp.weixin.qq.com/s/tdwM-mK3kDTSyMHZzgghig
  list = new int[width*height];

  loadPixels(); // 加载像素数据
  for (int y = 0; y <= height - 1; y++) {
    for (int x = 0; x <= width - 1; x++) {
      color pb = pixels[y * width + x]; // 通过（y * width + x）得到坐标（x，y）在 pixels 数组中的索引位置，获取坐标（x，y）的像素的颜色

      // 颜色的归一化操作！！！
      // 画布背景色为 BG_COLOR，文字颜色是黑色，此时像素颜色的红色通道值小于5，只能是文字的黑色
      // 也就是通过 red(pb) < 5 来简单快速的判断出文字所在的像素，将这些像素在list数组中的位置的数值都标记成0-黑色
      if (red(pb) < 5) {
        list[y * width + x] = 0;
      } else {  // 背景色，都标记成1
        list[y * width + x] = 1;
      }
    }
  }
  updatePixels(); // 更新像素

  particles = new ArrayList<Particle>(); // 申请粒子动态数组
}

void draw() {
  if (count < MAX) { // 限定粒子数目不能超过最大数
    int i=0;
    // 随机3次，如果随机到的像素位置在list数组中标记为了0，也就是文字所在的像素，那么就在这个位置添加一个粒子
    while (i<3) {
      axis = new PVector(int(random(100, width - 100)), int(random(100, height - 100)));
      if (list[int(axis.y * width + axis.x)]==0) {
        particles.add(new Particle(axis.x, axis.y));
        i++;
        count++;
      }
    }
  }
  background(BG_COLOR); // 设定画布背景色，起到擦除重新绘制的作用
  // 第一次循环遍历，用来绘制粒子的底层边框色
  // display 用来绘制背景圆
  // update用来更新粒子的速度和位置
  for (int i = 0; i < particles.size(); i++) {
    Particle p = particles.get(i);
    fill(BORDER_COLOR);
    p.display();
    p.update();
  }
  // 第二次循环遍历，用来绘制粒子的前景色
  // display2 用来绘制前景圆
  // update用来更新粒子的速度和位置
  for (int j = 0; j < particles.size(); j++) {
    Particle p = particles.get(j);
    fill(FG_COLOR);
    p.display2();
    p.update();
  }
}

void keyReleased() {
  // 如果敲击了 enter 、return 键，则将输入的文字 inputText 赋给 typedText
  // 然后重新走了setup流程，新的文字就被绘制出来了
  if (key == ENTER || key == RETURN) {
    typedText = inputText;
    setup();
  } else {
    // 如果敲击的不是 enter、return 键，那么就将键盘敲击的键字符串，拼接起来
    // 如依次敲击了a、b，则 inputText 为 "ab"
    inputText = inputText + String.valueOf(key);
    print(inputText);
  }
}
