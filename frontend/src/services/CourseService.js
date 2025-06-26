// Frontend/src/services/courseService.js
import API from './api';

export const getCourses = async (search = '', filters = {}) => {
  try {
    // Prepare params object
    const params = {
      search: search || undefined, // Only include if not empty
    };

    // Add filters if they have values
    if (filters.category) params.category = filters.category;
    if (filters.duration) params.duration__gte = filters.duration; // For minimum duration
    if (filters.fee_min) params.fee__gte = filters.fee_min;
    if (filters.fee_max) params.fee__lte = filters.fee_max;
    if (filters.district) params.available_districts = filters.district;

    // Remove undefined values
    Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);

    const response = await API.get('courses/courses/', { params });
    return response.data.results || response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

export const getCourseCategories = async () => {
  try {
    const response = await API.get('courses/categories/');
    return response.data.results || response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// src/services/courseService.js
export const getCourseDetails = async (id) => {
  try {
    const response = await API.get(`courses/courses/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course details:', error);
    throw error;
  }
};

export const applyForCourse = async (courseId, comments) => {
    try {
        const response = await API.post('enrollments/enrollments/', {
            offering: courseId,
            comments: comments
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getMyEnrollments = async () => {
    try {
        const response = await API.get('enrollments/enrollments/');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};