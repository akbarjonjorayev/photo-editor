import * as Data from './data.js'

const appData = Data.getData()

function loaded() {
  appData.loadTime = new Date().getTime() - appData.loadTime

  document.body.classList.add('animation')
}

function startCount() {
  const time = new Date().getTime()
  appData.loadTime = time
}

export { loaded, startCount }
