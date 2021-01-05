import axios from 'axios';

const instance = axios.create({ // this creates an instance of axios, like a copy of the axios object and you can create multiple such copies
    baseURL: 'http://jsonplaceholder.typicode.com'
}); 

instance.defaults.headers.common['Athorization'] = 'AUTH TOKEN';

// instance.interceptors.request...

export default instance;