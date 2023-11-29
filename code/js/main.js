import * as Loaded from './load.js'
import * as Photo from './photo.js'
import * as Data from './data.js'
import * as Elements from './elements.js'
import * as HTML from './html.js'
import * as ShowHideClass from './showHide.js'
import * as Check from './check.js'
import * as Get from './get.js'
import * as ContextFuncs from './contextFuncs.js'
import * as Rotate from './rotate.js'
import * as Move from './move.js'
import * as Menu from './menu.js'
import * as Msg from './msg.js'
import * as EditArea from './editArea.js'

const appData = Data.getData()

document.addEventListener('DOMContentLoaded', () => {
  Loaded.startCount()

  HTML.shapes()
})

window.onload = () => {
  Loaded.loaded()
  allApp()

  Msg.show('Page has loaded successfuly', 'success')
}

const showHideEls = document.querySelectorAll('[showHideEl]')
for (let i = 0; i < showHideEls.length; i++) {
  showHideEls[i].onclick = () => {
    ShowHideClass.showHide(showHideEls[i])
  }
}

const chooseCon = document.querySelector('.choose_full_con')

const uploadFileBtns = document.querySelectorAll('.upload_btn_file')
const uploadCameraBtn = document.querySelector('.upload_btn_camera')

const fileInput = document.querySelector('.upload_input')

const editMovingMenuCon = document.querySelector('.edit_moving_menu_con')
for (let i = 0; i < uploadFileBtns.length; i++) {
  uploadFileBtns[i].onclick = () => {
    if (uploadFileBtns[i].getAttribute('class').includes('new')) {
      appData.uploadNew = true
    }
    fileInput.click()
  }
}

fileInput.onchange = async () => {
  const photo = await Photo.getPhoto(fileInput)

  if (appData.uploadNew) {
    const editEl = document.querySelector('.edit_moving.active')
    const img = editEl.querySelector('img')

    img.src = photo.url
    img.setAttribute('data-size-class', photo.sizeClass)
    img.setAttribute('class', photo.sizeClass)

    editMovingMenuCon.classList.add('hide')
  } else {
    const size = { w: photo.img.width, h: photo.img.height }
    const maxLet = photo.sizeClass.split('max_')[1][0]
    const maxSize = size[maxLet]
    const p = maxSize / appData.newElSize

    const width = size.w / p
    const height = size.h / p
    HTML.editMoving('photo', photo, { width: width, height: height })
  }

  chooseCon.classList.add('hide')
  allApp()
  fileInput.value = ''
  appData.uploadNew = false
}

const menuTitleBtns = document.querySelectorAll('.menu_title_btn')
for (let i = 0; i < menuTitleBtns.length; i++) {
  menuTitleBtns[i].onclick = () => {
    menuTitleBtns[i].closest('.menu_item').classList.add('hide')
  }
}

const editElMoving = document.querySelector('.edit_el_moving')
const editElWl = document.querySelector('.edit_el_wallpaper')
const wlMenuCon = document.querySelector('.wallpaper_menu_con')

editElMoving.onclick = () => {
  const editEl = document.querySelector('.edit_moving.active')

  if (editEl) {
    editEl.classList.remove('active')
    Check.menuArea()
  }
}

editElMoving.oncontextmenu = (e) => {
  e.preventDefault()
  if (!editElWl.classList.contains('hide')) {
    wlMenuCon.classList.remove('hide')
  }

  const editEl = document.querySelector('.edit_moving.active')

  if (editEl) {
    editEl.classList.remove('active')
    Check.menuArea()
  }
}

const contextMenuWins = document.querySelectorAll('.context_menu_win')
for (let i = 0; i < contextMenuWins.length; i++) {
  contextMenuWins[i].onmouseup = () => {
    contextMenuWins[i].parentElement.classList.add('hide')
  }
}

const contextMenuItems = document.querySelectorAll('.context_menu_item > div')
for (let i = 0; i < contextMenuItems.length; i++) {
  contextMenuItems[i].onmouseup = () => {
    if (!contextMenuItems[i].classList.contains('upload_btn_file'))
      contextMenuItems[i].closest('.context_menu_con').classList.add('hide')
  }
}

const setAsWlBtn = document.querySelector('.set_as_wallpaper_btn')
setAsWlBtn.onclick = () => {
  ContextFuncs.setAsWallpaper()
}

const removeAsWlBtn = document.querySelector('.remove_as_wallpaper_btn')
removeAsWlBtn.onclick = () => {
  ContextFuncs.removeAsWallpaper()
}

const fillBtns = document.querySelectorAll('.fill_btn')
for (let i = 0; i < fillBtns.length; i++) {
  fillBtns[i].onclick = () => {
    ContextFuncs.fill()
  }
}

const delBtn = document.querySelector('.edit_moving_menu_con .delete_btn')
delBtn.onclick = () => {
  ContextFuncs.delEl()
  allApp()
}

window.onmouseup = () => {
  appData.move = false
}

const contextMenus = document.querySelectorAll('.context_menu_item')
window.oncontextmenu = (c) => {
  c.preventDefault()

  const { clientX, clientY } = c

  for (let i = 0; i < contextMenus.length; i++) {
    contextMenus[i].style.left = `${clientX}px`
    contextMenus[i].style.top = `${clientY}px`
  }

  Check.contextMenus(contextMenus)
}

const editArea = document.querySelector('.edit_area')
const cursorPos = document.querySelector('.cursor_pos')

editArea.onmousemove = (m) => {
  const pos = Elements.cursorPos(m, editArea).txt
  cursorPos.innerText = pos
}

editArea.onmouseout = () => {
  const pos = Elements.cursorPos(false).txt
  cursorPos.innerText = pos
}

const coordAxes = document.querySelectorAll('.coord_axes > div')
const rInput = document.querySelector('.rotate_input')

for (let i = 0; i < coordAxes.length; i++) {
  coordAxes[i].onclick = () => {
    Rotate.axeBtns(coordAxes[i])
  }
}

rInput.oninput = () => {
  Rotate.rotateInput()
}

const axeBtns = document.querySelectorAll('.axe_btn')
for (let i = 0; i < axeBtns.length; i++) {
  axeBtns[i].onclick = () => {
    Rotate.rotateBtns(axeBtns[i])
  }
}

const rotateDBtn = document.querySelector('.rotate_default_btn')
rotateDBtn.onclick = () => {
  Rotate.defaultRotate()
}

const menuItemBtns = document.querySelectorAll('.menu_item_btn')
const rotateMenuBtn = document.querySelector('[show="rotate_menu_item"]')
const textMenuBtn = document.querySelector('[show="text_menu_item"]')

for (let i = 0; i < menuItemBtns.length; i++) {
  menuItemBtns[i].onclick = () => {
    const editEl = document.querySelector('.edit_moving.active')
    if (!editEl) return

    if (menuItemBtns[i] == rotateMenuBtn) {
      Check.rotateChilds(editEl)
    }
    if (menuItemBtns[i] == textMenuBtn) {
      const txtarea = editEl.querySelector('textarea')
      if (!txtarea) return
    }
    ShowHideClass.showHide(menuItemBtns[i])
  }
}

const menuBgBtn = document.querySelector('.menu_bg_btn')

menuBgBtn.onclick = () => {
  Menu.recetColors()
  ShowHideClass.showHide(menuBgBtn)
}

const menuTxtarea = document.querySelector('.menu_txtarea')

menuTxtarea.oninput = () => {
  const txtarea = document.querySelector('.edit_moving.active textarea')
  txtarea.value = menuTxtarea.value
}

const colorInputs = document.querySelectorAll('.color_input')

for (let i = 0; i < colorInputs.length; i++) {
  colorInputs[i].oninput = () => {
    const purpose = colorInputs[i].getAttribute('purpose')
    Menu.changeColor(colorInputs[i].value, purpose)
  }

  colorInputs[i].onblur = () => {
    appData.recentColors.push(colorInputs[i].value)
    Menu.recetColors()
  }
}

const opacityInput = document.querySelector('.opacity_input')
opacityInput.oninput = () => {
  Menu.changeOpacity(opacityInput.value)
}

const blurInput = document.querySelector('.blur_input')
blurInput.oninput = () => {
  Menu.changeBlur(blurInput.value)
}

const recentCs = document.querySelectorAll('.recent_colors > div')
for (let i = 0; i < recentCs.length; i++) {
  recentCs[i].onclick = () => {
    const color = recentCs[i].style['background-color']
    const purpose = recentCs[i].parentElement.getAttribute('purpose')

    Menu.changeColor(color, purpose)
  }
}

const bgtransBtn = document.querySelector('.bg_transparent_btn')
bgtransBtn.onclick = () => {
  Menu.changeColor('transparent', 'background')
}

const fzInput = document.querySelector('.fz_input')
fzInput.oninput = () => {
  Menu.changeFz(fzInput.value)
}

document.onkeydown = (e) => {
  const { key } = e

  if (e.altKey && key == 'x') {
    e.preventDefault()
    ContextFuncs.delEl()
    allApp()
  }

  if (e.altKey && key == 'w') {
    e.preventDefault()
    ContextFuncs.setAsWallpaper()
  }

  // if (e.altKey && (key == 'w' || key == 'x')) {
  //   ContextFuncs.removeAsWallpaper()
  // }

  if (e.altKey && key == 'f') {
    e.preventDefault()
    ContextFuncs.fill()
  }
}

const editAddTextBtn = document.querySelector('.edit_add_btn_text')
editAddTextBtn.onclick = () => {
  HTML.editMoving('text', `<textarea>Add text</textarea>`, {
    width: appData.newElSize,
    height: appData.newElSize,
  })
  allApp()
}

const txtStyleBtns = document.querySelectorAll('.text_style_btns .btn')
for (let i = 0; i < txtStyleBtns.length; i++) {
  txtStyleBtns[i].onclick = () => {
    const txtarea = document.querySelector('.edit_moving.active textarea')
    const style = txtStyleBtns[i].getAttribute('style')

    Elements.toggleStyle(txtarea, style)
    Check.textBtns()
  }
}

const searchBtn = document.querySelector('.photo_search_btn')

searchBtn.onclick = async () => {
  const APIRes = await Menu.searchPhoto()
  const photos = APIRes.hits

  HTML.searchPhoto(photos)
  allApp()
}

const editItem = document.querySelector('.edit_item')

const dloadBtn = document.querySelector('.download_btn')
dloadBtn.onclick = async () => {
  const editEls = document.querySelectorAll('.edit_moving.active')
  Menu.prepareToScreenshot(false, editEls)

  const screenURL = await Get.screenshot(editItem, { bg: '#ffffff' })
  Elements.takeScreen(screenURL)

  Menu.prepareToScreenshot(true, editEls)
}

function allApp() {
  const editMoveEls = document.querySelectorAll('.edit_moving_bg')
  const moveTxts = document.querySelectorAll('.edit_con textarea')
  const editEls = document.querySelectorAll('.edit_moving')

  for (let i = 0; i < editEls.length; i++) {
    editEls[i].onmousedown = () => {
      if (editEls[i].classList.contains('active')) {
        EditArea.txtareaCheck()
        return
      }

      EditArea.elsIndex(editEls[i])
      EditArea.elsTxtBtnsCheck(editEls[i])

      const removeEls = document.querySelectorAll('.edit_moving.active')
      for (let j = 0; j < removeEls.length; j++) {
        removeEls[j].classList.remove('active')
      }

      editEls[i].classList.add('active')
      Check.rotateChilds(editEls[i].querySelector('.edit_moving_item'))
      Check.backgroundChilds()
      EditArea.txtareaCheck()
    }
    editEls[i].oncontextmenu = () => {
      if (editEls[i].classList.contains('active')) {
        EditArea.txtareaCheck()
        return
      }

      EditArea.elsIndex(editEls[i])
      EditArea.elsTxtBtnsCheck(editEls[i])

      const removeEls = document.querySelectorAll('.edit_moving.active')
      for (let j = 0; j < removeEls.length; j++) {
        removeEls[j].classList.remove('active')
      }

      editEls[i].classList.add('active')
      Check.rotateChilds(editEls[i].querySelector('.edit_moving_item'))
      Check.backgroundChilds()
      EditArea.txtareaCheck()
    }
  }

  for (let i = 0; i < moveTxts.length; i++) {
    moveTxts[i].onmousedown = (d) => {
      const editEl = moveTxts[i].closest('.edit_moving')
      appData.move = true

      const data = Elements.getData(editEl)

      window.onmousemove = (m) => {
        if (appData.move) {
          const pos = Move.move(d, m, data)

          editEl.style.left = `${pos.x}%`
          editEl.style.top = `${pos.y}%`
        }
      }
    }
  }

  for (let i = 0; i < editMoveEls.length; i++) {
    editMoveEls[i].onmousedown = (d) => {
      const editEl = editMoveEls[i].closest('.edit_moving')
      appData.move = true

      const data = Elements.getData(editEl)

      window.onmousemove = (m) => {
        if (appData.move) {
          const pos = Move.move(d, m, data)

          editEl.style.left = `${pos.x}%`
          editEl.style.top = `${pos.y}%`
        }
      }
    }

    const editMenuItem = document.querySelector('.edit_moving_menu_item')
    editMoveEls[i].oncontextmenu = () => {
      editMenuItem.closest('.context_menu_con').classList.remove('hide')
    }
  }

  const editLines = document.querySelectorAll('.edit_moving_line')

  for (let i = 0; i < editLines.length; i++) {
    editLines[i].ondblclick = () => {
      const editEl = document.querySelector('.edit_moving.active')

      if (editLines[i].hasAttribute('width')) {
        editEl.style.left = `0`
        editEl.style.width = `100%`
      }

      if (editLines[i].hasAttribute('height')) {
        editEl.style.top = `0`
        editEl.style.height = `100%`
      }
    }

    editLines[i].onmousedown = (d) => {
      const editEl = document.querySelector('.edit_moving.active')
      const { index } = Elements.getData(editLines[i])

      appData.move = true
      const data = Elements.getData(editEl)

      window.onmousemove = (m) => {
        if (appData.move) {
          const { width, height, left, top } = Move.resizeLine(
            d,
            m,
            index,
            data,
            editLines[i]
          )

          editEl.style.width = `${width}%`
          editEl.style.height = `${height}%`
          editEl.style.left = `${left}%`
          editEl.style.top = `${top}%`
        }
      }
    }
  }

  const editPoints = document.querySelectorAll('.edit_moving_point')

  for (let i = 0; i < editPoints.length; i++) {
    editPoints[i].onmousedown = (d) => {
      const editEl = document.querySelector('.edit_moving.active')
      const { index } = Elements.getData(editPoints[i])

      appData.move = true
      const data = Elements.getData(editEl)

      window.onmousemove = (m) => {
        if (appData.move) {
          const { width, height, left, top } = Move.resizePoint(
            d,
            m,
            index,
            data
          )

          editEl.style.width = `${width}%`
          editEl.style.height = `${height}%`
          editEl.style.left = `${left}%`
          editEl.style.top = `${top}%`
        }
      }
    }
  }

  const shapes = document.querySelectorAll('.shape_area > div')
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].onclick = () => {
      const editEl = document.querySelector('.edit_moving.active')
      const style = shapes[i].querySelector('.shape_item').getAttribute('style')

      if (!editEl) {
        HTML.editMoving('shape', style, {
          width: appData.newElSize,
          height: appData.newElSize,
        })
        allApp()
      }
      if (editEl) {
        const els = editEl.querySelector('.edit_moving_item').children
        if (els.length > 0) {
          for (let i = 0; i < els.length; i++) {
            Elements.setStyle(els[i], style, ['background-color'])
          }
        }
      }
    }
  }

  const searchPhotoBtns = document.querySelectorAll('.search_photo_item')
  for (let i = 0; i < searchPhotoBtns.length; i++) {
    searchPhotoBtns[i].onclick = () => {
      const img = searchPhotoBtns[i].querySelector('img')
      const photo = {
        url: img.src,
        sizeClass: Photo.getSizeClass(img),
        width: Elements.getData(img).width,
        height: Elements.getData(img).height,
      }

      const size = { w: photo.width, h: photo.height }
      const maxLet = photo.sizeClass.split('max_')[1][0]
      const maxSize = size[maxLet]
      const p = maxSize / appData.newElSize

      const width = size.w / p
      const height = size.h / p

      HTML.editMoving('photo', photo, { width: width, height: height })
      allApp()
    }
  }
}
