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
    fixed: result.toFixed(),
  }
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

export { atttribute, text, percent, CSSProperties }
