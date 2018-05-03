const webpack = require('webpack')

module.exports = {
  webpack: cfg => {
    cfg.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NOW_URL': JSON.stringify(process.env.NOW_URL)
      })
    )

    return cfg
  }
}
