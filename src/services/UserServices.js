import axios from 'axios';
import { URI } from '../core/enviroment';

export const getAll = () => {
    return axios.get(`${URI}/users`);
}