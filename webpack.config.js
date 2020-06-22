var path = require('path');
var webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const env = process.env.NODE_ENV  || 'development';

let config = {
    mode: env,
    entry: {
        vendor: 'babel-polyfill', 
        globalJs: ['./src/global.js'],
        index: './src/pages/index/index.js', 
        works: './src/pages/works/index.js', 
        projects: './src/pages/projects/index.js', 
        join: './src/pages/join/index.js', 
        about: './src/pages/about/index.js', 
        contact: './src/pages/contact/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './assets/[name].[hash].bundle.js',
    },
    module: {
        rules: [{
            test: /\.less|\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader?name=/static/[name].[hash].[ext]'
                },
                // {
                //     loader: require.resolve('px2rem-loader'),
                //     options: {
                //         remUni: 75,
                //         remPrecision: 8
                //     }
                // }, 
                {
                    loader: 'less-loader?name=/static/[name].[hash].[ext]', options: {
                        strictMath: true,
                        noIeCompat: true
                    }
                }, 
                {
                    loader: 'postcss-loader?name=/static/[name].[hash].[ext]',
                    options: {
                        plugins: () => [require('autoprefixer')]
                    }
                }
            ]
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [
                {
                    loader: 'img-loader',
                    options: {
                        name: './static/[name].[hash].[ext]',
                    }
                },
                {
                    loader: 'file-loader',
                    options: {
                        name: './static/[name].[hash].[ext]',
                    }
                }
            ],
            
        },
        {
            test: /\.m?js$/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
        },
        {
            test: /\.ejs$/,
            loader: 'ejs-loader?variable=data',
        },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "./[name].[hash].css",
            chunkFilename: "[id].[hash].css"
        }),
        new CleanWebpackPlugin(path.resolve(__dirname, 'dist')),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new UglifyJsPlugin({
            test: /\.js($|\?)/i,
            sourceMap: true,
            uglifyOptions: {
              mangle: {
                keep_fnames: true,
              },
              compress: {
                warnings: false,
              },
              output: {
                beautify: false,
              },
            },
          }),
    ],
    resolve: {
        alias: {
            '@': path.resolve('./src/'),
            images: path.resolve('./src/images/')
        }
    }
};

['index', 'works', 'projects', 'about', 'join', 'contact'].forEach(page => {
    config.plugins.push(new HtmlWebpackPlugin({
        chunks: ['vendor', 'globalJs', page],
        template: `./src/pages/${page}/index.ejs`,
        filename: `${page}.html`,
    }))
});

process.env.ANALYSIS == 'true' && config.plugins.push(new BundleAnalyzerPlugin());

module.exports = config;