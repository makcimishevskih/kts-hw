import path from 'path';

import { fileURLToPath } from 'url';

import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import TsCheckerPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const srcPath = path.resolve(__dirname, 'src');
const buildPath = path.resolve(__dirname, 'dist');
const publicPath = path.resolve(__dirname, 'public');

const isProd = process.env.NODE_ENV === 'production';

export default {
  devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
  target: !isProd ? 'web' : 'browserslist',
  entry: path.join(srcPath, 'main.tsx'),
  output: {
    path: buildPath,
    filename: 'bundle.js',
  },
  module: {
    rules: getSettingsForLoaders(isProd),
  },
  plugins: getSettingsForPlugins(isProd),
  devServer: getSettingsForDevServer(),
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
    alias: getSettingsForAliases(srcPath),
  },
};

// styles
function getSettingsForStyles(isProd, withModule = false) {
  return [
    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
    !withModule
      ? 'css-loader'
      : {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]',
            },
          },
        },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: ['autoprefixer'],
        },
      },
    },
    'sass-loader',
  ];
}

// loaders
export function getSettingsForLoaders(isProd) {
  const babelLoader = {
    test: /\.[tj]sx?$/,
    use: 'babel-loader',
  };

  const assetsLoader = {
    test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
    type: 'asset',
    parser: {
      dataUrlCondition: {
        maxSize: 10 * 1024,
      },
    },
  };

  const scssLoader = {
    test: /\.s?css$/,
    use: getSettingsForStyles(isProd),
    exclude: /\.module\.s?[ac]ss$/,
  };

  const scssLoaderModule = {
    test: /\.module.s?css$/,
    use: getSettingsForStyles(isProd, true),
  };

  const jsonLoader = {
    test: /\.json$/,
    loader: 'json-loader',
    type: 'javascript/auto',
  };

  return [babelLoader, scssLoader, scssLoaderModule, assetsLoader, jsonLoader];
}

// plugins
export function getSettingsForPlugins(isProd) {
  return [
    new HtmlWebpackPlugin({
      template: path.join(publicPath, 'index.html'),
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    isProd &&
      new MiniCssExtractPlugin({
        options: {
          filename: '[name]-[hash].css',
        },
      }),
    new TsCheckerPlugin(),
    new Dotenv(),
  ].filter(Boolean);
}

// aliases
export function getSettingsForAliases() {
  return {
    App: path.join(srcPath, 'App'),
    hooks: path.join(srcPath, 'hooks'),
    utils: path.join(srcPath, 'utils'),
    store: path.join(srcPath, 'store'),
    config: path.join(srcPath, 'config'),
    assets: path.join(srcPath, 'assets'),
    styles: path.join(srcPath, 'styles'),
    routes: path.join(srcPath, 'routes'),
    entities: path.join(srcPath, 'entities'),
    pages: path.join(srcPath, 'App', 'pages'),
    providers: path.join(srcPath, 'providers'),
    components: path.join(srcPath, 'components'),
  };
}
// devServer
export function getSettingsForDevServer() {
  return {
    host: '127.0.0.1',
    port: 9000,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: true,
    historyApiFallback: true,
  };
}
