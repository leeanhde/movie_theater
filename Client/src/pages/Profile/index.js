// UserProfileWrapper.js
import React from 'react';
import { useParams } from 'react-router-dom';
import UserProfileWrapper from '~/pages/Profile/UserProfileWrapper/index';

const Profile = () => {
    const { nickname } = useParams();

    // Simulated user data
    const user = {
        profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9UdkG68P9AHESMfKJ-2Ybi9pfnqX1tqx3wQ&s',
        name: nickname,
        email: `${nickname}@example.com`,
        joinDate: 'January 1, 2020',
        favoriteGenre: 'Action',
        totalReviews: 25,
        favoriteMovies: [
            { poster: 'https://via.placeholder.com/50x75', title: 'Movie 1' },
            { poster: 'https://via.placeholder.com/50x75', title: 'Movie 2' },
            { poster: 'https://via.placeholder.com/50x75', title: 'Movie 3' },
        ],
    };

    return <UserProfileWrapper user={user} />;
};

export default Profile;
