// UserProfileWrapper.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserProfileWrapper from '~/pages/Profile/UserProfileWrapper/index';
import * as userService from '~/services/user.service'; 


const Profile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (userId) {
                try {
                    const userProfile = await userService.getUserProfile(userId); 
                    setUser(userProfile);
                    setError(null);
                } catch (error) {
                    console.error('Error fetching user profile:', error);
                    setError('Failed to load user profile. Please try again later.');
                } finally {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, [userId]);
    if (isLoading) {
        return <div>Loading user details...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!user) {
        return <div>No user details available.</div>;
    }
    

    return <UserProfileWrapper user={user} />;
};

export default Profile;
