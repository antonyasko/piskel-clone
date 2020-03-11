const drawCurrentFrame = require('./drawCurrentFrame.js');
const startAnimation = require('./startAnimation.js');
const moveFrame = require('./moveFrame.js');

const frameSize = 128;
const animationSize = 256;

const duplicateFrame = (arr, state, clickFrame) => {
  const allFrames = arr;
  const frameState = state;

  const frameWrapper = document.createElement('li');
  frameWrapper.className = 'frame_wrapper';
  frameWrapper.style.border = '2px solid #ffa500';
  (clickFrame.parentNode).after(frameWrapper);

  const clickFramePosition = Number((clickFrame.id).slice(6)) - 1;

  const frame = document.createElement('canvas');
  frame.className = 'frame';
  const duplicateFramePosition = clickFramePosition + 1;
  frame.width = `${frameSize}`;
  frame.height = `${frameSize}`;
  frameWrapper.appendChild(frame);
  const frameContext = frame.getContext('2d');
  const frameImage = new Image();
  frameImage.onload = () => {
    frameContext.drawImage(frameImage, 0, 0);
  };
  frameImage.src = clickFrame.toDataURL('image/png');
  frameImage.crossOrigin = 'Anonymous';

  allFrames.splice(duplicateFramePosition, 0, frame);

  allFrames.forEach((item, index) => {
    const a = item;
    a.id = `frame_${index + 1}`;
  });

  frameState.active = frame.id;

  drawCurrentFrame(clickFrame);

  frame.addEventListener(('click'), () => {
    ((document.getElementById(`${frameState.active}`)).parentNode).style.border = '2px solid #808080';
    frameWrapper.style.border = '2px solid #ffa500';
    frameState.active = `${frame.id}`;
    drawCurrentFrame(frame);
  });

  const deleteFrame = document.createElement('button');
  deleteFrame.className = 'delete_frame';
  deleteFrame.style.backgroundImage = 'url(../assets/icons/delete_icon.svg)';
  deleteFrame.style.display = 'block';
  frameWrapper.appendChild(deleteFrame);
  deleteFrame.addEventListener(('click'), () => {
    if (allFrames.length > 1) {
      const activeFramePosition = Number((frameState.active).slice(6)) - 1;
      const framePosition = Number((frame.id).slice(6)) - 1;
      if (activeFramePosition === framePosition && framePosition === (allFrames.length - 1)) {
        frameState.active = `frame_${framePosition}`;
      } else if (activeFramePosition === framePosition && framePosition < (allFrames.length - 1)) {
        frameState.active = `frame_${framePosition + 1}`;
      } else if (framePosition < activeFramePosition) {
        frameState.active = `frame_${activeFramePosition}`;
      }
      frameWrapper.remove();
      allFrames.splice(framePosition, 1);
      allFrames.forEach((item, index) => {
        const a = item;
        a.id = `frame_${index + 1}`;
      });
      drawCurrentFrame(document.getElementById(`${frameState.active}`));
      ((document.getElementById(`${frameState.active}`)).parentNode).style.border = '2px solid #ffa500';
      frameState.counter = 0;
      startAnimation(allFrames, frameState, animationSize);
    } else {
      // eslint-disable-next-line no-alert
      alert('Can not remove last frame!');
    }
  });

  const duplicateFrameButton = document.createElement('button');
  duplicateFrameButton.className = 'duplicate_frame';
  duplicateFrameButton.style.backgroundImage = 'url(../assets/icons/duplicate_icon.svg)';
  duplicateFrameButton.style.display = 'block';
  frameWrapper.appendChild(duplicateFrameButton);
  duplicateFrameButton.addEventListener(('click'), () => {
    ((document.getElementById(`${frameState.active}`)).parentNode).style.border = '2px solid #808080';
    duplicateFrame(allFrames, frameState, frame);
    moveFrame(document.getElementById('frames'), allFrames);
    frameState.counter = 0;
    startAnimation(allFrames, frameState, animationSize);
  });
};

module.exports = duplicateFrame;
