function changeHotKeys() {
  const hotKeysButton = document.getElementById('hotkeys');
  hotKeysButton.style.backgroundImage = 'url(../assets/icons/keyboard_icon.svg)';
  hotKeysButton.style.backgroundRepeat = 'no-repeat';
  hotKeysButton.style.backgroundSize = 'cover';
  hotKeysButton.style.backgroundPosition = 'center';

  hotKeysButton.addEventListener(('click'), () => {
    const hotKeysPopUp = document.getElementById('hotkeys_popup');

    hotKeysPopUp.style.display = 'block';

    const closeHotkeysPopUpButton = document.getElementById('close_hotkeys_popup');
    closeHotkeysPopUpButton.addEventListener(('click'), () => {
      hotKeysPopUp.style.display = 'none';
    });

    const hotkeyValues = document.getElementsByClassName('edit_hotkey_value');

    const arrReservedChars = [];

    for (let i = 0; i < hotkeyValues.length; i += 1) {
      arrReservedChars.push(hotkeyValues[i].textContent);
    }

    const hotkeysList = document.getElementById('hotkeys_list').getElementsByTagName('li');

    const status = {
      isEditing: false,
    };

    for (let i = 0; i < hotkeysList.length; i += 1) {
      hotkeysList[i].addEventListener(('click'), () => {
        if (status.isEditing) {
          return;
        }
        status.isEditing = true;
        hotkeysList[i].classList.add('item_selected');
        document.body.addEventListener(('keydown'), function editChar(event) {
          if ((event.code).slice(0, 3) === 'Key') {
            const char = (event.code).slice(3);
            if (arrReservedChars.includes(char)) {
              alert('This key is already used, select another key!');
            } else {
              hotkeyValues[i].firstChild.textContent = char;
              arrReservedChars[i] = char;
            }
          } else if (event.code === 'Escape') {
            status.isEditing = false;
          } else {
            alert('Incorrect value!');
          }
          status.isEditing = false;
          document.getElementById('hotkeys_list').getElementsByClassName('item_selected')[0].classList.remove('item_selected');
          document.body.removeEventListener('keydown', editChar);
        });
      });
    }
  });
}

module.exports = changeHotKeys;
