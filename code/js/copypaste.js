import * as Msg from './msg.js'

function copy(str) {
  navigator.clipboard
    .writeText(`${str}`)
    .then(() => {
      Msg.show('Copied', 'success')
    })
    .catch(() => {
      Msg.show(`Couldn't copy the ${str}`, 'error')
    })
}

function paste(el) {
  navigator.clipboard.readText().then((str) => {
    el.innerHTML += str

    return str
  })
}

async function getText() {
  const txt = await navigator.clipboard.readText()
  return txt
}

export { copy, paste, getText }
