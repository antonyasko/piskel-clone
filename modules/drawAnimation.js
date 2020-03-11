function drawAnimation(frameImage, size) {
  const canvasAnimation = document.getElementById('id_animation_block');
  const ctxAnimation = canvasAnimation.getContext('2d');
  const canvasImage = new Image();
  canvasImage.onload = () => {
    ctxAnimation.clearRect(0, 0, size, size);
    ctxAnimation.scale(2, 2);
    ctxAnimation.drawImage(canvasImage, 0, 0);
    ctxAnimation.setTransform(1, 0, 0, 1, 0, 0);
  };
  canvasImage.src = frameImage.toDataURL('image/png');
  canvasImage.crossOrigin = 'Anonymous';
}

module.exports = drawAnimation;
