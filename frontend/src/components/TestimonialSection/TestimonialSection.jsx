import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'react-feather';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { getTestimonials } from '../../services/TestimonialService';

export default function TestimonialSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonials();
        console.log(data)
        setTestimonials(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentTestimonial(prev => 
          prev === testimonials.length - 1 ? 0 : prev + 1
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [testimonials]);

  const nextTestimonial = () => {
    setCurrentTestimonial(prev => 
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(prev => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  if (loading) return <div className="text-center py-12">Loading testimonials...</div>;
  if (error) return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  if (testimonials.length === 0) return null;

  return (
    <section className=" bg-gradient-to-b from-red-800 to-red-950 h-[340px] flex flex-col items-center relative  p-5 | lg:h-auto " >

      {/* title */}
      <div className="text-xl font-[Kite_One] text-gray-200 text-center py-2 | lg:text-3xl lg:py-5 ">
        <h1>What Our Students Say</h1>
      </div>

      {/* image,role,name continer */}
      <div className='flex flex-col items-center'>

        <div className="flex justify-center mb-2">
          <img 
            src={testimonials[currentTestimonial].avatar_url} 
            alt={testimonials[currentTestimonial].name}
            className="w-18 h-18 rounded-full object-cover border-2 border-white | lg:w-28 lg:h-28 "
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/default-avatar.jpg';
            }}
          />
        </div>

        <div className='text-xl mt-2  text-gray-200 | lg:text-xl '>
          <p >{testimonials[currentTestimonial].name}</p>
        </div>
         <div className='text-base text-gray-200 opacity-60 | lg:text-xl '>
          <p > | {testimonials[currentTestimonial].role} | </p>
        </div>


      </div>


      {/* quote container */}
      <div className='text-white text-base max-w-[350px] text-center pt-5 font-[Kite_One] | lg:text-xl lg:max-w-[855px] lg:my-12  '>
          <p >
          {testimonials[currentTestimonial].quote}
        </p>
      </div>





     
        {/* <FaQuoteLeft className="absolute bottom-30 left-3 text-white text-xl opacity-30" />
        <FaQuoteRight className="absolute bottom-12 right-6 text-white text-xl opacity-30" />
      
           */}

     

      
     

      <button 
        onClick={prevTestimonial}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-opacity-20 p-4 rounded-full hover:bg-opacity-30 transition"
      >
        <ChevronLeft  className="text-white w-[32px] h-[32px] | lg:w-[72px] lg:h-[72px] " />
      </button>
      
      <button 
        onClick={nextTestimonial}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-opacity-20 p-4 rounded-full hover:bg-opacity-30 transition"
      >
        <ChevronRight  className="text-white w-[32px] h-[32px] | lg:w-[72px] lg:h-[72px] " />
      </button>

      <div className="  absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentTestimonial(index)}
            className={`w-2 h-2 rounded-full transition | lg:w-3 lg:h-3 ${
              index === currentTestimonial ? 'bg-white' : 'bg-white/20'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}