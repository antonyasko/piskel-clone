function downloadGif(arrFrames, stateFrame) {
  // eslint-disable-next-line no-undef
  const encoder = new GIFEncoder();
  const params = {
    frames: arrFrames,
    filename: 'download',
    repeat: 0,
    delay: 1000 / stateFrame.fps,
    dispose: 0,
    transparent: null,
  };
  encoder.setRepeat(params.repeat);
  encoder.setDelay(params.delay);
  encoder.setDispose(params.dispose);
  encoder.setTransparent(params.transparent);
  encoder.start();
  params.frames.forEach((frame) => {
    encoder.addFrame(frame.getContext('2d'));
  });
  encoder.finish();
  encoder.download(params.filename);
}

module.exports = downloadGif;
