import API from './api';

export const getFAQs = async (language='en') => {
  try {
    const response = await API.get('faqs/faqs/',{params:{language}});
    return response.data;
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    throw error;
  }
};