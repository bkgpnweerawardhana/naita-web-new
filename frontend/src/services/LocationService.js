// Frontend/src/services/LocationService.js
import API from './api';

export const getDistricts = async (provinceId) => {
    try {
        const params= { province: provinceId };
        let allDistricts = [];
        let nextUrl = 'locations/districts/';
        
        while (nextUrl) {
            const response = await API.get(nextUrl,{ params});
            allDistricts = [...allDistricts, ...(response.data.results || response.data)];
            nextUrl = response.data.next;
        }
        
        console.log("All districts loaded:", allDistricts);
        return allDistricts;
    } catch (error) {
        console.error('Error fetching districts:', error);
        throw error;
    }
};



export const getProvinces = async () => {
  try {
    const response = await API.get('locations/provinces/');
    return response.data.results || response.data;
  } catch (error) {
    console.error('Error fetching provinces:', error);
    throw error;
  }
};


export const getDSDivisions = async (districtId) => {
  try {
    let allDSDivisions = [];
    let nextUrl = 'locations/ds-divisions/';
    while(nextUrl){
      const response = await API.get(nextUrl,{params:{ district: districtId }} );
      allDSDivisions = [...allDSDivisions,...(response.data.results || response.data)];
      nextUrl = response.data.next;

    }
    console.log('all DSDivisions loaded',allDSDivisions);
    return allDSDivisions;
  } catch (error) {
    console.error('Error fetching DS divisions:', error);
    throw error;
  }
};