var particles = [];

function setup() {
  createCanvas(600, 300);
  background(100);
  for (var i = 0; i < width; i++) {
    particles.push([]);
    for (var j = 0; j < height; j++) {
      particles[particles.length - 1].push(0);
    }
  }
  //frameRate(1);
}

function draw() {
  if (mouseIsPressed) {
    for (var i = 0; i < 3; i++) {
      particles[clamp(round(mouseX + random(-4, 4)), 0, width - 1)][
        clamp(round(mouseY + random(-4, 4)), 0, height - 1)
      ] = 1;
    }
  }
  simulateParticles();
  if (frameCount % 2 == 0) {
    renderParticles();
  }
  print(frameRate());
}

function simulateParticles() {
  for (var i = 0; i < width; i++) {
    for (var j = height; j > -1; j--) {
      if (particles[i][j] == 1) {
        if (particles[i][j + 1] == 0) {
          particles[i][j + 1] = 1;
          particles[i][j] = 0;
        } else if (i > 0 && particles[i - 1][j + 1] == 0) {
          if (particles[i - 1][j + 1] == 0) {
            particles[i - 1][j + 1] = 1;
            particles[i][j] = 0;
          }
        } else if (i < width - 1 && particles[i + 1][j + 1] == 0) {
          if (particles[i + 1][j + 1] == 0) {
            particles[i + 1][j + 1] = 1;
            particles[i][j] = 0;
          }
        } else {
          particles[i][j] = 2;
        }
      }
    }
  }
}

function renderParticles() {
  background(100);
  for (var i = 0; i < width; i++) {
    for (var j = 0; j < height; j++) {
      if (particles[i][j] == 1) {
        stroke(255, 200, 150);
        point(i, j);
      } else if (particles[i][j] == 2) {
        stroke(196, 146, 99);
        point(i, j);
      }
    }
  }
}

function clamp(x, left, right) {
  if (x < left) {
    return left;
  } else if (x > right) {
    return right;
  } else {
    return x;
  }
}
