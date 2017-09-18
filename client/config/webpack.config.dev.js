'use strict';

const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');

// @CRA 앱 제공 URL
const publicPath = '/';

// @CRA `publicPath`
const publicUrl = '';

// @CRA 환경변수 사용
const env = getClientEnvironment(publicUrl);


module.exports = {
  // @CRA 소스맵(변경가능)
  devtool: 'cheap-module-source-map',
  entry: [
    // @CRA 기본 폴리필 제공(바벨)
    require.resolve('./polyfills'),
    // @CRA 커스텀 데브 서버
    require.resolve('react-dev-utils/webpackHotDevClient'),
    // @CRA 앱코드 위치(마지막에 위치해야 컴파일 오류 없다)
    paths.appIndexJs,
  ],
  output: {
    // @CRA dev server 충돌방지용 코드
    path: paths.appBuild,
    // @CRA 웹팩 주석용 코드 (기능 없음)
    pathinfo: true,
    // @CRA devserver 가상 경로
    filename: 'static/js/bundle.js',
    // @CRA 코드스플리팅용 경로
    chunkFilename: 'static/js/[name].chunk.js',
    // @CRA 앱 제공 URL (개발환경에서는 /)
    publicPath: publicPath,
    // @CRA 소스맵 시작점 설정(디스크)
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  resolve: {
    // @CRA 노드모듈 위치 설정
    modules: ['node_modules', paths.appNodeModules].concat(
      process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
    ),
    // @CRA JSX 지원 확장자
    extensions: ['.web.js', '.js', '.json', '.web.jsx', '.jsx'],
    alias: {
    // @CRA 리액트 네이티브 지원
      'react-native': 'react-native-web',
    },
    plugins: [
    // @CRA /src 또는 node_modules 외 파일 컴파일 방지
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
    ],
  },
  module: {
    strictExportPresence: true,
    rules: [
      // @CRA 표준 아니어서 잠시 닫아둔 기능
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
        // @CRA 맞는 로더 찾을때까지 웹팩 돌리는 기능
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
              // @CRA 빠른 재빌드 (바벨 기능 아님)
              cacheDirectory: true,
            },
          },
          // @CRA "postcss" loade : CSS에 autoprefixer 적용
          // @CRA "css" loader : CSS 경로 분석
          // @CRA "style" loader : CSS -> JS 삽입
          // @CRA 배포할때는 css 파일로 만들지만 개발환경에서는 핫로딩으로 동작
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // @CRA 외부 css 가져오는데 쓰임
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // @CRA 리액트는 IE8 지원 안함
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
          },
          // @CRA 파일로더
          {
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      // @CRA 로더 추가하려면 반드시 파일로더 앞에 추가해야 한다
    ],
  },
  plugins: [
    // @CRA index.html 에서 환경변수 사용하도록하는 웹팩
    // @CRA public URL 을 %PUBLIC_URL% 로 사용할 수 있다.
    // @CRA <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    new InterpolateHtmlPlugin(env.raw),
    // @CRA index.html에 <script> 삽입해서 내보내기
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
    // @CRA 팩토리함수에 모듈 이름을 붙여서 브라우저 프로파일러에 보여주는 플러그인
    new webpack.NamedModulesPlugin(),
    // @CRA JS코드에서 환경변수 사용 가능
    // @CRA if (process.env.NODE_ENV === 'development') { ... }. `./env.js'에 설정되어 있음
    new webpack.DefinePlugin(env.stringified),
    // @CRA CSS 핫로딩
    new webpack.HotModuleReplacementPlugin(),
    // @CRA 이슈 보여주기
    new CaseSensitivePathsPlugin(),
    // @CRA NPM INSTALL 까먹은게 있으면 알려준다
    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    // @CRA MOMENT.JS 사용하려면 이 플러그인 필요
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
    // @CRA 브라우저에서 사용되지 않는 노드모듈들
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  // @CRA 쓸데없는 경고니까 끄세요
  performance: {
    hints: false,
  },
};
