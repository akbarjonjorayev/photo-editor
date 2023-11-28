import * as Data from './data.js'
import * as GetEl from './htmlEl.js'

const appData = Data.getData()

function shapes() {
  const result = []
  const shapesArea = document.querySelector('.shape_area')
  const shapes = appData.shapes.shape

  for (let i = 0; i < shapes.length; i++) {
    const r = GetEl.shapes(shapes[i], appData.shapes.style).trim()
    result.push(r)
  }

  shapesArea.insertAdjacentHTML('beforeend', result.join(''))
}

const editArea = document.querySelector('.edit_area')

function editMoving(option, val, { width, height }) {
  const result = []

  if (option == 'photo') {
    const html = `<div class="edit_moving_item" data-rotate='{"x":0,"y":0,"z":0}'>
                    <div class="edit_moving_bg_color"></div>
                    <img src="${val.url}" class="${val.sizeClass}" data-size-class="${val.sizeClass}" />
                  </div>`
    const r = GetEl.editMoving(html, { width, height }).trim()
    result.push(r)
  }

  if (option == 'shape') {
    const html = `<div class="edit_moving_item" data-rotate='{"x":0,"y":0,"z":0}'>
                    <div class="edit_moving_bg_color" style="background-color: #000;"></div>
                    <div class="shape" style="${val}"></div>
                  </div>`
    const r = GetEl.editMoving(html, { width, height }).trim()
    result.push(r)
  }

  if (option == 'text') {
    const html = `<div class="edit_moving_item" data-rotate='{"x":0,"y":0,"z":0}'>
                    <div class="edit_moving_bg_color"></div>
                    ${val}
                  </div>`
    const r = GetEl.editMoving(html, { width, height }).trim()
    result.push(r)
  }

  editArea.insertAdjacentHTML('beforeend', result.join(''))

  const removeChilds = editArea.querySelectorAll('.edit_moving.active')
  for (let i = 0; i < removeChilds.length; i++) {
    removeChilds[i].classList.remove('active')
  }

  const child = editArea.lastChild
  child.style.zIndex = appData.maxIndex
  child.classList.add('active')
}

const searchPhotoArea = document.querySelector('.search_photo_area')

function searchPhoto(imgs) {
  const result = []

  for (let i = 0; i < imgs.length; i++) {
    const r = GetEl.searchPhoto(imgs[i].largeImageURL).trim()
    result.push(r)
  }

  searchPhotoArea.innerHTML = ''
  searchPhotoArea.insertAdjacentHTML('beforeend', result.join(''))
}

export { shapes, editMoving, searchPhoto }
