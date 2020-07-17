const { override, fixBabelImports, addLessLoader, disableChunk, addWebpackModuleRule } = require('customize-cra');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1DA57A' },
    }),
    addWebpackModuleRule({
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        include: /flexboxgrid/
      })
);