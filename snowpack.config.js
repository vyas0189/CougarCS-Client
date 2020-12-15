module.exports = {
  // "experiments": {
  //   "optimize": {
  //     "bundle": true,
  //     "minify": true,
  //     "target": 'es2018'
  //   }
  // },
  mount: {
    public: '/',
    src: '/_dist_',
  },
  plugins: ['@snowpack/plugin-react-refresh', "@snowpack/plugin-dotenv", "@snowpack/plugin-webpack", "snowpack-plugin-relative-css-urls"]

};