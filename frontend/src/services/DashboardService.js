// src/services/DashboardService.js
import API from './api';

export const getServices = async () => {
  try {
    const response = await API.get('courses/services/');
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return null;
  }
};

export const getDashboardStats = async (language="en") => {
  try {
    const response = await API.get('courses/dashboard-stats/',{params:{language}});
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return null;
  }
};