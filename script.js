import './style.css';

const addNewFrame = require('./modules/addNewFrame.js');
const saveCurrentFrame = require('./modules/saveCurrentFrame.js');
const drawCurrentFrame = require('./modules/drawCurrentFrame.js');
const duplicateFrame = require('./modules/duplicateFrame.js');
const startAnimation = require('./modules/startAnimation.js');
const moveFrame = require('./modules/moveFrame.js');
const downloadGif = require('./modules/downloadGif.js');
const downloadAPNG = require('./modules/downloadAPNG.js');
const changeHotKeys = require('./modules/changeHotKeys.js');

const canvasSize = 512;
const animationSize = 256;
let pixelSize = 4;

// const stateLocalStorage = localStorage.getItem('simplePiskelCloneKey');

const sizeFirst = document.querySelector('#first_size');
const sizeSecond = document.querySelector('#second_size');
const sizeThird = document.querySelector('#third_size');
const sizeFourth = document.querySelector('#fourth_size');
const sizeButtons = document.getElementsByClassName('sizeButton');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const animationBlock = document.getElementById('id_animation_block');
const arrFrames = [];

const stateFrame = {
  active: 'frame_1',
  counter: 0,
  fps: 1,
};

let activeSize = 1;

for (let i = 0; i < sizeButtons.length; i += 1) {
  sizeButtons[i].style.backgroundColor = (activeSize === (i + 1)) ? '#d3d3d3' : '#ffffff';
}

const landingPage = document.body.querySelector('#landing_page');
const startButton = document.body.querySelector('#start_piskel');
startButton.addEventListener(('click'), () => {
  landingPage.style.display = 'none';
  document.querySelector('.choose_color').style.display = 'flex';
  addNewFrame(arrFrames, stateFrame);
  saveCurrentFrame(arrFrames, stateFrame);
  startAnimation(arrFrames, stateFrame, animationSize);
  moveFrame(document.getElementById('frames'), arrFrames);
});

const fpsValue = document.getElementById('fps_value');

changeHotKeys();

const fpsSwitch = document.getElementById('fps_line');
fpsValue.textContent = fpsSwitch.value;
fpsSwitch.addEventListener('change', () => {
  fpsValue.textContent = fpsSwitch.value;
  stateFrame.fps = fpsSwitch.value;
  startAnimation(arrFrames, stateFrame, animationSize);
});

function changeButtonStyle() {
  for (let i = 0; i < sizeButtons.length; i += 1) {
    sizeButtons[i].style.backgroundColor = (activeSize === (sizeButtons[i].id).slice(3)) ? '#d3d3d3' : '#ffffff';
  }
}

sizeFirst.addEventListener('click', () => {
  activeSize = 1;
  pixelSize = 4;
  changeButtonStyle();
  sizeFirst.style.backgroundColor = '#d3d3d3';
});

sizeSecond.addEventListener('click', () => {
  activeSize = 2;
  pixelSize = 8;
  changeButtonStyle();
  sizeSecond.style.backgroundColor = '#d3d3d3';
});

sizeThird.addEventListener('click', () => {
  activeSize = 3;
  pixelSize = 12;
  changeButtonStyle();
  sizeThird.style.backgroundColor = '#d3d3d3';
});

sizeFourth.addEventListener('click', () => {
  activeSize = 4;
  pixelSize = 16;
  changeButtonStyle();
  sizeFourth.style.backgroundColor = '#d3d3d3';
});

let isDrawing = false;
let isChoosing = false;
let isErasing = false;
let isStraightening = false;

const pencilButton = document.querySelector('.pencil');
const fillBucketButton = document.querySelector('.fill_bucket');
const chooseColor = document.querySelector('.choose_color_wrapper');
const eraserButton = document.querySelector('.eraser');
const strokeButton = document.querySelector('.stroke');

let activeButton = 'pencil';

const currentColor = document.querySelector('.current_color_circle');
currentColor.style.backgroundColor = '#000000';

const prevColorCircle = document.querySelector('.prev_color_circle');
prevColorCircle.style.backgroundColor = '#ffffff';

function saveCanvas() {
  // const dataURL = canvas.toDataURL('image/png');
  // const currentCanvas = dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  // localStorage.setItem('simplePiskelCloneKey', currentCanvas);
  saveCurrentFrame(arrFrames, stateFrame);
}

// if (stateLocalStorage) {
//   const canvasImage = new Image();
//   canvasImage.onload = () => {
//     ctx.drawImage(canvasImage, 0, 0);
//   };
//   canvasImage.src = `data:image/png;base64,${stateLocalStorage}`;
//   canvasImage.crossOrigin = 'Anonymous';
// } else {
//   saveCanvas();
// }

const firstColor = document.querySelector('.first_color');
firstColor.addEventListener('click', () => {
  prevColorCircle.style.backgroundColor = currentColor.style.backgroundColor;
  currentColor.style.backgroundColor = '#ff0000';
  ctx.fillStyle = '#ff0000';
});
const secondColor = document.querySelector('.second_color');
secondColor.addEventListener('click', () => {
  prevColorCircle.style.backgroundColor = currentColor.style.backgroundColor;
  currentColor.style.backgroundColor = '#0000ff';
  ctx.fillStyle = '#0000ff';
});
const prevColor = document.querySelector('.prev_color');
prevColor.addEventListener('click', () => {
  ctx.fillStyle = prevColorCircle.style.backgroundColor;
  prevColorCircle.style.backgroundColor = currentColor.style.backgroundColor;
  currentColor.style.backgroundColor = ctx.fillStyle;
});

function pixel(x, y) {
  ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
}

let lastX;
let lastY;

function drawLine(firstX, firstY, secondX, secondY) {
  let startX; let startY; let endX; let endY;
  const deltaX = secondX - firstX;
  const deltaY = secondY - firstY;
  const posDeltaX = Math.abs(deltaX);
  const posDeltaY = Math.abs(deltaY);

  let intX = 2 * posDeltaY - posDeltaX;
  let intY = 2 * posDeltaX - posDeltaY;

  if (posDeltaY <= posDeltaX) {
    if (deltaX >= 0) {
      startX = firstX; startY = firstY; endX = secondX;
    } else {
      startX = secondX; startY = secondY; endX = firstX;
    }
    pixel(startX, startY);
    for (let i = 0; startX < endX; i += 1) {
      startX += 1;
      if (intX < 0) {
        intX += 2 * posDeltaY;
      } else {
        if ((deltaX < 0 && deltaY < 0) || (deltaX > 0 && deltaY > 0)) {
          startY += 1;
        } else {
          startY -= 1;
        }
        intX += 2 * (posDeltaY - posDeltaX);
      }
      pixel(startX, startY);
    }
  } else {
    if (deltaY >= 0) {
      startX = firstX; startY = firstY; endY = secondY;
    } else {
      startX = secondX; startY = secondY; endY = firstY;
    }
    pixel(startX, startY);
    for (let i = 0; startY < endY; i += 1) {
      startY += 1;
      if (intY <= 0) {
        intY += 2 * posDeltaX;
      } else {
        if ((deltaX < 0 && deltaY < 0) || (deltaX > 0 && deltaY > 0)) {
          startX += 1;
        } else {
          startX -= 1;
        }
        intY += 2 * (posDeltaX - posDeltaY);
      }
      pixel(startX, startY);
    }
  }
}

function drawPencil(event) {
  if (!isDrawing || activeButton !== 'pencil') return;
  const mouseX = Math.floor((event.pageX - event.target.offsetLeft) / pixelSize);
  const mouseY = Math.floor((event.pageY - event.target.offsetTop) / pixelSize);
  ctx.fillRect(mouseX * pixelSize, mouseY * pixelSize, pixelSize, pixelSize);
  if (Math.abs(mouseX - lastX) > 1 || Math.abs(mouseY - lastX) > 1) {
    drawLine(lastX, lastY, mouseX, mouseY);
  }
  [lastX, lastY] = [mouseX, mouseY];
}

function clearEraser(event) {
  if (!isErasing || activeButton !== 'eraser') return;
  const mouseX = Math.floor((event.pageX - event.target.offsetLeft) / pixelSize);
  const mouseY = Math.floor((event.pageY - event.target.offsetTop) / pixelSize);
  ctx.fillRect(mouseX * pixelSize, mouseY * pixelSize, pixelSize, pixelSize);
  if (Math.abs(mouseX - lastX) > 1 || Math.abs(mouseY - lastX) > 1) {
    drawLine(lastX, lastY, mouseX, mouseY);
  }
  [lastX, lastY] = [mouseX, mouseY];
}

function drawStroke(event) {
  if (!isStraightening || activeButton !== 'stroke') return;
  const mouseX = Math.floor((event.pageX - event.target.offsetLeft) / pixelSize);
  const mouseY = Math.floor((event.pageY - event.target.offsetTop) / pixelSize);
  ctx.fillRect(mouseX * pixelSize, mouseY * pixelSize, pixelSize, pixelSize);
  if (Math.abs(mouseX - lastX) > 1 || Math.abs(mouseY - lastX) > 1) {
    drawLine(lastX, lastY, mouseX, mouseY);
  }
}

function chooseCanvasColor(event) {
  if (activeButton === 'choose_color' || !isChoosing) {
    const mouseX = event.pageX - event.target.offsetLeft;
    const mouseY = event.pageY - event.target.offsetTop;
    const imgData = ctx.getImageData(mouseX, mouseY, 1, 1);
    const colorArr = imgData.data;
    const newColor = `rgba(${colorArr[0]},${colorArr[1]},${colorArr[2]},${(colorArr[3] / 255).toFixed(2)})`;
    prevColorCircle.style.backgroundColor = currentColor.style.backgroundColor;
    currentColor.style.backgroundColor = newColor;
    ctx.fillStyle = currentColor.style.backgroundColor;
    saveCanvas();
  }
}

function fill() {
  if (activeButton !== 'fill_bucket') return;
  ctx.fillStyle = currentColor.style.backgroundColor;
  ctx.rect(0, 0, canvasSize, canvasSize);
  ctx.fill();
  saveCanvas();
}

function startPencilling() {
  activeButton = 'pencil';
  document.getElementsByClassName('active_tool')[0].classList.remove('active_tool');
  pencilButton.classList.add('active_tool');
  ctx.fillStyle = currentColor.style.backgroundColor;
  ctx.strokeStyle = currentColor.style.backgroundColor;

  canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    lastX = Math.floor((event.pageX - event.target.offsetLeft) / pixelSize);
    lastY = Math.floor((event.pageY - event.target.offsetTop) / pixelSize);
  });
  canvas.addEventListener('mousemove', drawPencil);
  canvas.addEventListener('mousedown', () => {
    isDrawing = true;
  });
  canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    saveCanvas();
  });
  canvas.addEventListener('mouseout', () => {
    isDrawing = false;
    saveCanvas();
  });
}

function startChoosingColor() {
  activeButton = 'choose_color';
  document.getElementsByClassName('active_tool')[0].classList.remove('active_tool');
  chooseColor.classList.add('active_tool');
  const inputValue = document.getElementById('id_choose_color');
  inputValue.addEventListener('change', () => {
    prevColorCircle.style.backgroundColor = currentColor.style.backgroundColor;
    currentColor.style.backgroundColor = inputValue.value;
    ctx.fillStyle = inputValue.value;
  });
  canvas.addEventListener('mouseover', () => {
    isChoosing = true;
  });
  canvas.addEventListener('click', chooseCanvasColor);
  canvas.addEventListener('mouseout', () => {
    isChoosing = false;
    saveCanvas();
  });
}

function startFilling() {
  activeButton = 'fill_bucket';
  document.getElementsByClassName('active_tool')[0].classList.remove('active_tool');
  fillBucketButton.classList.add('active_tool');
  canvas.addEventListener('click', fill);
}

function startStraightening() {
  activeButton = 'stroke';
  document.getElementsByClassName('active_tool')[0].classList.remove('active_tool');
  strokeButton.classList.add('active_tool');
  isChoosing = false;
  isErasing = false;
  isDrawing = false;
  ctx.fillStyle = currentColor.style.backgroundColor;
  ctx.strokeStyle = currentColor.style.backgroundColor;

  let stroke;

  canvas.addEventListener('mousedown', (event) => {
    isStraightening = true;

    if (!isStraightening || activeButton !== 'stroke') return;

    stroke = document.getElementById('canvas').toDataURL('image/png');

    lastX = Math.floor((event.pageX - event.target.offsetLeft) / pixelSize);
    lastY = Math.floor((event.pageY - event.target.offsetTop) / pixelSize);
    saveCanvas();
  });
  canvas.addEventListener('mousemove', (e) => {
    if (!isStraightening || activeButton !== 'stroke') return;
    const canvasImage = new Image();
    canvasImage.onload = () => {
      ctx.drawImage(canvasImage, 0, 0);
    };
    canvasImage.src = stroke;
    canvasImage.crossOrigin = 'Anonymous';
    drawStroke(e);
  });
  canvas.addEventListener('mouseup', (e) => {
    if (!isStraightening || activeButton !== 'stroke') return;

    drawStroke(e);
    stroke = document.getElementById('canvas').toDataURL('image/png');
    const canvasImage = new Image();
    canvasImage.onload = () => {
      ctx.drawImage(canvasImage, 0, 0);
    };
    canvasImage.src = stroke;
    canvasImage.crossOrigin = 'Anonymous';
    isStraightening = false;
    saveCanvas();
  });
  canvas.addEventListener('mouseout', () => {
    isStraightening = false;
    saveCanvas();
  });
}

function startErasing() {
  activeButton = 'eraser';
  document.getElementsByClassName('active_tool')[0].classList.remove('active_tool');
  eraserButton.classList.add('active_tool');
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#ffffff';

  canvas.addEventListener('mousedown', (event) => {
    isErasing = true;
    lastX = Math.floor((event.pageX - event.target.offsetLeft) / pixelSize);
    lastY = Math.floor((event.pageY - event.target.offsetTop) / pixelSize);
  });
  canvas.addEventListener('mousemove', clearEraser);
  canvas.addEventListener('mousedown', () => {
    isErasing = true;
  });
  canvas.addEventListener('mouseup', () => {
    isErasing = false;
    saveCanvas();
  });
  canvas.addEventListener('mouseout', () => {
    isErasing = false;
    saveCanvas();
  });
}

if (activeButton === 'pencil') {
  pencilButton.classList.add('active_tool');
  ctx.fillStyle = '#000000';
  ctx.fillStyle = currentColor.style.backgroundColor;

  canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    lastX = Math.floor((event.pageX - event.target.offsetLeft) / pixelSize);
    lastY = Math.floor((event.pageY - event.target.offsetTop) / pixelSize);
  });
  canvas.addEventListener('mousemove', drawPencil);
  canvas.addEventListener('mousedown', () => {
    isDrawing = true;
  });
  canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    saveCanvas();
  });
  canvas.addEventListener('mouseout', () => {
    isDrawing = false;
    saveCanvas();
  });
}

pencilButton.addEventListener('click', () => {
  startPencilling();
});

chooseColor.addEventListener('click', () => {
  startChoosingColor();
});

eraserButton.addEventListener('click', () => {
  startErasing();
});

strokeButton.addEventListener('click', () => {
  startStraightening();
});

fillBucketButton.addEventListener('click', () => {
  startFilling();
});

const addFrameButton = document.getElementById('new_frame');
addFrameButton.addEventListener('click', () => {
  addNewFrame(arrFrames, stateFrame);
  startAnimation(arrFrames, stateFrame, animationSize);
  moveFrame(document.getElementById('frames'), arrFrames);
});

const saveGifButton = document.getElementById('save_gif');
saveGifButton.addEventListener(('click'), () => {
  downloadGif(arrFrames, stateFrame);
});

const fullScreenButton = document.getElementById('full_screen');
fullScreenButton.addEventListener(('click'), () => {
  if (animationBlock.webkitRequestFullScreen) {
    animationBlock.webkitRequestFullScreen();
  }
});

const hotkeyValues = document.getElementsByClassName('edit_hotkey_value');

document.body.addEventListener('keydown', (event) => {
  const fillBucketEventCode = `Key${hotkeyValues[0].textContent}`;
  const chooseColorEventCode = `Key${hotkeyValues[1].textContent}`;
  const pencilEventCode = `Key${hotkeyValues[2].textContent}`;
  const strokeEventCode = `Key${hotkeyValues[3].textContent}`;
  const eraserEventCode = `Key${hotkeyValues[4].textContent}`;
  const paintSamePixelsEventCode = `Key${hotkeyValues[5].textContent}`;
  const saveGifEventCode = `Key${hotkeyValues[6].textContent}`;
  const saveAPNGEventCode = `Key${hotkeyValues[7].textContent}`;
  const fullScreen = `Key${hotkeyValues[8].textContent}`;
  const addNewFrameEventCode = `Key${hotkeyValues[9].textContent}`;
  const deleteCurrentFrameEventCode = `Key${hotkeyValues[10].textContent}`;
  const duplicateCurrentFrameEventCode = `Key${hotkeyValues[11].textContent}`;

  if (event.code === fillBucketEventCode) {
    startFilling();
  } else if (event.code === chooseColorEventCode) {
    startChoosingColor();
  } else if (event.code === pencilEventCode) {
    startPencilling();
  } else if (event.code === strokeEventCode) {
    startStraightening();
  } else if (event.code === eraserEventCode) {
    startErasing();
  } else if (event.code === paintSamePixelsEventCode) {
    startFilling();
  } else if (event.code === addNewFrameEventCode) {
    addNewFrame(arrFrames, stateFrame);
    startAnimation(arrFrames, stateFrame, animationSize);
    moveFrame(document.getElementById('frames'), arrFrames);
  } else if (event.code === deleteCurrentFrameEventCode) {
    if (arrFrames.length > 1) {
      const activeFramePosition = Number((stateFrame.active).slice(6)) - 1;
      if (activeFramePosition === (arrFrames.length - 1)) {
        ((document.getElementById(`${stateFrame.active}`)).parentNode).remove();
        stateFrame.active = `frame_${activeFramePosition}`;
      } else if (activeFramePosition < (arrFrames.length - 1)) {
        ((document.getElementById(`${stateFrame.active}`)).parentNode).remove();
        stateFrame.active = `frame_${activeFramePosition + 1}`;
      }
      arrFrames.splice(activeFramePosition, 1);
      arrFrames.forEach((item, index) => {
        const a = item;
        a.id = `frame_${index + 1}`;
      });
      ((document.getElementById(`${stateFrame.active}`)).parentNode).style.border = '2px solid #ffa500';
      drawCurrentFrame(document.getElementById(`${stateFrame.active}`));
      stateFrame.counter = 0;
      startAnimation(arrFrames, stateFrame, animationSize);
    } else {
      // eslint-disable-next-line no-alert
      alert('Can not remove last frame!');
    }
  } else if (event.code === duplicateCurrentFrameEventCode) {
    ((document.getElementById(`${stateFrame.active}`)).parentNode).style.border = '2px solid #808080';
    duplicateFrame(arrFrames, stateFrame, document.getElementById(`${stateFrame.active}`));
    moveFrame(document.getElementById('frames'), arrFrames);
    stateFrame.counter = 0;
    startAnimation(arrFrames, stateFrame, animationSize);
  } else if (event.code === fullScreen) {
    animationBlock.webkitRequestFullScreen();
  } else if (event.code === saveGifEventCode) {
    downloadGif(arrFrames, stateFrame);
  } else if (event.code === saveAPNGEventCode) {
    downloadAPNG(arrFrames, stateFrame);
  }
});

let baseImage = null;
let startDrawX;
let startDrawY;

const buttonLoad = document.querySelector('.load_image');
buttonLoad.addEventListener('click', async () => {
  const searchArea = document.querySelector('.search_area');
  const url = `https://api.unsplash.com/photos/random?query=${searchArea.value}&client_id=4648a44463e38e77b482a2e53db851bad0de3b7f397c2235888ce355a6dde11e`;
  const response = await fetch(url);
  const data = await response.json();
  if (canvas.getContext) {
    baseImage = new Image();
    baseImage.setAttribute('crossorigin', 'anonymous');
    baseImage.onload = () => {
      if (baseImage.height <= canvasSize) {
        startDrawX = Math.ceil((canvasSize - baseImage.width) / 2);
        startDrawY = Math.ceil((canvasSize - baseImage.height) / 2);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(baseImage, startDrawX, startDrawY);
      }
      if (baseImage.height > canvasSize) {
        baseImage.height = canvasSize;
        baseImage.width = Math.ceil(baseImage.width * (canvasSize / baseImage.height));
        startDrawX = Math.ceil((canvasSize - baseImage.width) / 2);
        startDrawY = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(baseImage, startDrawX, startDrawY);
      }
      saveCanvas();
    };
    baseImage.src = data.urls.small;
    baseImage.crossOrigin = 'Anonymous';
  }
});

const buttonMakeGray = document.querySelector('.make_gray');
buttonMakeGray.addEventListener('click', () => {
  if (baseImage === null) {
    // eslint-disable-next-line no-alert
    alert('Upload image!');
  }
  if (baseImage !== null) {
    const imgPixels = ctx.getImageData(startDrawX, startDrawY, baseImage.width, baseImage.height);
    for (let i = 0; i < imgPixels.height; i += 1) {
      for (let j = 0; j < imgPixels.width; j += 1) {
        const n = (i * 4) * imgPixels.width + j * 4;
        const avg = (imgPixels.data[n] + imgPixels.data[n + 1] + imgPixels.data[n + 2]) / 3;
        imgPixels.data[n] = avg;
        imgPixels.data[n + 1] = avg;
        imgPixels.data[n + 2] = avg;
      }
    }
    ctx.putImageData(imgPixels, startDrawX, startDrawY);
    saveCanvas();
  }
});

const hoverButtons = Array.from(document.body.getElementsByClassName('hover_button'));
for (let i = 0; i < hoverButtons.length; i += 1) {
  hoverButtons[i].addEventListener(('mouseover'), () => {
    if (i === 1) {
      const startContent = hoverButtons[1].firstElementChild.lastElementChild.textContent;
      hoverButtons[1].firstElementChild.lastElementChild.textContent = `(${hotkeyValues[1].textContent})`;
      hoverButtons[1].addEventListener(('mouseout'), () => {
        hoverButtons[1].firstElementChild.lastElementChild.textContent = startContent;
      });
    } else {
      const startContent = hoverButtons[i].lastElementChild.textContent;
      hoverButtons[i].lastElementChild.textContent = `(${hotkeyValues[i].textContent})`;
      hoverButtons[i].addEventListener(('mouseout'), () => {
        hoverButtons[i].lastElementChild.textContent = startContent;
      });
    }
  });
}

const startPageScreen = document.body.querySelector('#piskel_screen');
startPageScreen.style.backgroundImage = 'url(./assets/images/piskel.png)';
startPageScreen.style.backgroundSize = 'cover';
startPageScreen.style.backgroundRepeat = 'no-repeat';

const examples = document.body.getElementsByClassName('example');
Array.from(examples).forEach((item, index) => {
  const example = item;
  example.style.backgroundImage = `url(./assets/frames/${index + 1}.gif)`;
});

const downloadPNGButton = document.getElementById('save_apng');
downloadPNGButton.addEventListener(('click'), () => {
  downloadAPNG(arrFrames, stateFrame);
});
