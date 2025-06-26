import API from './api';

export const getInstitutions = async (language= 'en' ) => {
    try {
        const response = await API.get('institutions/institutions/', {
            params: { language }
        });
        return response.data.results || response.data;
    } catch (error) {
        console.error('Error fetching institutions:', error);
        throw error;
    }
};

export const getInstitutionTypes = async (language= 'en') => {
    try {
        const response = await API.get('institutions/institution-types/', { 
            params:{language}
        });
        return response.data.results || response.data;
    } catch (error) {
        console.error('Error fetching institution types:', error);
        throw error;
    }
};