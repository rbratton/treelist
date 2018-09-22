const fs = require('fs')
const faker = require('faker')

const [ itemsStr, seedStr ] = process.argv.filter((_, i) => i > 1)

console.log(`itemsStr: ${itemsStr}, seed: ${seedStr}`)

let items = parseInt(itemsStr)
if (isNaN(items)) {
  console.log('First argument was not a number, defaulting to generating 10 items.')
  items = 10
}

if (seedStr) {
  const seed = parseFloat(seedStr)
  if (typeof seed === 'number') {
    console.log(`Detected seed ${seed}`)
    faker.seed(seed)
  }
}

const chooseRandom = arr => arr[Math.floor(Math.random() * arr.length)]
const chance = (chance = 5, outOf = 10) => Math.floor(Math.random() * outOf) < chance
const randomInt = (min = 0, max = 5) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const generateInteraction = (maxChildren = 5) => {
  const ixn = {
    id: faker.random.uuid(),
    type: chooseRandom(['email', 'voice']),
    start: faker.date.recent(),
    end: chance(4) ? faker.date.future(0.2) : null,
    status: chooseRandom(['In Progress', 'Done', 'Closed'])
  }

  if (chance(7)) {
    ixn.name = faker.fake('{{name.firstName}} {{name.lastName}}')
  } else {
    ixn.organisation = faker.company.companyName()
  }

  ixn.children = []
  for (let i = 0; i < randomInt(0, maxChildren); i++) {
    ixn.children.push(generateInteraction(maxChildren - 1))
  }

  return ixn
}

const ixns = []
for (let i = 0; i < items; i++) {
  ixns.push(generateInteraction())
}

console.log('Generated interactions, writing to generated.json')

fs.writeFile('./test/generated.json', JSON.stringify(ixns, null, 4), 'utf8', (err) => {
  if (err) throw err
})
