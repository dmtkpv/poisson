module.exports = {

    output: {
        filename: 'poisson.js',
        globalObject: 'this',
        library: {
            name: 'createPoisson',
            export: 'default',
            type: 'umd2'
        }
    },

    devServer: {
        static: 'dist',
        port: 49050
    },

    devtool: 'source-map'

}