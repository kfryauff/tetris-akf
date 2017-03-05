// webpack.config.js
module.exports = {
  entry: './client/js/app.js',
  output: {
    filename: './client/js/bundle.js'       
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { 
            loader: "sass-loader", 
            options: { includePaths: ["client/css"] }, 
          },
        ]
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.json'] 
  },
};