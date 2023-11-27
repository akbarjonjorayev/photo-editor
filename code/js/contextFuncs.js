import * as ShowHideClass from './showHide.js'
import * as Check from './check.js'

function delEl() {
  const editEl = document.querySelector('.edit_moving.active')
  if (!editEl) return false

  ShowHideClass.hideEl(editEl)

  editEl.ontransitionend = () => {
    editEl.remove()
  }
  Check.menuArea()
}

const editElWl = document.querySelector('.edit_el_wallpaper')
const wlMenuCon = document.querySelector('.wallpaper_menu_con')

function setAsWallpaper() {
  const imgEl = document.querySelector('.edit_moving.active img')
  if (!imgEl) return false

  const imgVal = imgEl.src
  const imgAtt = imgEl.getAttribute('data-size-class')

  const img = `<img src="${imgVal}" class="${imgAtt}" data-size-class="${imgAtt}" />`
  editElWl.innerHTML = img

  const fillBtn = wlMenuCon.querySelector('.fill_btn')
  fillBtn.classList.remove('active')

  editElWl.classList.remove('hide')
}

function removeAsWallpaper() {
  editElWl.classList.add('hide')
}

function fill() {
  const editEl = document.querySelector('.edit_moving.active')
  let fillEl

  if (editEl) {
    fillEl = editEl.querySelector('img')
  }
  if (!editEl) {
    fillEl = editElWl.querySelector('img')
  }

  if (!fillEl) return
  const className = fillEl.getAttribute('data-size-class')

  fillEl.classList.toggle(className)
}

export { delEl, setAsWallpaper, removeAsWallpaper, fill }
