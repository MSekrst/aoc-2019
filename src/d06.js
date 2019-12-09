const { getFileReader } = require('./helpers')

const lineReader = getFileReader('d06.txt')

const orbitMap = {}

class Node {
  key
  children = []
  parent = null

  constructor(key, parent, children = []) {
    this.key = key
    this.parent = parent
    this.children = children
  }
}

function findCOM(orbitMap) {
  const rootKey = Object.keys(orbitMap).find(nodeKey => orbitMap[nodeKey].parent === null)

  return orbitMap[rootKey]
}

function findNodeWithChild(orbitMap, searchKey) {
  const rootKey = Object.keys(orbitMap).find(nodeKey => orbitMap[nodeKey].children.includes(searchKey))

  return orbitMap[rootKey]
}

function getFullDepth(node, depth = 0) {
  const childDepths = node.children.map(childKey => getFullDepth(orbitMap[childKey], depth + 1))

  const score = depth + childDepths.reduce((sum, d) => sum + parseInt(d, 10), 0)

  return score
}

function getParentList(node) {
  if (!node.parent) {
    return ''
  }

  const parents = getParentList(orbitMap[node.parent])

  return `${node.parent}${parents ? `,${parents}` : ''}`
}

function getCommonParent(n1, n2) {
  const parentList1 = getParentList(n1).split(',')
  const parentList2 = getParentList(n2).split(',')

  for (let i = 0; i < parentList1.length; i += 1) {
    const list1Key = parentList1[i]

    for (let j = 0; j < parentList2.length; j += 1) {
      if (list1Key === parentList2[j]) {
        return orbitMap[list1Key]
      }
    }
  }
}

function distanceBetweenNodes(deeperNode, targetNode) {
  let depth = 0
  let currentNode = deeperNode

  if (currentNode.key === targetNode.key) {
    return 0
  }

  while (currentNode.key !== targetNode.key) {
    depth += 1

    currentNode = orbitMap[currentNode.parent]
  }

  return depth
}

lineReader.on('line', orbitData => {
  const [baseId, orbitId] = orbitData.split(')')

  // add parent
  if (orbitMap[baseId]) {
    orbitMap[baseId].children.push(orbitId)
  } else {
    orbitMap[baseId] = new Node(baseId, null, [orbitId])
  }

  // add child
  if (!orbitMap[orbitId]) {
    orbitMap[orbitId] = new Node(orbitId, baseId)
  } else {
    orbitMap[orbitId].parent = baseId
  }
})

lineReader.on('close', () => {
  const root = findCOM(orbitMap)

  console.log('Depth is =', getFullDepth(root))
  const you = findNodeWithChild(orbitMap, 'YOU')
  const san = findNodeWithChild(orbitMap, 'SAN')

  const parent = getCommonParent(you, san)

  const distance = distanceBetweenNodes(you, parent) + distanceBetweenNodes(san, parent)

  console.log('Distance between SAN i YOU =', distance)
})
