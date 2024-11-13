const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'packages/app/src/index.tsx'), // Use TypeScript entry point
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    scriptType: 'text/javascript'
  },
  mode: 'development',
  devServer: {
    port: 3000,
    open: true,
  },
  resolve: {
    // Automatically resolve these extensions
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Matches .ts and .tsx files
        use: [
            {
              loader: 'ts-loader',
              options: {
                compilerOptions: {
                  noEmit: false // Ensure TypeScript emits output files
                }
              }
            }
          ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // Matches .css files
        use: ['style-loader', 'css-loader'], // CSS loaders
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/i, // Matches image files
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]', // Preserve file name and path
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'monorepomainapp',
      filename: 'remoteEntry.js',
      remotes: {
        // Make sure this URL matches where `app1` is served
        app1: 'app1@http://100.64.100.6:8080/assets/remoteEntry.js',
      },
      shared: {
        react: {
          singleton: true,
          eager: false,
          requiredVersion: '^18.3.1',
        },
        'react-dom': {
          singleton: true,
          eager: false,
          requiredVersion: '^18.3.1',
        },
      },
    }),
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'packages/app/public/index.html'),
        inject: true,
        publicPath: "/"
    }),
  ],
  optimization: {
    splitChunks: false, // Disable chunk splitting
    minimize: false,
    runtimeChunk: false
  },
};
