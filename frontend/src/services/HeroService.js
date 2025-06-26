import API from './api';

export const getHeroContent = async (language='en') => {
  try {
    const response = await API.get('courses/hero-content/',{params: { language }});
    return response.data;
    console.log('from the hero',response.data)
  } catch (error) {
    console.error('Error fetching hero content:', error);
    return null;
  }
};