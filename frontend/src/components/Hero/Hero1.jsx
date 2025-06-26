import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getHeroContent } from '../../services/HeroService';
import {useLanguage} from '../../context/LanguageContext';
import {useTranslation} from '../../hooks/useTranslation';

export default function Hero({ 
  staticTitle,
  staticDescription,
  staticButtonText,
  staticBackgroundImages =[]
}) {
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef(null);
  const { language } = useLanguage();
  const {translate} = useTranslation();

  const ANIMATION_DURATION = 7000;

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await getHeroContent(language);
        const translatedData = {
          ...data,
          title: await translate('herocontent','title', data.id) || data.title,
          description: await translate('herocontent', 'description', data.id) || data.description,
          button_text: await translate('herocontent', 'button_text', data.id) || data.button_text,
          images: data.images.map(img => img.image)
        };
        setHeroData(translatedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, [language]);
  


  useEffect(() => {
    const images = heroData?.images || staticBackgroundImages;
    
    if (images && images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % images.length);
      }, ANIMATION_DURATION);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [heroData, staticBackgroundImages]);


  // Use static props as fallback
  const title = heroData?.title || staticTitle;
  const description = heroData?.description || staticDescription;
  const buttonText = heroData?.button_text || staticButtonText;
  const images = heroData?.images?.length >0 ? heroData.images : staticBackgroundImages;

  if (loading) {
    return (
      <div className="relative w-full h-[233px] lg:h-[860px] bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white bg-opacity-90 w-full h-full lg:w-[1038px] lg:h-[533px]"></div>
        </div>
      </div>
    );
  }

  if (error) {
    console.error('Hero Error:', error);
    // Fallback to static content if API fails
    return (
      <StaticHero 
        title={staticTitle}
        description={staticDescription}
        buttonText={staticButtonText}
        backgroundImages={staticBackgroundImages}
      />
    );
  }

  return (
    <div className="relative  w-full h-[233px] lg:h-[560px]  " >
       {/* Background images with fade animation */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-discrete duration-4000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            backgroundImage: `url(${image})`,
            zIndex: 0,
          }}
        />
      ))}
      <div className="absolute  rounded-xl inset-0 bg-black/30 bg-opacity-40 flex items-center">
        <div className="container  ml-4 mt-96  lg:ml-20">
          <div className="bg-white shadow-lg bg-opacity-90 mr-4 w-auto h-[263px] rounded-[5px] p-5 
                         lg:w-[1128px] lg:h-[533px] lg:p-12 lg:rounded-xl">
            <h1 className="text-xl font-bold text-gray-900 mb-4 lg:text-4xl lg:w-[940px]">
              {title}
            </h1>
            <p className="text-xs text-gray-700 mb-4 mt-10 max-w-4xl text-justify lg:text-2xl">
              {description}
            </p>
            <Link 
              to="/register"
              className="bg-red-800 text-white w-full h-[55px] rounded-[12px] text-base font-medium hover:bg-opacity-90 transition mt-4 flex items-center justify-center
                         lg:w-[372px] lg:h-[91px] lg:text-2xl lg:mt-22 animate-bounce "
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
       {/* Image indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentImageIndex(index);
                if (intervalRef.current) {
                  clearInterval(intervalRef.current);
                  intervalRef.current = setInterval(() => {
                    setCurrentImageIndex(prev => (prev + 1) % images.length);
                  }, ANIMATION_DURATION);
                }
              }}
              className={`w-3 h-3 rounded-full transition-all ${index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

Hero.propTypes = {
  staticTitle: PropTypes.string,
  staticDescription: PropTypes.string,
  staticButtonText: PropTypes.string,
  staticBackgroundImages: PropTypes.arrayOf(PropTypes.string),
};

Hero.defaultProps = {
  staticTitle: "National Apprentice and Industrial Training Authority - Sri Lanka",
  staticDescription: "In 1971, the National Apprentice Board (NAB) was created to manage and organize job-based training programs for students. With help from the United Nations and the International Labor Organization, NAB developed skills to improve apprenticeship training.",
  staticButtonText: "Register Now",
  staticBackgroundImages: ["/Training1.jpg","/Training2.jpg","/Training3.jpg",]
};

// Static fallback component
function StaticHero({ title, description, buttonText, backgroundImages }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    if (backgroundImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % backgroundImages.length);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [backgroundImages.length]);

  return (
    <div className="relative w-full h-[233px] lg:h-[860px] overflow-hidden">
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            backgroundImage: `url(${image})`,
            zIndex: 0,
          }}
        />
      ))}
      
      <div className="absolute inset-0 bg-black/30 bg-opacity-40 flex items-center">
        {/* ... same content as main Hero ... */}
      </div>
    </div>
  );
}