import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import AdminSetting from './redux/reducer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

//Using redux to store two items.
//1.Store the meeting type selected by the client from the client interface navbar. This is default subject for the booking
//  submission by the client. The client will not be able to choose the meeting type. 
//2.Store the everyday avaliable time for the selected subject. The value is used to check the avaliable spot which could
//  be clicked by client. 
const store = createStore(AdminSetting);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
 document.getElementById('root'));
serviceWorker.unregister();
