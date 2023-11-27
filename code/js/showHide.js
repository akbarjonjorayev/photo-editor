function showHide(el) {
  const process = (atts, callBack) => {
    if (atts) {
      atts.split(',').forEach((att) => callBack(att))
    }
  }

  process(el.getAttribute('show'), show)
  process(el.getAttribute('hide'), hide)
}

function hide(elClassName) {
  const el = document.querySelector(`.${elClassName}`)
  hideEl(el)
}

function show(elClassName) {
  const el = document.querySelector(`.${elClassName}`)
  showEl(el)
}

function hideEl(el, className = 'hide') {
  if (!el.classList.contains(className)) el.classList.add(className)
}

function showEl(el, className = 'hide') {
  if (el.classList.contains(className)) el.classList.remove(className)
  focusToTexts(el)
}

function toggleEl(el) {
  el.classList.toggle('active')
  focusToTexts(el)
}

function fullHideEl(el, className = 'full_hide') {
  if (!el.classList.contains(className)) el.classList.add(className)
}

function fullShowEl(el, className = 'full_hide') {
  if (el.classList.contains(className)) el.classList.remove(className)
  focusToTexts(el)
}

function focusToTexts(el) {
  const input = el.querySelector('input') || false
  const txtarea = el.querySelector('textarea') || false

  if (input) {
    el.ontransitionend = () => {
      input.focus()
    }
    return
  }
  if (txtarea) {
    el.ontransitionend = () => {
      txtarea.focus()
    }
    return
  }
}

export {
  hide,
  show,
  hideEl,
  showEl,
  showHide,
  toggleEl,
  fullHideEl,
  fullShowEl,
}
