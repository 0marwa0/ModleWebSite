module.exports = {

    output: {
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
           {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'eslint-loader']
            }, {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    },
                    {
                        loader: "css-loader", // translates CSS into CommonJS
                        options: {
                            modules: true,
                            sourceMap: true,
                            localIdentName: '[local]__[hash:base64:5]',
                            minimize: true
                        }
                    },
                    {
                        loader: "sass-loader" // compiles Sass to CSS
                    }
                ]
            }
        ]
    }
};