import execa from 'execa'
import moment from 'moment'

// 获得文件夹或者文件最后修改时间
export function getGitLastLogTime(filePath: string) {
  const msg = execa.sync('git log -1 --pretty=format:"%cD" ' + filePath)
  return moment(msg.stdout)
}
