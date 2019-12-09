const { task } = require('../inputs/d02.txt')

function runProgram(baseInput, noun, verb) {
  const input = [...baseInput]

  input[1] = noun
  input[2] = verb

  for (let i = 0; i <= input.length; i += 4) {
    const optCode = input[i]
    const operand1Index = input[i + 1]
    const operand2Index = input[i + 2]
    const destinationIndex = input[i + 3]

    if (optCode === 99) {
      break
    }

    const operand1 = input[operand1Index]
    const operand2 = input[operand2Index]

    input[destinationIndex] = optCode === 1 ? operand1 + operand2 : operand1 * operand2
  }

  return input[0]
}

const task1Output = runProgram(task, 12, 2)

console.log('Output is =', task1Output)

const EXPECTED_OUTPUT = 19690720

function findInput(input, expectedOutput = EXPECTED_OUTPUT) {
  for (let i = 0; i <= 99; i += 1) {
    for (let j = 0; j <= 99; j += 1) {
      const output = runProgram(input, i, j)

      if (output === expectedOutput) {
        return {
          noun: i,
          verb: j,
        }
      }
    }
  }
}

const { noun, verb } = findInput(task)

const task2Result = 100 * noun + verb

console.log('Task 2 result is=', task2Result)
