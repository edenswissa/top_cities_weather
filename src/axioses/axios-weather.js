import axios from 'axios';
import * as properties from '../properties/properties';

const instance = axios.create({
    baseURL:properties.weaterurl
});

export default instance;