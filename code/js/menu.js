import * as Data from './data.js'
import * as ShowWHide from './showHide.js'
import * as Get from './get.js'
import * as Elements from './elements.js'
import * as Msg from './msg.js'

const appData = Data.getData()

const recentCs = document.querySelectorAll('.recent_colors')

function recetColors() {
  const colors = appData.recentColors.reverse()

  if (colors.length == 0) {
    return
  }

  for (let i = 0; i < recentCs.length; i++) {
    const childs = recentCs[i].children
    const area = recentCs[i].closest('.recent_colors_area')

    ShowWHide.showEl(area)

    for (let j = 0; j < childs.length; j++) {
      childs[j].style.background = colors[j]
    }
  }
}

const editElBg = document.querySelector('.edit_el_background')

function changeColor(color, purpose) {
  if (!color) return
  const editEl = document.querySelector('.edit_moving.active .edit_moving_item')

  if (purpose == 'background') {
    if (editEl) {
      const childs = editEl.children
      for (let i = 0; i < childs.length; i++) {
        if (childs[i]) {
          childs[i].style.background = color
          break
        }
      }
    }
    if (!editEl) {
      editElBg.style.background = color
    }
  }

  if (purpose == 'text') {
    const txtarea = document.querySelector('.edit_moving.active textarea')
    txtarea.style.color = color
  }
}

const opaVal = document.querySelector('.opa_val')
function changeOpacity(val) {
  const editEl = document.querySelector(
    '.edit_moving.active .edit_moving_bg_color'
  )

  if (editEl) {
    editEl.style.opacity = `${val}%`
  }
  if (!editEl) {
    editElBg.style.opacity = `${val}%`
  }
  opaVal.innerText = val
}

const blurVal = document.querySelector('.blur_val')
const maxVal = +document.querySelector('.blur_input').getAttribute('max')
function changeBlur(val) {
  const editEl = document.querySelector(
    '.edit_moving.active .edit_moving_bg_color'
  )

  if (editEl) {
    editEl.style.backdropFilter = `blur(${val}px)`
  }
  blurVal.innerText = Get.percent(val, maxVal).raw
}

const fzVal = document.querySelector('.fz_val')
function changeFz(fz) {
  const editEl = document.querySelector('.edit_moving.active textarea')
  editEl.style.fontSize = `${fz}px`
  fzVal.innerText = fz
}

const searchInput = document.querySelector('.photo_search_input')

async function searchPhoto() {
  const val = searchInput.value.trim().split(' ').join('+')
  const https = `https://pixabay.com/api/?key=${appData.token.searchPhoto}&q=${val}&image_type=photo`

  const promise = await fetch(https)
  const res = await promise.json()

  return res
}

export {
  recetColors,
  changeColor,
  changeOpacity,
  changeBlur,
  changeFz,
  searchPhoto,
}
