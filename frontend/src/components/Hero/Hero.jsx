import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getHeroContent } from '../../services/HeroService';
import { useLanguage } from '../../context/LanguageContext';
import { useTranslation } from '../../hooks/useTranslation';
import { useAuth } from '../../context/AuthContext'; // Import auth context

export default function HeroSlider() {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const intervalRef = useRef(null);
  const { language } = useLanguage();
  const { translate } = useTranslation();
  const { user } = useAuth(); // ✅ Access auth state

  const ANIMATION_DURATION = 5000;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHeroContent(language);
        const translatedImages = data.images?.map((img) => img.image) || [];
        setImages(translatedImages);
      } catch (error) {
        console.error('Failed to fetch hero images:', error);
      }
    };

    fetchData();
  }, [language]);

  useEffect(() => {
    if (images.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, ANIMATION_DURATION);
    }
    return () => clearInterval(intervalRef.current);
  }, [images]);

  if (!images.length) {
    return (
      <div className="w-full h-[250px] bg-gray-200 flex items-center justify-center text-gray-500">
        Loading slider...
      </div>
    );
  }

  return (
    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-xl border-[3px] border-blue-200 shadow-2xl">

      {/* Background image */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}

      {/* ✅ Conditional Register Button */}
      {!user && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
          <Link
            to="/register"
            className="px-8 py-4 bg-gradient-to-r from-rose-800 via-red-700 to-rose-900 text-white text-lg md:text-xl lg:text-2xl rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 animate-bounce"
          >
            Register Now
          </Link>
        </div>
      )}

      {/* Indicators */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentImageIndex ? 'bg-white w-5' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
