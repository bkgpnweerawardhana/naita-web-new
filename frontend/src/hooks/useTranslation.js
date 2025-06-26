import { useLanguage } from '../context/LanguageContext';
import API from '../services/api';

export const useTranslation = () => {
  const { language } = useLanguage();

  const translate = async (model, field, id) => {
    try {
      const response = await API.get(`/api/translations/${model}/${field}/${id}/`, {
        params: { language }
      });
      return response.data.translation || '';
    } catch (error) {
      console.error('Translation error:', error);
      return '';
    }
  };

  return { translate, currentLanguage: language };
};