import API from './api';

export const getTestimonials = async () => {
  try {
    const response = await API.get('testimonials/testimonials/');
    return response.data;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    throw error;
  }
};