const { getFileReader } = require('./helpers')

const lineReader = getFileReader('d03.txt')

const lines = []

lineReader.on('line', line => {
  lines.push(line.split(','))
})

const defaultValues = { w1: 0, w2: 0 }

// dot key is x/y coordinate
const graphDots = []

function drawPoint(x, y, key, steps) {
  const pointId = `${x}/${y}`

  if (graphDots[pointId]) {
    graphDots[pointId][key] = steps
  } else {
    graphDots[pointId] = { ...defaultValues, [key]: steps }
  }
}

function drawLine(directions, key) {
  let x = 0
  let y = 0
  let stepCounter = 0

  directions.forEach(dir => {
    const orientation = dir[0]
    const length = parseInt(dir.substr(1), 10)

    for (let i = 1; i <= length; i += 1) {
      switch (orientation) {
        case 'R':
          x += 1
          break
        case 'L':
          x -= 1
          break
        case 'U':
          y += 1
          break
        case 'D':
          y -= 1
          break
      }

      stepCounter += 1

      drawPoint(x, y, key, stepCounter)
    }
  })
}

lineReader.on('close', () => {
  const [w1, w2] = lines

  drawLine(w1, 'w1')
  drawLine(w2, 'w2')

  let minDistance = Number.MAX_SAFE_INTEGER
  let minSteps = Number.MAX_SAFE_INTEGER

  Object.keys(graphDots).forEach(key => {
    const { w1, w2 } = graphDots[key]

    if (w1 && w2) {
      const [x, y] = key
        .split('/')
        .map(Number)
        .map(Math.abs)

      const distance = x + y
      const steps = w1 + w2

      if (minDistance > distance) {
        minDistance = distance
      }

      if (minSteps > steps) {
        minSteps = steps
      }
    }
  })

  console.log('Minimal cross =', minDistance)
  console.log('Minimal steps cross =', minSteps)
})
