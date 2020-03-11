const UPNG = require('upng-js');

const download = require('downloadjs');

function downloadAPNG(arrFrames, stateFrame) {
  const frames = document.getElementsByClassName('frame');
  const framesData = [];
  Array.from(frames).forEach((frame) => {
    const frameCTX = frame.getContext('2d');
    const arrayBuffer = frameCTX.getImageData(0, 0, 128, 128).data.buffer;
    framesData.push(arrayBuffer);
  });
  const delays = new Array(frames.length).fill(1000 / stateFrame.fps);
  const result = UPNG.encode(framesData, 128, 128, 0, delays);
  download(result, 'animation.apng', 'apng');
}

module.exports = downloadAPNG;
