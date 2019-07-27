module.exports = {
  env: {
    NODE_ENV: '"production"',
    BACKEND_URL: '"https://118.31.108.252/backend"',
    SIGNALING_URL: '"wss://118.31.108.252/signaling"'
  },
  defineConstants: {
  },
  weapp: {},
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  }
}
