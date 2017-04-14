/**
 * Created by shinan on 2017/4/13.
 */
const path = require('path')
const fs = require('fs')
const IS_PRODUCTION = process.env.NODE_ENV === 'production'
const IS_TEST = process.env.NODE_ENV === 'test'
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

var manifestJson = null

const getCorrectPath = ({cdn, assetName}) => {
  if (IS_DEVELOPMENT) {
    return `/assets/${assetName}`
  }

  if (!this.json) {
    var json = fs.readFileSync(path.join(__dirname, '../release/js/manifest.json'))
    manifestJson = JSON.parse(json)
  }

  if (IS_TEST) {
    let realAssetName = manifestJson[assetName]
    return `/release/js/${realAssetName}`
  }

  if (IS_PRODUCTION) {
    let realAssetName = manifestJson[assetName]
    return `${cdn}/${realAssetName}`
  }
}

module.exports = ({cdn}) => (req, res, next) => {
  function url(assetName) {
    return getCorrectPath({cdn, assetName})
  }

  req.app.locals.url = url

  next()
}