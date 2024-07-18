import * as httpRequest from '~/utils/httpRequest';

export const getFeedback = async (id) => {
    try {
        const res = await httpRequest.get('feedbacks/get/movie/' + id);
        if (res && res.length > 0) {
            return res;
        } else {
            console.log('Empty response from API:', res);
            return [];
        }
    } catch (error) {
        console.error('Error fetching movies now showing:', error.response || error);
        throw error;
    }
};
export const create = async (data) => {
    try {
        const res = await httpRequest.post('feedbacks/create', data);
        return res;
    } catch (error) {
        console.error('Error fetching movies now showing:', error.response || error);
        throw error;
    }
};

export const getAllFeedback = async () => {
    try {
        const res = await httpRequest.get('feedbacks/getAll');
        if (res && res.length > 0) {
            return res;
        } else {
            console.log('Empty response from API:', res);
            return [];
        }
    } catch (error) {
        console.error('Error fetching movies now showing:', error.response || error);
        throw error;
    }
};
export const getAllFeedbackByMovie = async () => {
    try {
        const res = await httpRequest.get('feedbacks/getAllByMovie');
        return res;
    } catch (error) {
        console.error('Error fetching movies now showing:', error.response || error);
        throw error;
    }
};

export const getFeedbackfu = async (id) => {
    try {
        const res = await httpRequest.get('feedbacks/get/movie/' + id);

        return res;
    } catch (error) {
        console.error('Error fetching movies now showing:', error.response || error);
        throw error;
    }
};
