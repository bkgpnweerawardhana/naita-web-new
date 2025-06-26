import API from './api';

export const getServices = async (language='en') => {
  try {
    const response = await API.get('courses/services/', {
      params: { language }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    return null;
  }
};

export const getNews = async (language='en') => {
  try{
    const response = await API.get('news/', {
      params: { language }
    });
    return response.data;
  } catch (error){
    console.error('Error fetching news:', error);
    return null;  
  } 
} 