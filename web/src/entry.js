var ReactDOM = require('react-dom');
ReactDOM.render(<UI.URLRouter home="/" routers={require('./routers.js')} />, document.getElementById('container'));
