const {plugin:mdPlugin,Mode} = require('vite-plugin-markdown')

module.exports = {
  plugins: [mdPlugin({mode:[Mode.HTML,Mode.MARKDOWN]})]
}