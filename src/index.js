const fs = require('fs-extra')
const path = require('path')
const _ = require('loadsh')
fs.writeFile(path.join(__dirname, '../ssss.txt') , _.random(1, 100))
