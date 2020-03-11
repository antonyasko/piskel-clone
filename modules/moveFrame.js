function moveFrame(rootEl, arrFrames) {
  let dragEl;

  const arr = [].slice.call(rootEl.children);

  arr.forEach((itemEl) => {
    const item = itemEl;
    item.draggable = true;
  });

  function onDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const { target } = e;
    if (target && target !== dragEl && target.nodeName === 'LI') {
      rootEl.insertBefore(dragEl, target.nextSibling || target);
    }
  }

  function onDragEnd(e) {
    e.preventDefault();
    dragEl.classList.remove('ghost');
    rootEl.removeEventListener('dragover', onDragOver, false);
    rootEl.removeEventListener('dragend', onDragEnd, false);
    const newArrFrames = arrFrames;
    newArrFrames.length = 0;
    const newArr = [].slice.call(rootEl.children);
    newArr.forEach((item) => {
      newArrFrames.push(item.firstChild);
    });
    newArrFrames.forEach((item, index) => {
      const a = item;
      a.id = `frame_${index + 1}`;
    });
  }

  rootEl.addEventListener('dragstart', (e) => {
    dragEl = e.target;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('Text', dragEl.textContent);
    rootEl.addEventListener('dragover', onDragOver, false);
    rootEl.addEventListener('dragend', onDragEnd, false);

    setTimeout(() => {
      dragEl.classList.add('ghost');
    }, 0);
  }, false);
}

module.exports = moveFrame;
