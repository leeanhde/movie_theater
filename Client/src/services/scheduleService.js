import * as httpRequest from '~/utils/httpRequest';

// Fetch list of schedules
export const listSchedule = async () => {
    try {
        const res = await httpRequest.get('schedule/list');
        if (res && res.length > 0) {
            return res;
        } else {
            console.log('Empty response from API:', res);
            return [];
        }
    } catch (error) {
        console.error('Error fetching schedule now showing:', error.response || error);
        throw error;
    }
};

// Create a new schedule
 const createSchedule = async (scheduleData) => {
    try {
        const res = await httpRequest.post('schedule/create', scheduleData);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error; 
    }
};

// Update an existing schedule
 const updateSchedule = async (scheduleId, updatedData) => {
    try {
        const res = await httpRequest.put(`schedule/update/${scheduleId}`, updatedData);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error; 
    }
};

// Delete a schedule
 const deleteSchedule = async (scheduleId) => {
    try {
        const res = await httpRequest.del(`schedule/delete/${scheduleId}`);
        return res.data;
    } catch (error) {
        console.log(error);
        throw error; 
    }
};

export { createSchedule,updateSchedule,deleteSchedule}