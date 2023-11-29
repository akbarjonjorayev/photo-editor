import * as Get from './get.js'
import * as Msg from './msg.js'

function getData(el) {
  if (!el) return false
  const rect = el.getBoundingClientRect()
  const parentRect = el.parentElement.getBoundingClientRect()

  // const style = window.getComputedStyle(el)

  return {
    // size
    width: +rect.width.toFixed(0),
    height: +rect.height.toFixed(0),
    // position
    top: +(rect.top - parentRect.top).toFixed(0),
    right: +(rect.right - parentRect.left).toFixed(0),
    bottom: +(rect.bottom - parentRect.top).toFixed(0),
    left: +(rect.left - parentRect.left).toFixed(0),
    // index
    index: Array.from(el.parentElement.children).indexOf(el),
    // text
    text: Get.text(el.innerText),
  }
}

function setAnimation(el) {
  el.classList.add('animation')

  setTimeout(() => {
    el.classList.remove('animation')
  }, 300)
}

function setStyle(el, style, notStyle = []) {
  const { property, value } = Get.CSSProperties(style)

  for (let i = 0; i < property.length; i++) {
    if (!notStyle.includes(property[i])) {
      el.style[property[i]] = value[i]
    }
  }
}

function removeStyle(el, style) {
  const { property } = Get.CSSProperties(style)

  for (let i = 0; i < property.length; i++) {
    el.style.removeProperty(property[i])
  }
}

function toggleStyle(el, style) {
  const cStyle = Get.CSSProperties(el.style.cssText)
  const { property: cProperty, value: cValue } = cStyle
  const { property, value } = Get.CSSProperties(style)

  for (let i = 0; i < property.length; i++) {
    const pr = property[i]
    const index = cProperty.indexOf(pr)

    if (index == -1) {
      setStyle(el, style)
      continue
    }

    if (index != -1) {
      if (cValue[index] == value[i]) {
        el.style[pr] = ''
      } else {
        setStyle(el, style)
      }
    }
  }
}

function cursorPos(e, el) {
  const result = {
    x: 0,
    y: 0,
    txt: `0 x 0`,
  }
  if (!e) return result
  const { clientX, clientY } = e

  const rect = el.getBoundingClientRect()

  const relativeX = (clientX - rect.left).toFixed()
  const relativeY = (clientY - rect.top).toFixed()

  result.x = Math.max(relativeX, 0)
  result.y = Math.max(relativeY, 0)

  result.txt = `${result.x} x ${result.y}`
  return result
}

function takeScreen(url) {
  const link = document.createElement('a')

  link.href = url
  link.download = 'photo-editor.png'
  link.click()

  Msg.show('Screenshot downloaded', 'success')
}

export {
  getData,
  setAnimation,
  setStyle,
  removeStyle,
  toggleStyle,
  cursorPos,
  takeScreen,
}
