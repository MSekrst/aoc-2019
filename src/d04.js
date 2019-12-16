const { input } = require('../inputs/d04.txt') // 357253-892942

const [lowerBound, upperBound] = input.split('-').map(Number)

function haveSameCharacters(number) {
  const stringNumber = String(number)

  for (let i = 0; i < stringNumber.length - 1; i += 1) {
    if (stringNumber.charAt(i) === stringNumber.charAt(i + 1)) {
      return true
    }
  }

  return false
}

function haveSameCharactersExactlyTwice(number) {
  if (!haveSameCharacters(number)) {
    return false
  }

  const stringNumber = String(number)

  let sequenceLength = 1

  for (let i = 0; i < stringNumber.length - 1; i += 1) {
    if (stringNumber.charAt(i) === stringNumber.charAt(i + 1)) {
      sequenceLength += 1
    } else {
      if (sequenceLength === 2) {
        return true
      }

      sequenceLength = 1
    }
  }

  if (sequenceLength === 2) {
    return true
  }

  return false
}

function isDecreasing(number) {
  const stringNumber = String(number)

  let min = 1

  for (let i = 0; i < stringNumber.length; i += 1) {
    const digit = parseInt(stringNumber.charAt(i), 10)

    if (digit < min) {
      return true
    } else {
      min = digit
    }
  }

  return false
}

function isValidPassword(password, exactlyTwice = false) {
  if (password < 100000 || password > 999999) {
    return false
  }

  if (!(exactlyTwice ? haveSameCharactersExactlyTwice(password) : haveSameCharacters(password))) {
    return false
  }

  if (isDecreasing(password)) {
    return false
  }

  return true
}

let count1 = 0
let count2 = 0

for (let n = lowerBound; n < upperBound; n += 1) {
  if (isValidPassword(n)) {
    count1 += 1
  }

  if (isValidPassword(n, true)) {
    count2 += 1
  }
}

console.log('Valid passwords 1. =', count1)
console.log('Valid passwords 2. =', count2)
