const fs = require('fs')
const path = require('path')

const readline = require('readline')

module.exports = {
  getFileReader: file => {
    return readline.createInterface({
      input: fs.createReadStream(path.resolve(__dirname, '../inputs', file)),
    })
  },
}
