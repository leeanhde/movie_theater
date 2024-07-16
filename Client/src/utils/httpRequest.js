import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});
const accessToken = localStorage.getItem('accessToken') || '';
const headerConfig = {
    'x-access-token': accessToken,
};

export const get = async (path, options = {}) => {
    console.log(headerConfig);
    const response = await httpRequest.get(path, { ...options, headers: { ...headerConfig } });
    return response.data;
};

export const post = async (path, data, options = {}) => {
    const response = await httpRequest.post(path, data, options);
    return response.data;
};

export const put = async (path, data, options = {}) => {
    const response = await httpRequest.put(path, data, options);
    return response.data;
};

export const del = async (path, options = {}) => {
    const response = await httpRequest.delete(path, options);
    return response.data;
};

export default httpRequest;