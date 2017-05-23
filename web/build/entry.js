var ReactDOM = require('react-dom');
ReactDOM.render(React.createElement(UI.URLRouter, { home: '/', routers: require('./routers.js') }), document.getElementById('container'));