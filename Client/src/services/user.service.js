import * as httpRequest from '~/utils/httpRequest';

export const getUserProfile= async (id) => {
    try {
        const res = await httpRequest.get('user/get/' + id);
            return res;
    } catch (error) {
        console.error('Error fetching movies now showing:', error.response || error);
        throw error;
    }
};

export const updateProfile = async (id, data) => {
    try {
        const res = await httpRequest.put('user/profile/update/' + id, data);
        return res.data;
    } catch (error) {
        console.error('Error updating user profile:', error.response || error);
        throw error;
    }
};