import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'http://jsonplaceholder.typicode.com';   // this is another cool feature of axios,
axios.defaults.headers.common['Athorization'] = 'AUTH TOKEN';     // setting a default configuration which will be used
axios.defaults.headers.post['Content-Type'] = 'application/json'; // application-wide. Helps you to optimize your code quite a lot (setting it to application/json isn't required since it's the default)

axios.interceptors.request.use(request => { //about interceptors object: it will affect all requests sent from anywhere in your app
    console.log(request);
    // Edit request config
    return request; // you need to always return the request otherwise you 're blocking it
},error => { // this error is for when the request SENDING fails
    console.log(error);
    return Promise.reject(error); // we need to return Promise.reject(error) so that we still forward it to the 
                                  // request as we wrote it in the component where we can handle it again
});

axios.interceptors.response.use(response => { // here we use interceptors to 'deal' with responses
    console.log(response);
    // Edit request config
    return response;
}, error => {
    console.log(error);
    return Promise.reject(error);
}
);

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
