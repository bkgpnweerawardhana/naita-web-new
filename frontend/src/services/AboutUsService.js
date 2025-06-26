import API from './api';

export const getBoardMembers = async (position = null) => {
    try {
        const params = position ? { position } : {};
        const response = await API.get('about-us/board-members/', { params });
        console.log('Board members fetched:', response.data);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching board members:', error);
        throw error;
    }
};

export const getQualityPolicy = async () => {
    try {
        const response = await API.get('about-us/quality-policy/active/');
        console.log('Quality policy fetched:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching quality policy:', error);
        throw error;
    }
};

export const getObjectives = async () => {
    try {
        const response = await API.get('about-us/objectives/');
        console.log('Objectives fetched:', response.data);
        return response.data.results;
    } catch (error) {
        console.error('Error fetching objectives:', error);
        throw error;
    }
};