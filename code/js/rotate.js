import * as Get from './get.js'
import * as Elements from './elements.js'

const axes = document.querySelectorAll('.coord_axes > div')
const axeVal = document.querySelector('.coord_axes_val')
const input = document.querySelector('.rotate_input')

function axeBtns(axe) {
  const rEl = document.querySelector('.edit_moving.active .edit_moving_item')
  if (!rEl) return

  const rStyle = Get.atttribute(rEl, 'data-rotate').parse

  if (axe.classList.contains('active')) return

  const removeEls = document.querySelectorAll('.coord_axes > div.active')
  for (let i = 0; i < removeEls.length; i++) {
    removeEls[i].classList.remove('active')
  }

  axe.classList.add('active')

  const axeTxt = Elements.getData(axe).text.lowerCase
  input.value = axeVal.innerText = rStyle[axeTxt]
}

function rotateInput() {
  const rEl = document.querySelector('.edit_moving.active .edit_moving_item')
  if (!rEl) return

  const rStyle = Get.atttribute(rEl, 'data-rotate').parse

  const activeAxe = document.querySelector('.coord_axes > div.active')
  const axeTxt = Elements.getData(activeAxe).text.lowerCase

  rStyle[axeTxt] = axeVal.innerText = input.value
  resultFunc(rEl, rStyle)
}

function rotateBtns(btn, range = 1) {
  const rEl = document.querySelector('.edit_moving.active .edit_moving_item')
  if (!rEl) return

  const rStyle = Get.atttribute(rEl, 'data-rotate').parse

  const activeAxe = document.querySelector('.coord_axes > div.active')
  const axeTxt = Elements.getData(activeAxe).text.lowerCase

  const val = +input.value
  const sign = Elements.getData(btn).text.lowerCase

  const rVal = sign == '+' ? val + range : sign == '-' ? val - range : val

  rStyle[axeTxt] = axeVal.innerText = input.value = rVal
  resultFunc(rEl, rStyle)
}

function defaultRotate() {
  const rEl = document.querySelector('.edit_moving.active .edit_moving_item')
  if (!rEl) return

  const rStyle = Get.atttribute(rEl, 'data-rotate').parse

  rStyle.x = rStyle.y = rStyle.z = 0
  axeVal.innerText = input.value = 0
  resultFunc(rEl, rStyle)
}

function resultFunc(el, rStyle  )   {
  el.setAttribute('data-rotate', JSON.stringify(rStyle))
  el.style.transform = `rotateX(${rStyle.x}deg) rotateY(${rStyle.y}deg) rotateZ(${rStyle.z}deg)`
}

export { axeBtns, rotateInput, rotateBtns, defaultRotate }
