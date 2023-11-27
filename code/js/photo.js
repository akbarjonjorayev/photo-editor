import * as Elements from './elements.js'

function getURL(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      res(e.target.result)
    }

    reader.onerror = (err) => {
      rej(err)
    }

    reader.readAsDataURL(file)
  })
}

function getImg(file) {
  return new Promise((res, rej) => {
    const img = new Image()

    img.onload = () => {
      res(img)
    }

    img.onerror = (err) => {
      rej(err)
    }

    img.src = URL.createObjectURL(file)
  })
}

function getName(fName) {
  const names = fName.split('.')
  names.pop()
  return names.join('.')
}

async function getPhoto(input) {
  if (!input.files[0]) return
  const file = input.files[0]
  const img = await getImg(file)

  const data = {
    url: await getURL(file),
    img: img,
    name: getName(file.name),
    date: file.lastModified,
    size: file.size,
    type: file.type,
    sizeClass: getSizeClass(img),
  }

  return data
}

const editCon = document.querySelector('.edit_con')
function getSizeClass(img) {
  const photo = [img.width, img.height]

  if (Math.max(...photo) == Math.min(...photo)) {
    const edit = Elements.getData(editCon)
    const editArr = [edit.width, edit.height]
    const photoMaxSize = Math.min(...editArr) == editArr[0] ? 'width' : 'height'

    return `max_${photoMaxSize}`
  }

  const photoMaxSize = Math.max(...photo) == photo[0] ? 'width' : 'height'

  return `max_${photoMaxSize}`
}

export { getPhoto, getSizeClass }
