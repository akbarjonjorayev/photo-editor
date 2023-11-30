import * as Data from './data.js'
import * as Get from './get.js'
import * as ShowHide from './showHide.js'

const appData = Data.getData()

const menuTxtarea = document.querySelector('.menu_txtarea')

function txtareaCheck() {
  const txtarea = document.querySelector('.edit_moving.active textarea')
  if (txtarea) {
    menuTxtarea.value = txtarea.value
  }
}

function elsIndex(el) {
  el.style.zIndex = appData.maxIndex
  appData.maxIndex++
}

const txtStyleBtns = document.querySelectorAll('.text_style_btns .btn')
const fzInput = document.querySelector('.fz_input')
const fzVal = document.querySelector('.fz_val')
const colorInput = document.querySelector('.color_input[purpose="text"]')

function elsTxtBtnsCheck(el) {
  const txtarea = el.querySelector('textarea')
  if (!txtarea) return

  const cStyle = txtarea.style.cssText
  const { property, value } = Get.CSSProperties(cStyle)

  if (property.length == 0) {
    for (let i = 0; i < txtStyleBtns.length; i++) {
      ShowHide.hideEl(txtStyleBtns[i], 'active')
    }

    fzInput.value = fzVal.innerText = 16
    colorInput.value = '#000000'
  }

  for (let i = 0; i < txtStyleBtns.length; i++) {
    const { cssText } = txtStyleBtns[i].style
    const { property: btnProperty, value: btnValue } =
      Get.CSSProperties(cssText)

    if (property.includes(btnProperty[0]) && value.includes(btnValue[0])) {
      ShowHide.hideEl(txtStyleBtns[i], 'active')
    } else {
      ShowHide.showEl(txtStyleBtns[i], 'active')
    }
  }

  const style = window.getComputedStyle(el)

  if (property.includes('font-size')) {
    const index = property.indexOf('font-size')

    fzInput.value = fzVal.innerText = parseInt(value[index])
  } else {
    fzInput.value = fzVal.innerText = parseInt(style.fontSize)
  }

  if (property.includes('color')) {
    const index = property.indexOf('color')
    colorInput.value = Get.colorFromRGB(value[index])
  } else {
    colorInput.value = Get.colorFromRGB(style.color)
  }
}

export { txtareaCheck, elsIndex, elsTxtBtnsCheck }
