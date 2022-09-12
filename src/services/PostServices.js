import axios from 'axios';
import { URI } from '../core/enviroment';

export const create = (payload) => {
    return axios.post(`${URI}/posts`, payload);
}

export const getAll = () => {
    return axios.get(`${URI}/posts`);
}