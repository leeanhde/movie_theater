import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('accessToken') || ''
    }
});

export const get = async (path, options = {}) => {
    console.log(headerConfig);
    const response = await httpRequest.get(path,options);
    return response.data;
};

export const post = async (path, data, options = {}) => {
    console.log("🚀 ~ post ~ path:", path);
    console.log("🚀 ~ post ~ data:", data);
    try {
        const response = await httpRequest.post(path, data, options);
        console.log("🚀 ~ post ~ response:", response);
        return response.data;
    } catch (error) {
        alert(error.response.data?.message);
        console.error("🚀 ~ post ~ error:", error);
    }
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