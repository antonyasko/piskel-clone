const drawAnimation = require('./drawAnimation.js');

function startAnimation(arr, state, size) {
  const frameState = state;
  clearInterval(frameState.interval);
  frameState.interval = setInterval(() => {
    const frame = arr[(frameState.counter) % arr.length];
    drawAnimation(frame, size);
    frameState.counter += 1;
  }, 1000 / (frameState.fps));
}

module.exports = startAnimation;
