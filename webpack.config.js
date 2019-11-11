const pkg = require('./package.json')
const path = require('path')
const MinifyPlugin = require('babel-minify-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

// Which browser to build for (e.g. 'firefox', 'chrome')
let browser = 'firefox'

module.exports = env => {
  browser = env.browser
  return {
    mode: 'production',
    entry: './serato-firewall-header.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'serato-firewall-header.bundle.js',
      library: 'Serato',
      libraryTarget: 'var'
    },
    plugins: [
      new MinifyPlugin(),
      new CopyWebpackPlugin(
        [
          {
            from: "./manifests/manifest.json",
            to: "../manifest.json", // Is there a better way to do this? Use entry keys to set the output path?
            transform(content) {
              return modifyManifest(content)
            }
          }
        ]
      )
    ],
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        }
      ]
    },
    devServer: {
      contentBase: './dist'
    }
  }
}

function modifyManifest(buffer) {
  const manifest = JSON.parse(buffer.toString())

  // This way, we only have to update the version in one place (package.json)
  manifest.version = pkg.version

  // Remove the Firefox-specific 'application' key if not building for Firefox
  if (browser !== 'firefox') {
    delete manifest['applications']
  }

  return JSON.stringify(manifest, null, 2)
}