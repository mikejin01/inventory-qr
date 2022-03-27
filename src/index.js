import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux"
import { store, persistor } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react'
import { HashRouter } from 'react-router-dom'

/*var express = require('express');
var app = express();
var path = require('path');
var PORT = 3000;

// Without middleware
app.get('/', function(req, res){
    var options = {
        root: path.join(__dirname)
    };
     
    var fileName = 'Hello.txt';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
});
 
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});




  
*/

ReactDOM.render(

  
    <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HashRouter>
        <App />
        </HashRouter>
      </PersistGate>
    </Provider>
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
