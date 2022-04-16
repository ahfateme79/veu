// eslint-disable-next-line no-undef
var webpack = require('webpack')

module.exports = {
    devServer: {

        host: 'localhost'
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `
          @import "@/styles/main.scss";
        `,
                additionalData: `
                @import "~@/assets/font/css/style.css";`,
            }
        }
    },
    // configureWebpack: {
    //     plugins: [
    //         new webpack.ProvidePlugin({
    //             $modal: '~plugins/vue-js-modal.js'
    //         })
    //     ]
    // }
    // resolve: {
    //     extensions: ['', '.js', '.vue'],
    //     fallback: [path.join(__dirname, '../node_modules')],
    //     alias: {
    //         'vue': 'vue/dist/vue.common.js',
    //         'src': path.resolve(__dirname, '../src'),
    //         'assets': path.resolve(__dirname, '../src/assets'),
    //         'components': path.resolve(__dirname, '../src/components')
    //     }
    // }

};
