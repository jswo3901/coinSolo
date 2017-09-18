'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const paths = require('./paths');
const getClientEnvironment = require('./env');

// @CRA public path
const publicPath = paths.servedPath;
// @CRA 클라이언트 사이드 라우팅 사용하지 않을 경우를 위해
const shouldUseRelativeAssetPaths = publicPath === './';
// @CRA 소스맵은 너무 용량이 크니까 배포 환경에서는 제외
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';
// @CRA publicURL 환경변수 사용
const publicUrl = publicPath.slice(0, -1);
const env = getClientEnvironment(publicUrl);

// @CRA 안전합니다
if (env.stringified['process.env'].NODE_ENV !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

// @CRA 두번 이상 사용되므로 반드시 여기에 작성해야 한다
const cssFilename = 'static/css/[name].[contenthash:8].css';

// @CRA 빌드 시 폴더구조 갖추려면
const extractTextPluginOptions = shouldUseRelativeAssetPaths
  ?
    { publicPath: Array(cssFilename.split('/').length).join('../') }
  : {};

// @CRA 컴파일은 느리겠지만 작게만들기 위함이에요
module.exports = {
  // @CRA 에러있으면 바로 멈추게
  bail: true,
  // @CRA 맵파일 있으면 좋긴한데 없앨 수 있습니다
  devtool: shouldUseSourceMap ? 'source-map' : false,
  // @CRA 폴리필 로드
  entry: [require.resolve('./polyfills'), paths.appIndexJs],
  output: {
    // @CRA 빌드폴더 경로
    path: paths.appBuild,
    // @CRA JS파일 이름 생성
    // @CRA CRA는 코드분할을 지원하고 있지는 않지만 웹팩은 가능하긴 합니다
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath: publicPath,
    // @CRA 소스맵 시작점
    devtoolModuleFilenameTemplate: info =>
      path
        .relative(paths.appSrc, info.absoluteResourcePath)
        .replace(/\\/g, '/'),
  },
  resolve: {
    // @CRA 노드모듈 찾기
    modules: ['node_modules', paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
  // @CRA JSX지원 확장자
    extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
      // @CRA react-native 지원
      'react-native': 'react-native-web',
    },
    plugins: [
      // @CRA 소스 밖에 쓸데없는 파일 로드되지 않게
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [
      // @CRA 표준이 아니라서 잠시 막아놨음
      // @CRA { parser: { requireEnsure: false } },
      // @CRA eslint
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),
              
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: paths.appSrc,
      },
      {
        // @CRA 알맞는 로더 찾기
        oneOf: [
          // @CRA url 로더
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          // @CRA 바벨링
          {
            test: /\.(js|jsx)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              
              compact: true,
            },
          },
          // @CRA 배포환경에서는 css파일 분리되니까 JS에 삽입해서 넣는것 추천
          {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
              Object.assign(
                {
                  fallback: require.resolve('style-loader'),
                  use: [
                    {
                      loader: require.resolve('css-loader'),
                      options: {
                        importLoaders: 1,
                        minimize: true,
                        sourceMap: shouldUseSourceMap,
                      },
                    },
                    {
                      loader: require.resolve('postcss-loader'),
                      options: {
                        // @CRA 외부 css삽입 위해
                        ident: 'postcss',
                        plugins: () => [
                          require('postcss-flexbugs-fixes'),
                          autoprefixer({
                            browsers: [
                              '>1%',
                              'last 4 versions',
                              'Firefox ESR',
                              'not ie < 9', // @CRA React doesn't support IE8 anyway
                            ],
                            flexbox: 'no-2009',
                          }),
                        ],
                      },
                    },
                  ],
                },
                extractTextPluginOptions
              )
            ),
            // @CRA 플러그인에 `new ExtractTextPlugin()` 가 없으면 작동 안합니다
          },
          
          {
            loader: require.resolve('file-loader'),
          // @CRA파일로더
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          // @CRA 로더 추가하려면 파일로더 위에 추가하세요 여기아니에요
        ],
      },
    ],
  },
  plugins: [
    // @CRA 환경변수
    new InterpolateHtmlPlugin(env.raw),
    // @CRA html에 스크립트 추가
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    // @CRA 환경변수
    new webpack.DefinePlugin(env.stringified),
    // @CRA 코드 경량화
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        comparisons: false,
      },
      output: {
        comments: false,
        ascii_only: true,
      },
      sourceMap: shouldUseSourceMap,
    }),
    // @CRA 로더스에 ExtractTextPlugin.extract(..) 없으면 작동 안합니다
    new ExtractTextPlugin({
      filename: cssFilename,
    }),
    // @CRA 매니페스트 파일 생성.. 
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    // @CRA 서비스 워커 생성
    new SWPrecacheWebpackPlugin({
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          return;
        }
        if (message.indexOf('Skipping static resource') === 0) {
          return;
        }
        console.log(message);
      },
      minify: true,
      // @CRA URL 모르겠으면 index로
      navigateFallback: publicUrl + '/index.html',
      // @CRA /__ 로 시작하는 URL 무시하기
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      // @CRA 소스맵파일 프리캐싱 막기 
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
    // @CRA MOMENT.JS 사용하기 위한 설정
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  // @CRA 브라우저에서 사용 안하는 모듈들
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
};
