import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import NewsCard from '../components/NewsSection/NewsCard';
import 'swiper/css';
import 'swiper/css/pagination';
import Navbar from '../components/Navbar/Navbar';
import Breadcrumb from '../components/BreadCrumb/BreadCrumb';
import TopBar from '../components/TopBar/TopBar';
import { useLanguage } from '../context/LanguageContext';

export default function NewsDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [newsPost, setNewsPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language } = useLanguage();

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        // Fetch the main news post
        const response = await API.get(`news/posts/${slug}/`,{ params: { language } });
        console.log(response.data);
        setNewsPost(response.data);
        
        // Record view count
        try{
        await API.post(`news/posts/${slug}/increment_views/`);
        } catch (error) {
          console.log("Could not increment views", error);
        }
        // Fetch related posts
        const relatedResponse = await API.get(`news/posts/?category=${response.data.category?.id}`,{ params: { language } });
        setRelatedPosts(relatedResponse.data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNewsDetail();
  }, [slug, language]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="mx-4 pt-10 animate-pulse">
        <div className="w-full h-[204px] bg-gray-200 rounded-sm"></div>
        <div className="mt-5 h-8 bg-gray-200 w-3/4"></div>
        <div className="py-2 flex justify-between">
          <div className="h-6 bg-gray-200 w-1/4"></div>
          <div className="h-6 bg-gray-200 w-1/4"></div>
        </div>
        <div className="h-4 bg-gray-200 my-1"></div>
        <div className="h-4 bg-gray-200 my-1"></div>
        <div className="h-4 bg-gray-200 my-1 w-5/6"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-4 pt-10">
        <div className="text-red-600">Error loading news: {error}</div>
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 text-red-800 font-semibold"
        >
          ← Back to News
        </button>
      </div>
    );
  }

  if (!newsPost) {
    return (
      <div className="mx-4 pt-10">
        <div className="text-gray-600">News post not found</div>
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 text-red-800 font-semibold"
        >
          ← Back to News
        </button>
      </div>
    );
  }

  return (
    <div className="mx-4 pt-10 pb-10 ">
      <TopBar/>
      <Navbar/>
      <Breadcrumb/>
      {/* Featured Image */}
      <div 
        className="w-full h-[204px] bg-cover bg-center rounded-sm | lg:h-[600px] lg:rounded-md "
        style={{ backgroundImage: `url(${newsPost.image_url})` }}
      ></div>

      {/* Title */}
      <h1 className="text-base font-bold text-gray-900 mt-5 | lg:text-2xl ">
        {newsPost.title}
      </h1>

      {/* Author and Date */}
      <div className="auth-info-container py-2 flex flex-row justify-between items-center">
        <div className="flex flex-row gap-x-2 items-center">
          <img 
            src={newsPost.author?.avatar || 'https://randomuser.me/api/portraits/women/50.jpg'} 
            className="w-8 h-8 rounded-full object-cover | lg:w-12 lg:h-12 "
            alt={newsPost.author?.first_name || 'Author'}
          />
          <div className="text-base font-semibold text-gray-600 | lg:text-xl">
            {newsPost.author?.first_name || 'NAITA'} {newsPost.author?.last_name || ''}
          </div>
        </div>

        <div className="flex flex-row items-center gap-x-2">
          <div className="bg-red-800 w-2 h-2 rounded-full | lg:w-3 lg:h-3"></div>
          <div className="text-gray-600 text-base | lg:text-xl">
            {formatDate(newsPost.created_at)}
          </div>
        </div>
      </div>
      
      {/* Like and Social Media */}
      <div className="flex flex-row justify-between mx-12 mt-2 pb-8 border-b border-gray-200">
        <div className="flex flex-row gap-x-1 items-center">
          <img 
            src="/thumbs-up-black-icon.svg" 
            alt="Likes" 
            className="w-5 h-5"
          />
          <div className="text-gray-600 text-base">
            {newsPost.views || 0}
          </div>
        </div>

        <div className="share-social-icon flex flex-row gap-x-2">
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
            <img src="/facebook-round-color-icon.svg" alt="Share on Facebook" className="w-4 h-4" />
          </a>
          <a href={`https://wa.me/?text=${encodeURIComponent(newsPost.title + ' ' + window.location.href)}`} target="_blank" rel="noopener noreferrer">
            <img src="/whatsapp-color-icon.svg" alt="Share on WhatsApp" className="w-4 h-4" />
          </a>
          <button onClick={() => navigator.share({
            title: newsPost.title,
            text: newsPost.description,
            url: window.location.href
          })}>
            <img src="/share-icon.svg" alt="Share" className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* News Content */}
      <div className="text-justify bg-white text-gray-600 text-base whitespace-pre-line my-4 | lg:columns-2 lg:gap-x-10">
        <p className="first-letter:text-2xl first-letter:font-bold first-letter:text-gray-600 | lg:text-xl lg:first-letter:text-3xl lg:first-letter:font-semibold">
          {newsPost.content}
        </p>
      </div>
      
      {/* Top Stories Section */}
      <div className="mt-10">
        <div className="horizontal-line bg-gray-300 w-full h-[2px] my-4"></div>
        <h1 className="text-base text-gray-700 font-bold py-5">Top Stories</h1>
        
        <div className="swiper mySwiper w-full max-w-[600px] mx-auto lg:max-w-full lg:mx-4">
          <Swiper
            slidesPerView={2}
            spaceBetween={10}
            pagination={{
              clickable: true,
              el: '.swiper-pagination',
              type: 'bullets',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            {relatedPosts.map((post) => (
              <SwiperSlide key={post.id}>
                <NewsCard
                  title={post.title}
                  description={post.description}
                  imageUrl={post.image_url}
                  category={post.category?.name}
                  author={{
                    first_name: post.author?.first_name,
                    last_name: post.author?.last_name,
                    avatar: post.author?.avatar
                  }}
                  date={formatDate(post.created_at)}
                  className="w-[180px] lg:w-full cursor-pointer"
                  onClick={() => navigate(`/news/${post.slug}`)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="swiper-pagination relative mt-7 text-center"></div>
        </div>
      </div>
    </div>
  );
}