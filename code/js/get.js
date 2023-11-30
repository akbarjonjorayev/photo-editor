import * as Msg from './msg.js'

function atttribute(el, att) {
  if (!el) return false

  const eAtt = el.getAttribute(att)
  const pAtt = JSON.parse(eAtt)

  return {
    att: eAtt,
    parse: pAtt,
  }
}

function text(txt) {
  return {
    originalText: txt,
    lowerCase: txt.toLowerCase(),
    upperCase: txt.toUpperCase(),
    characterCount: txt.length,
    words: txt.split(/\s+/).filter((word) => word.length > 0),
    trimmedText: txt.trim(),
    reversedText: txt.split('').reverse().join(''),
    hasNumbers: /\d/.test(txt),
  }
}

function percent(num1, num2) {
  if (num2 == 0) return false
  const result = (num1 / num2) * 100

  return {
    txt: `${result}%`,
    raw: result,
    fixed: number(result).fixed,
  }
}

function number(num, fixNum = 0) {
  return {
    originalNum: num,
    fixed: num.toFixed(fixNum),
  }
}

function allNumbers(txt) {
  const matches = txt.match(/\d+/g)
  return matches ? matches.map(Number) : []
}

function CSSProperties(cssString) {
  const styleDeclarations = cssString.split(';')

  const { property, value } = styleDeclarations.reduce(
    function (acc, declaration) {
      const parts = declaration.split(':')

      if (parts.length == 2) {
        acc.property.push(parts[0].trim())
        acc.value.push(parts[1].trim())
      }

      return acc
    },
    { property: [], value: [] }
  )

  return { property, value }
}

function colorFromRGB(str) {
  const rgbValues = allNumbers(str)

  if (rgbValues.length !== 3) {
    Msg.show('Invalid RGB string', 'error')
    return
  }

  const [r, g, b] = rgbValues

  const validR = Math.min(255, Math.max(0, r))
  const validG = Math.min(255, Math.max(0, g))
  const validB = Math.min(255, Math.max(0, b))

  const hexR = validR.toString(16).padStart(2, '0')
  const hexG = validG.toString(16).padStart(2, '0')
  const hexB = validB.toString(16).padStart(2, '0')

  return `#${hexR}${hexG}${hexB}`
}

export { atttribute, text, percent, number, allNumbers, CSSProperties, colorFromRGB }
