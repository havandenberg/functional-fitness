import React from 'react';
import ReactDOM from 'react-dom';
import Parse from 'parse';
import App from './components/app';
import * as serviceWorker from './serviceWorker';

Parse.initialize(process.env.REACT_APP_PARSE_APP_ID || '', process.env.REACT_APP_PARSE_JS_KEY || '');
Parse.serverURL = 'https://parseapi.back4app.com/';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
