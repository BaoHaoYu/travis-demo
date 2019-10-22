import fs from 'fs'
import gulp from 'gulp'
import cleanCss from 'gulp-clean-css'
import debug from 'gulp-debug'
import imagemin from 'gulp-imagemin'
import spritesmith, { ISpritesStream } from 'gulp.spritesmith'
import merge from 'merge-stream'
import nunjucks from 'nunjucks'
import path from 'path'
import buffer from 'vinyl-buffer'
import config from '../../config-ts'
import { getGitLastLogTime } from '../../util'
// 输出目录
const out = path.join(config.rootPath, 'public/images/sprites')
const iconPath = 'src/icon'
// 图表目录
const src = [
  path.join(config.rootPath, iconPath, '*.png'),
  path.join(config.rootPath, iconPath, '**/*.png'),
]

/**
 * 雪碧图
 */
const sprite: gulp.TaskFunction = () => {
  // 生成随机字符
  const hash = getGitLastLogTime(path.join(config.rootPath, iconPath)).format(
    'YYYYMMDDHHmmss'
  )

  const imgName = config.addHashToFile ? `sprite.${hash}.png` : 'sprite.png'
  const spriteData = gulp.src(src).pipe(
    spritesmith({
      imgName,
      cssName: config.addHashToFile ? `sprite.css` : 'sprite.css',
      url: config.loadSpritePath,
      cssTemplate: (spritesData) => {
        // 使用twig模板
        const twig = fs.readFileSync(
          './gulp-ts/cssTemplate/spriteCssTemplate.twig',
          'utf-8'
        )
        return nunjucks.renderString(twig, {
          sprites: spritesData.sprites,
          url: './' + imgName,
        })
      },
    })
  ) as ISpritesStream

  const imgStream = spriteData.img
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(debug({ title: '输出图片:' }))
    .pipe(gulp.dest(out))

  const cssStream = spriteData.css
    .pipe(debug({ title: '编译css:' }))
    .pipe(cleanCss({ compatibility: 'ie8' }))
    .pipe(gulp.dest(out))

  return merge(imgStream, cssStream)
}

export default sprite
