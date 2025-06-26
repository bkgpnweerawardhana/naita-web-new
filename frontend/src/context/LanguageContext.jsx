import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const LanguageContext = createContext();

export const useLanguage = () =>{
  return useContext(LanguageContext);

}

export const LanguageProvider = ({ children }) => {
  // get initial language from localStorage or default to 'en'
  // This will allow the language to persist across page reloads
  const [language, setLanguage] = useState(()=>{
    const savedLanguage = localStorage.getItem('preferredLanguage');
    return savedLanguage || 'en';
  });

  useEffect(()=>{
    localStorage.setItem('preferredLanguage', language); //save the language to localStorage
    axios.defaults.headers.common['Accept-Language'] = language; //set the accept-language for all axios requests
  }, [language])

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  
       
  };

  const contextValue={
    language,
    changeLanguage,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};


