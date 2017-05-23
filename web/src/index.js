module.exports = zn.react.loadPaths({
    view: './view/index.js',
    routers: './routers.js',
    tools: './tools.js'
}, function (path){
    return require(path);
});
