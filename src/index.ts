import path from 'path'
import shelljs from 'shelljs'

shelljs.exec(
  'git log -1 --pretty=format:"%cD" ' + path.join(process.cwd(), './src')
)
