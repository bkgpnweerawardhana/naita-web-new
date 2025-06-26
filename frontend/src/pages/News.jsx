import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import NewsCard from '../components/NewsSection/NewsCard';
import Navbar from '../components/Navbar/Navbar';
import { Search, Filter, ChevronDown, ChevronUp } from 'react-feather';
import Breadcrumb from '../components/BreadCrumb/BreadCrumb';
import TopBar from '../components/TopBar/TopBar';
import {useLanguage} from '../context/LanguageContext';
import Footer from '../components/Footer/Footer';

export default function News() {
  const navigate = useNavigate();
  const [newsPosts, setNewsPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    post_type: '',
    date_range: 'all',
  });
  const [categories, setCategories] = useState([]);
  const { language } = useLanguage();

  // Fetch all news posts and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [postsResponse, categoriesResponse] = await Promise.all([
          API.get('news/posts/', { params: {  language } }),
          API.get('news/categories/', { params: { language } }),
        ]);

        setNewsPosts(postsResponse.data.results || postsResponse.data);
        setCategories(categoriesResponse.data.results || categoriesResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [language]);

  // Apply search and filters
  useEffect(() => {
    let results = [...newsPosts];

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.description.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (filters.category) {
      results = results.filter(post => 
        post.category?.id === parseInt(filters.category)
      );
    }

    if (filters.post_type) {
      results = results.filter(post => 
        post.post_type === filters.post_type
      );
    }

    if (filters.date_range !== 'all') {
      const now = new Date();
      const cutoffDate = new Date();

      switch (filters.date_range) {
        case 'week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
        case 'year':
          cutoffDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      results = results.filter(post => {
        const postDate = new Date(post.created_at);
        return postDate >= cutoffDate;
      });
    }

    setFilteredPosts(results);
  }, [newsPosts, searchQuery, filters]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      post_type: '',
      date_range: 'all',
    });
    setSearchQuery('');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-4 h-80 animate-pulse">
              <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading news: {error}
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar/>
      <Navbar/>
      
      {/* Hero Section */}
      <div className="bg-red-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">NAITA News & Announcements</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Stay updated with the latest news, announcements, and updates from NAITA
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          {/* Search Bar */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search news..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center text-red-800 font-medium mb-4"
          >
            <Filter className="mr-2" size={18} />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
            {showFilters ? <ChevronUp className="ml-2" size={18} /> : <ChevronDown className="ml-2" size={18} />}
          </button>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Post Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={filters.post_type}
                  onChange={(e) => handleFilterChange('post_type', e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="AN">Announcements</option>
                  <option value="NW">News</option>
                  <option value="UP">Updates</option>
                </select>
              </div>

              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={filters.date_range}
                  onChange={(e) => handleFilterChange('date_range', e.target.value)}
                >
                  <option value="all">All Time</option>
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="year">Last Year</option>
                </select>
              </div>
            </div>
          )}

          {/* Reset Filters */}
          {(filters.category || filters.post_type || filters.date_range !== 'all' || searchQuery) && (
            <button
              onClick={resetFilters}
              className="text-red-800 font-medium hover:underline"
            >
              Reset All Filters
            </button>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'}
          </p>
        </div>

        {/* News Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {filteredPosts.map(post => (
              <NewsCard
                key={post.id}
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
                onClick={() => navigate(`/news/${post.slug}`)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No News Found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button
              onClick={resetFilters}
              className="bg-red-800 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
        <Footer />
    </div>
  );
}