// import React from 'react';
// import ReactDOM from 'react-dom';
// import './scss/index.scss';
// import { AlloyConnection } from './src2/alloy/AlloyConnection';
// import { toSterlingData } from './src2/alloy/toSterlingData';
// import * as serviceWorker from './serviceWorker';
// import Sterling from './src2/Sterling';
//
// const alloy = new AlloyConnection();
// const sterling = (
//     <Sterling
//         connection={alloy}
//         transform={toSterlingData}
//         welcome={'Use Alloy to generate an instance'}/>
// );
//
// ReactDOM.render(sterling, document.getElementById('root'));
//
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import * as serviceWorker from './serviceWorker';
import Sterling from './Sterling';

ReactDOM.render(<Sterling />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
