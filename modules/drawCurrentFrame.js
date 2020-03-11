function drawCurrentFrame(frame) {
  const ctx = document.getElementById('canvas').getContext('2d');
  const canvasImage = new Image();
  canvasImage.onload = () => {
    ctx.scale(4, 4);
    ctx.drawImage(canvasImage, 0, 0);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  };
  canvasImage.src = frame.toDataURL('image/png');
  canvasImage.crossOrigin = 'Anonymous';
}

module.exports = drawCurrentFrame;
