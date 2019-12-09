const { getFileReader } = require('./helpers')

const lineReader = getFileReader('d01.txt')

let mass = 0
let massWithFuel = 0

function getModuleFuelRequirement(moduleMass) {
  return Math.floor(parseInt(moduleMass, 10) / 3) - 2
}

function getModuleExtraFuel(moduleFuel) {
  let extraFuelTotalMass = 0
  let fuelExtraMass = getModuleFuelRequirement(moduleFuel)

  while (fuelExtraMass > 0) {
    extraFuelTotalMass += fuelExtraMass

    fuelExtraMass = getModuleFuelRequirement(fuelExtraMass)
  }

  return extraFuelTotalMass
}

lineReader.on('line', moduleMass => {
  const currentModuleMass = getModuleFuelRequirement(moduleMass)
  const currentModuleExtraFuel = getModuleExtraFuel(currentModuleMass)

  mass += currentModuleMass
  massWithFuel += currentModuleMass + currentModuleExtraFuel
})

lineReader.on('close', () => {
  console.log('Mass required =', mass)

  console.log('Mass required (with fuel) =', massWithFuel)
})
