// 物体的运动

let beginX = 50;
let targetX = 600;

let speedX = 10;

let ballK = 0.4;
let ballMass = 8;
let ballDamp = 0.9;
let ballVel = 0;

let currentXArray = [beginX, beginX, beginX]
function setup() {
  createCanvas(800, 800);
  textAlign(LEFT, CENTER);
}

function draw() {
  background(255);

  let y = height / 2 - 50;
  for (let i = 0; i < 3; i++) {
    fill(255, 0, 0);
    text(currentXArray[i], lerp(beginX, targetX, 0.5), y + 100 * i - 30);
    text(beginX, beginX, y + 100 * i  - 30);
    circle(currentXArray[i], y + 100 * i, 20);
    text(targetX, targetX, y + 100 * i - 30);
    circle(targetX, y + 100 * i, 20);
    line(beginX, y + 100 * i, targetX, y + 100 * i);

    fill(0);
    circle(currentXArray[i], y + 100 * i, 30);

    update(i);
  }
}

function update(i) {
  if (i == 0) {
    if (currentXArray[i] < targetX) {
      currentXArray[i] += speedX;
    }
  } else if (i == 1) {
    currentXArray[i] += (targetX - currentXArray[i]) * 0.01; 
  } else {

    let f = ballK * (targetX - currentXArray[i]);
    let accel = f / ballMass;
    ballVel = ballDamp * (ballVel + accel);
    currentXArray[i] += ballVel;
  }
}