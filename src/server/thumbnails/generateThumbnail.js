const sharp = require('sharp')

module.exports = async (page, html) => {

  await page.setViewport({width: 960, height: 500})
  await page.setContent(html)
  await page.waitFor(5000)

  const buffer = await page.screenshot()
  await page.close()

  return sharp(buffer)
    .resize(230, 120)
    .toBuffer()
}
