import { config } from '@/config';
import axios from 'axios';

export const $axios = axios.create({
    baseURL: `${config.api.host}:${config.api.port}/api`,
    withCredentials: true,
});
