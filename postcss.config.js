module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // 1rem的大小  750
      // 该项目中是36
      rootValue: 36,
      propList: ['*']
    }
  }
}
