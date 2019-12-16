const { test, input } = require('../inputs/d08.txt')

const stream = input
const WIDTH = 25
const HEIGHT = 6
// const stream = test
// const WIDTH = 2
// const HEIGHT = 2

const SIZE = WIDTH * HEIGHT

const layers = []

function minimalZeroLayer() {
  let minZeros = { count: SIZE + 1, index: -1 }

  layers.forEach((layer, index) => {
    let zeros = 0

    layer.forEach(digit => {
      if (digit === 0) {
        zeros += 1
      }
    })

    if (minZeros.count > zeros) {
      minZeros = { count: zeros, index }
    }
  })

  return minZeros
}

let layer = []

for (let i = 0; i < stream.length; i += 1) {
  const digit = parseInt(stream.charAt(i), 10)

  layer.push(digit)

  if (layer.length === SIZE) {
    layers.push(layer)
    layer = []
  }
}

function multiplyOnesAndTwosInMinimalZeroLayer() {
  const minZeroLayer = minimalZeroLayer()

  let ones = 0
  let twos = 0

  layers[minZeroLayer.index].forEach(digit => {
    if (digit === 1) {
      ones += 1
    }

    if (digit === 2) {
      twos += 1
    }
  })

  return ones * twos
}

console.log('Layer with minimal zeros result', multiplyOnesAndTwosInMinimalZeroLayer())

function getVisibleImage() {
  const image = []

  for (let i = 0; i < SIZE; i += 1) {
    for (let layerIndex = 0; layerIndex < layers.length; layerIndex += 1) {
      const pixel = layers[layerIndex][i]

      if (pixel === 2) {
        continue
      }

      if (pixel === 1 || pixel === 0) {
        image.push(pixel)
        break
      }
    }
  }

  return image
}

const image = getVisibleImage()

const regex = new RegExp(`.{1,${WIDTH}}`, 'g')

const splitImage = image
  .join('')
  .replace(/0/g, ' ')
  .match(regex)

console.log(splitImage)
