import * as Get from './get.js'
import * as ShowHide from './showHide.js'
import * as Elements from './elements.js'

const movingMenuCon = document.querySelector('.edit_moving_menu_con')
const wlMenuCon = document.querySelector('.wallpaper_menu_con')

const editElWl = document.querySelector('.edit_el_wallpaper')

function contextMenus(menus) {
  let menu, con

  for (let i = 0; i < menus.length; i++) {
    const menuCon = menus[i].closest('.context_menu_con')

    if (!menuCon.classList.contains('hide')) {
      menu = menus[i]
      con = menuCon
      break
    }
  }

  const editEl = document.querySelector('.edit_moving.active')
  if (!editEl) return

  checkMenuPos(menu)
  checkBtns(menu, con)
}

function checkFillBtn(img, fillBtn) {
  if (img) {
    if (
      img.classList.contains('max_width') ||
      img.classList.contains('max_height')
    ) {
      fillBtn.classList.remove('active')
    } else {
      fillBtn.classList.add('active')
    }
  }
}

function checkBtns(menu, con) {
  const editEl = document.querySelector('.edit_moving.active')
  const el = editEl.querySelector('.edit_moving_item').children[1]
  const elName = Get.text(el.tagName).lowerCase

  const btns = con.querySelector('.context_menu_item').children

  for (let i = 0; i < btns.length; i++) {
    const purpose = btns[i].getAttribute('purpose')

    if (purpose == 'all') {
      continue
    }
    if (elName == purpose) {
      ShowHide.fullShowEl(btns[i])
    }
    if (elName != purpose) {
      ShowHide.fullHideEl(btns[i])
    }
  }

  if (editEl && con == movingMenuCon) {
    const img = editEl.querySelector('img')
    const fillBtn = menu.querySelector('.fill_btn')
    checkFillBtn(img, fillBtn)
  }
  if (con == wlMenuCon) {
    const img = editElWl.querySelector('img')
    const fillBtn = con.querySelector('.fill_btn')
    checkFillBtn(img, fillBtn)
  }
}

function checkMenuPos(menu) {
  menu.classList.remove('left', 'top')

  const { width, height } = Elements.getData(document.body)
  const { right, bottom } = Elements.getData(menu)

  const checkLeft = right > width
  const checkTop = bottom > height

  if (checkLeft) {
    menu.classList.add('left')
  }

  if (checkTop) {
    menu.classList.add('top')
  }

  if (!(checkLeft || checkTop)) {
    menu.classList.remove('left', 'top')
  }
}

const menuItemBtns = document.querySelectorAll('.menu_item_btn')
function menuArea() {
  for (let i = 0; i < menuItemBtns.length; i++) {
    const att = menuItemBtns[i].getAttribute('show')
    const el = document.querySelector(`.${att}`)

    if (!el.classList.contains('hide')) el.classList.add('hide')
  }
}

const rotateMenu = document.querySelector('.rotate_menu_item')
const coordAxes = document.querySelectorAll('.coord_axes > div')
const axeVal = document.querySelector('.coord_axes_val')
const rInput = document.querySelector('.rotate_input')

function rotateChilds(el) {
  if (rotateMenu.classList.contains('hide')) return
  const axeBtn = coordAxes[0].parentElement.querySelector('.active')
  const axe = Get.text(axeBtn.innerText).lowerCase

  const rStyle = Get.atttribute(el, 'data-rotate').parse

  for (let i = 0; i < coordAxes.length; i++) {
    if (coordAxes[i] != axeBtn) {
      coordAxes[i].classList.remove('active')
    }
  }

  rInput.value = axeVal.innerText = rStyle[axe]
}

const bgMenuItem = document.querySelector('.background_menu_item')
const colorInput = document.querySelector('.color_input')
const opaVal = document.querySelector('.opa_val')
const opacityInput = document.querySelector('.opacity_input')
const blurVal = document.querySelector('.blur_val')
const blurInput = document.querySelector('.blur_input')

const maxVal = +document.querySelector('.blur_input').getAttribute('max')
function backgroundChilds() {
  if (bgMenuItem.classList.contains('hide')) return

  const editEl = document.querySelector(
    '.edit_moving.active .edit_moving_bg_color'
  )

  const { property, value } = Get.CSSProperties(editEl.style.cssText)

  if (property.length == 0) {
    colorInput.value = '#000'
    opacityInput.value = opaVal.innerText = 100
    blurInput.value = blurVal.innerText = 0
    return
  }
  for (let i = 0; i < property.length; i++) {
    if (property[i] == 'background-color') {
      colorInput.value = value[i]
    }
    if (property[i] == 'opacity') {
      opacityInput.value = opaVal.innerText = Get.number(100 * +value[i]).fixed
    }
    if (property[i] == 'backdrop-filter') {
      const blur = Get.allNumbers(value[i])[0]

      blurVal.innerText = Get.percent(blur, maxVal).raw
      blurInput.value = blur
    }
  }
}

const txtStyleBtns = document.querySelectorAll('.text_style_btns .btn')

function textBtns() {
  const txtarea = document.querySelector('.edit_moving.active textarea')
  const currentStyle = txtarea.style.cssText

  for (let i = 0; i < txtStyleBtns.length; i++) {
    const style = txtStyleBtns[i].getAttribute('style')
    if (currentStyle.includes(style)) {
      ShowHide.hideEl(txtStyleBtns[i], 'active')
    }
    if (!currentStyle.includes(style)) {
      ShowHide.showEl(txtStyleBtns[i], 'active')
    }
  }
}

export { contextMenus, menuArea, rotateChilds, backgroundChilds, textBtns }
