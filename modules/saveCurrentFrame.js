const saveCurrentFrame = (arr, state) => {
  const canvas = document.getElementById('canvas');
  const frameSize = 128;
  const currentFrameId = state.active;
  const frameNumber = currentFrameId.slice(6);
  const arrFrames = arr;

  const currentFrame = document.getElementById(`${currentFrameId}`);
  const currentFrameContext = currentFrame.getContext('2d');
  const canvasImage = new Image();
  canvasImage.onload = () => {
    currentFrameContext.clearRect(0, 0, frameSize, frameSize);
    currentFrameContext.scale(0.25, 0.25);
    currentFrameContext.drawImage(canvasImage, 0, 0);
    currentFrameContext.setTransform(1, 0, 0, 1, 0, 0);
  };
  canvasImage.src = canvas.toDataURL('image/png');
  canvasImage.crossOrigin = 'Anonymous';
  arrFrames[frameNumber - 1] = currentFrame;
};

module.exports = saveCurrentFrame;
