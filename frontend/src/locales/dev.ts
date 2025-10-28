type Messages = Record<string, any>

const maskPreservingPlaceholders = (text: string, char: string): string => {
  let result = ''
  let i = 0
  while (i < text.length) {
    if (text[i] === '{') {
      const end = text.indexOf('}', i)
      if (end !== -1) {
        result += text.slice(i, end + 1)
        i = end + 1
        continue
      }
    }
    result += char
    i += 1
  }
  return result
}

const traverseAndMask = (obj: Messages, char: string): Messages => {
  const output: Messages = Array.isArray(obj) ? [] : {}
  for (const key of Object.keys(obj)) {
    const value = obj[key]
    if (typeof value === 'string') {
      output[key] = maskPreservingPlaceholders(value, char)
    } else if (value && typeof value === 'object') {
      output[key] = traverseAndMask(value, char)
    } else {
      output[key] = value
    }
  }
  return output
}

const createDevLocale = (base: Messages, char: string = '-'): Messages => {
  return traverseAndMask(base, char)
}

export default createDevLocale