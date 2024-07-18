import * as httpRequest from '~/utils/httpRequest';

export const search = async (q, type = 'less') => {
    try {
        const res = await httpRequest.get('movies/search', {
            params: {
                q,
                type,
            },
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
