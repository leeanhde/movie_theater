import * as httpRequest from '~/utils/httpRequest';

export const register = async (data) => {
    try {
        const res = await httpRequest.post('auth/signup',data);
            return res;
    } catch (error) {
        console.error('Error fetching movies now showing:', error.response || error);
        throw error;
    }
}

 