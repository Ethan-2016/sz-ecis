/*
 * @Author: your name
 * @Date: 2020-10-21 08:51:20
 * @LastEditTime: 2021-07-22 18:00:16
 * @LastEditors: Linbaochang
 * @Description: In User Settings Edit
 * @FilePath: \work\ICIS\vue.config.js
 */
var PAGES = {
  index: {
    // page的入口
    entry: 'src/benchs/index/main.js',
    // 模板来源
    template: 'public/index.html',
    // 在dist/index.html的输出
    filename: 'index.html',
    // 当使用title选项时
    // template中的title标签需要<title><%= htmlWebpackPlugin.options.title %></title>
    title: '医健信息化平台',
    // 在这个页面中包含的块，默认情况下会包含
    // 提取出来的通用 chunk 和 vendor chunk
    chunks: ['chunk-vendors', 'chunk-common', 'index'],
  },
  login: {
    entry: 'src/benchs/login/main.js',
    template: 'public/login.html',
    filename: 'login.html',
    title: '用户认证',
    chunks: ['chunk-vendors', 'chunk-common', 'login'],
  },
  sys: {
    entry: 'src/benchs/sys/main.js',
    template: 'public/index.html',
    filename: 'sys.html',
    title: '系统设置',
    // chunks: ["chunk-vendors", "chunk-common", "system"],
  },
  // asc: {
  //   entry: 'src/benchs/asc/main.js',
  //   template: 'public/index.html',
  //   filename: 'asc.html',
  //   title: '日间手术',
  //   // chunks: ["chunk-vendors", "chunk-common", "asc"],
  // },
  // sanesthesia: {
  //   entry: 'src/benchs/sanesthesia/main.js',
  //   template: 'public/index.html',
  //   filename: 'sanesthesia.html',
  //   title: '手麻系统',
  //   // chunks: ["chunk-vendors", "chunk-common", "aims"],
  // },
  // icis: {
  //   entry: 'src/benchs/icis/main.js',
  //   template: 'public/index.html',
  //   filename: 'icis.html',
  //   title: '重症系统',
  //   chunks: ['chunk-vendors', 'chunk-common', 'icis'],
  // },
  // stroke: {
  //   entry: 'src/benchs/stroke/main.js',
  //   template: 'public/index.html',
  //   filename: 'stroke.html',
  //   title: '卒中系统',
  //   // chunks: ["chunk-vendors", "chunk-common", "stroke"],
  // },
  // meeting: {
  //   entry: 'src/benchs/meeting/main.js',
  //   template: 'public/index.html',
  //   filename: 'meeting.html',
  //   title: '会诊系统',
  //   // chunks: ["chunk-vendors", "chunk-common", "meet"],
  // },
  // platform: {
  //   entry: 'src/benchs/platform/main.js',
  //   template: 'public/index.html',
  //   filename: 'platform.html',
  //   title: '平台页'
  //   // chunks: ["chunk-vendors", "chunk-common", "platform"],
  // },
  // reports: {
  //   entry: 'src/benchs/reports/main.js',
  //   template: 'public/index.html',
  //   filename: 'reports.html',
  //   title: '全院报告',
  // },
  // preHospital: {
  //   entry: 'src/benchs/preHospital/main.js',
  //   template: 'public/index.html',
  //   filename: 'preHospital.html',
  //   title: '院前急救',
  //   // chunks: ["chunk-vendors", "chunk-common", "preHospital"],
  // },
  // previewTriage: {
  //   entry: 'src/benchs/previewTriage/main.js',
  //   template: 'public/index.html',
  //   filename: 'previewTriage.html',
  //   title: '预检分诊',
  //   // chunks: ["chunk-vendors", "chunk-common", "preHospital"],
  // },
  // ambulanceIoT: {
  //   entry: 'src/benchs/ambulanceIoT/main.js',
  //   template: 'public/index.html',
  //   filename: 'ambulanceIoT.html',
  //   title: '急救车联网',
  // },
  // ecis: {
  //   entry: 'src/benchs/ecis/main.js',
  //   template: 'public/index.html',
  //   filename: 'ecis.html',
  //   title: '急诊',
  // },
};

let _publicPath = '/';

let page = {};
let pageName = process.argv[3];
let type = process.argv[2];

if (type == 'serve') {
  page = PAGES;
} else {
  if (pageName == undefined) {
    page = PAGES;
    pageName = '';
  } else {
    if (pageName == 'index') {
      page = {
        index: PAGES.index,
        login: PAGES.login
      }
    } else {
      page[pageName] = PAGES[pageName];
    }
    if (pageName != 'index') {
      _publicPath = _publicPath + pageName;
    }
  }
  console.log(page);
}

module.exports = {
  //调试显示源代码，方便F12调试
  configureWebpack: {
    devtool: 'source-map',
  },
  lintOnSave: false,
  devServer: {
    port: 5000,
    hot: true,
    open: true,
    proxy: {
      // '/api/oauth': {
      //     target: 'http://localhost:5000',
      //     changeOrigin: true,
      //     pathRewrite: {
      //         '^/api/oauth': ''
      //     }
      // },
      // '/api/emr/dcServicePage': {
      //     target: 'http://192.168.0.111:51035',
      //     changeOrigin: true
      // },
      '/api': {
        // target: 'http://192.168.1.162:80',
        // target: 'http://10.10.252.137:80',
        // target: "http://192.168.37.93",
        target: 'http://219.134.240.180:51103',
        // target:'http://192.168.0.129:5002',
        // target:'http://192.168.0.119:5007',
        // target: "http://192.168.0.253:80",
        // target: "http://192.168.0.59:5006",
        changeOrigin: true,
        // pathRewrite: {
        //             '^/api': ''
        //         }
      },
      '/shub': {
        target: 'ws://192.168.0.253:15674/ws',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/shub': '/',
        },
      },
    },
  },
  configureWebpack: { 
    externals: {
      './cptable': 'var cptable'
    },
  },
  pages: page,
  publicPath: _publicPath,
  outputDir: 'dist/' +pageName,
};
///http://192.168.0.119:5007/DCWriter/index