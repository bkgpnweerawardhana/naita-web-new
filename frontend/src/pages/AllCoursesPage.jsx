import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

import { getCourses, getCourseCategories } from '../services/CourseService';
import { getDistricts } from '../services/LocationService';
import CourseCard from '../components/Course/CourseCard';
import Navbar from '../components/Navbar/Navbar';
import Breadcrumb from '../components/BreadCrumb/BreadCrumb';
import TopBar from '../components/TopBar/TopBar';

export default function AllCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    district: '',
    duration: '',
    level: ''
  });

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const coursesData = await getCourses('', filters);
      setCourses(coursesData || []);
    } catch (err) {
      setError(err.message);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoriesData, districtsData] = await Promise.all([
          getCourseCategories(),
          getDistricts()
        ]);
        setCategories(categoriesData || []);
        setDistricts(districtsData || []);
      } catch (err) {
        console.error('Failed to load initial data:', err);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      district: '',
      duration: '',
      level: ''
    });
  };

  if (loading && courses.length === 0) {
    return (
      <section className="mt-10 mx-4">
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white w-full rounded-sm shadow-sm p-2 lg:rounded-md animate-pulse">
              <div className="bg-gray-200 w-full h-[145px] rounded-sm lg:h-[360px]"></div>
              <div className="mt-2 space-y-2">
                <div className="bg-gray-200 h-4 w-3/4"></div>
                <div className="bg-gray-200 h-4 w-1/2"></div>
                <div className="bg-gray-200 h-6 w-full mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div className="bg-gray-100">
      {/* Navbar */}
      <TopBar/>
      <Navbar/>
      <Breadcrumb/>
    
      <section className=" mx-4 py-10 ">
        {/* Heading */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 lg:text-5xl">
            Let's Explore Your Course!...
          </h1>
          <p className="text-sm text-gray-600 lg:text-xl lg:mt-3">
            Find the perfect course to kickstart your professional journey...
          </p>
        </div>

        {/* Filters - Updated to match course-page.html */}
        <div className="grid grid-cols-4 gap-1 mb-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 lg:text-xl">Category</label>
            <div className="relative mt-1">
              <select
                className="w-full h-[40px] bg-white text-[12px] text-gray-600 rounded-sm shadow-sm px-2 flex justify-between items-center focus:outline-red-800 focus:outline focus:outline-2 lg:text-base lg:h-[60px] lg:rounded-md"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Institution Location Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 lg:text-xl">Institution Location</label>
            <div className="relative mt-1">
              <select
                className="w-full h-[40px] bg-white text-[12px] text-gray-600 rounded-sm shadow-sm px-2 flex justify-between items-center focus:outline-red-800 focus:outline focus:outline-2 lg:text-base lg:h-[60px] lg:rounded-md"
                value={filters.district}
                onChange={(e) => handleFilterChange('district', e.target.value)}
              >
                <option value="">All Locations</option>
                {districts.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Duration Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 lg:text-xl">Duration</label>
            <div className="relative mt-1">
              <select
                className="w-full h-[40px] bg-white text-[12px] text-gray-600 rounded-sm shadow-sm px-2 flex justify-between items-center focus:outline-red-800 focus:outline focus:outline-2 lg:text-base lg:h-[60px] lg:rounded-md"
                value={filters.duration}
                onChange={(e) => handleFilterChange('duration', e.target.value)}
              >
                <option value="">All Durations</option>
                <option value="1">1 Month</option>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
              </select>
            </div>
          </div>

          {/* Level Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-600 lg:text-xl">Level</label>
            <div className="relative mt-1">
              <select
                className="w-full h-[40px] bg-white text-[12px] text-gray-600 rounded-sm shadow-sm px-2 flex justify-between items-center focus:outline-red-800 focus:outline focus:outline-2 lg:text-base lg:h-[60px] lg:rounded-md"
                value={filters.level}
                onChange={(e) => handleFilterChange('level', e.target.value)}
              >
                <option value="">All Levels</option>
                <option value="NVQ1">NVQ1</option>
                <option value="NVQ2">NVQ2</option>
                <option value="NVQ3">NVQ3</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mb-6">
          <button
            onClick={fetchCourses}
            className="bg-red-800 text-white px-4 py-2 rounded-sm font-medium hover:bg-red-900 transition shadow-sm text-sm lg:text-base lg:px-6 lg:py-3 lg:rounded-md"
          >
            Apply Filters
          </button>
          <button
            onClick={resetFilters}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-sm font-medium hover:bg-gray-400 transition shadow-sm text-sm lg:text-base lg:px-6 lg:py-3 lg:rounded-md"
          >
            Reset All
          </button>
        </div>

        {/* Results Section */}
        {error ? (
          <div className="bg-white p-4 rounded-sm shadow-sm text-center mb-8 lg:p-8 lg:rounded-md">
            <h3 className="text-lg font-semibold text-red-600 mb-2 lg:text-xl">Error Loading Courses</h3>
            <p className="text-gray-700 mb-4 text-sm lg:text-base">{error}</p>
            <button
              onClick={fetchCourses}
              className="bg-red-800 text-white px-4 py-2 rounded-sm hover:bg-red-900 text-sm lg:text-base lg:rounded-md"
            >
              Retry
            </button>
          </div>
        ) : courses.length === 0 ? (
          <div className="bg-white p-4 rounded-sm shadow-sm text-center mb-8 lg:p-8 lg:rounded-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 lg:text-xl">No Courses Found</h3>
            <p className="text-gray-700 text-sm lg:text-base">Try adjusting your search criteria or filters</p>
          </div>
        ) : (
          <>
            {/* Course Cards Grid */}
            <div className="overflow-y-auto max-h-[630px] pr-1">
              <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                {courses.map((course) => (
                  <CourseCard
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    category={course.category?.name}
                    duration={`${course.duration} ${course.duration_unit}`}
                    fee={course.fee}
                    thumbnail={course.thumbnail}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}