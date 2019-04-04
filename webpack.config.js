const path = require('path');

module.exports = {
  entry: './src/assets/js/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    inline: true,
    hot: true,
    open: true,
    compress: true,
    port: 9000
  }
};
