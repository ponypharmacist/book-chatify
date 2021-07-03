module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import '@/common/styles/variables.sass'
          `
      }
    }
  }
}
