import * as Msg from './msg.js'
import * as Data from './data.js'

const editArea = document.querySelector('.edit_area')

function prepareTo(taken, els) {
  if (!taken) {
    editArea.style.borderColor = 'transparent'
    editArea.style.borderRadius = '0'

    for (let i = 0; i < els.length; i++) {
      els[i].classList.remove('active')
    }
  }

  if (taken) {
    editArea.style.borderColor = 'var(--pink-dark)'
    editArea.style.borderRadius = 'var(--border-ra)'

    for (let i = 0; i < els.length; i++) {
      els[i].classList.add('active')
    }
  }
}

async function getUrl(el, { bg }) {
  Msg.show('Screenshot is being prepared', 'warning')
  const canvas = await html2canvas(el, { backgroundColor: bg })
  const imgURL = canvas.toDataURL('image/png')

  return imgURL
}

function takeScreen(url) {
  const link = document.createElement('a')

  link.href = url
  link.download = 'photo-editor.png'
  link.click()

  Msg.show('Screenshot downloaded', 'success')
}

export { prepareTo, getUrl, takeScreen }
