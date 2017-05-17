//require('zeanium-react-web');
var React = require('react');
var ReactDOM = require('react-dom');
ReactDOM.render(<UI.URLRouter home="/" routers={require('./router.js')} />, document.getElementById('container'));
