import * as httpRequest from '~/utils/httpRequest';

export const getMoviesNowShowing = async () => {
    try {
        const res = await httpRequest.get('movies/nowshowing');
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

export const getMoviesCommingSoon = async () => {
    try {
        const res = await httpRequest.get('movies/comingsoon');
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

export const getMoviesList = async () => {
    try {
        const res = await httpRequest.get('movies/movielist');
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

export const getMovieDetail = async (id) => {
    try {
        const res = await httpRequest.get('movies/detail/' + id);

            return res;
    } catch (error) {
        console.error('Error fetching movies now showing:', error.response || error);
        throw error;
    }
};
