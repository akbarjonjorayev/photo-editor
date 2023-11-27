import * as ShowHideClass from './showHide.js'

const msg = document.querySelector('.msg')
const msgClass = 'msg df_ai_jc_ce'

function show(type, text, time = 2) {
  msg.querySelector('.msg_txt').innerText = text

  msg.setAttribute('class', [msgClass, type].join(' '))
  ShowHideClass.showEl(msg)

  setTimeout(() => {
    ShowHideClass.hideEl(msg)
  }, time * 1e3)
}

export { show }
