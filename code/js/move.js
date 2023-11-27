import * as Elements from './elements.js'
import * as Get from './get.js'

const editArea = document.querySelector('.edit_area')

const wArea = Elements.getData(editArea).width
const hArea = Elements.getData(editArea).height

function move(d, m, data) {
  const dx = d.clientX
  const mx = m.clientX

  const moveX = mx - dx
  const resultX = Math.min(Math.max(data.left + moveX), wArea)

  const dy = d.clientY
  const my = m.clientY

  const moveY = my - dy
  const resultY = Math.min(Math.max(data.top + moveY), hArea)

  return {
    x: Get.percent(resultX, wArea).raw,
    y: Get.percent(resultY, hArea).raw,
    range: {
      x: moveX,
      y: moveY,
    },
  }
}

function resizeLine(d, m, index, data, el) {
  const { width, left, right } = data
  const { height, top, bottom } = data

  const result = { width: width, height: height, left: left, top: top }

  const moveX = m.clientX - d.clientX
  const moveY = m.clientY - d.clientY

  if (el.hasAttribute('width')) {
    if (index == 0) {
      result.width = Math.max(width + moveX, 0)
    }
    if (index == 1) {
      result.width = Math.max(width - moveX, 0)
      result.left = Math.min(left + moveX, right)
    }
  }
  if (el.hasAttribute('height')) {
    if (index == 0) {
      result.height = Math.max(height - moveY, 0)
      result.top = Math.min(top + moveY, bottom)
    }
    if (index == 1) {
      result.height = Math.max(height + moveY, 0)
    }
  }

  result.width = Get.percent(result.width, wArea).raw
  result.height = Get.percent(result.height, hArea).raw
  result.left = Get.percent(result.left, wArea).raw
  result.top = Get.percent(result.top, hArea).raw

  return result
}

function resizePoint(d, m, index, data) {
  const { width, left, right } = data
  const { height, top, bottom } = data

  const result = { width: width, height: height, left: left, top: top }

  const moveX = m.clientX - d.clientX
  const moveY = m.clientY - d.clientY

  if (index == 0) {
    result.width = Math.max(width - moveX, 0)
    result.left = Math.min(left + moveX, right)

    result.height = Math.max(height - moveY, 0)
    result.top = Math.min(top + moveY, bottom)
  }
  if (index == 1) {
    result.width = Math.max(width + moveX, 0)

    result.height = Math.max(height - moveY, 0)
    result.top = Math.min(top + moveY, bottom)
  }
  if (index == 2) {
    result.width = Math.max(width + moveX, 0)

    result.height = Math.max(height + moveY, 0)
  }
  if (index == 3) {
    result.width = Math.max(width - moveX, 0)
    result.left = Math.min(left + moveX, right)

    result.height = Math.max(height + moveY, 0)
  }

  result.width = Get.percent(result.width, wArea).raw
  result.height = Get.percent(result.height, hArea).raw
  result.left = Get.percent(result.left, wArea).raw
  result.top = Get.percent(result.top, hArea).raw

  return result
}

export { move, resizeLine, resizePoint }
