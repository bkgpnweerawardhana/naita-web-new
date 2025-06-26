import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseDetails } from '../../services/CourseService';
import { getProvinces, getDistricts, getDSDivisions } from '../../services/LocationService';
import API from '../../services/api';
import {useAuth} from '../../context/AuthContext';

export default function EnrollmentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {user} = useAuth();
  const [step, setStep] = useState(1);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [dsDivisions, setDSDivisions] = useState([]);


  // Form data
  const [formData, setFormData] = useState({
    course_id: id,
    comments:'',
    nvq_level: '',
    name_with_initials: '',
    full_name: '',
    nic_number: '',
    gender: '',
    date_of_birth: '',
    address: '',
    phone: '',
    email: '',
    province: '',
    district: '',
    ds_division: ''
  });

  useEffect(() => {
    if (user && user.user_type !==3){
      navigate('/');
    }
    const fetchData = async () => {
      try {
        const [courseData, provincesData] = await Promise.all([
          getCourseDetails(id),
          getProvinces()
        ]);
        
        setCourse(courseData);
        setProvinces(provincesData);
        setFormData(prev => ({
          ...prev,
          offering: id,
          nvq_level: courseData.nvq_level === 'both' ? 'nvq3' : courseData.nvq_level,
          email:user?.email || '',
          phone:user?.phone || '',
          nic_number:user?.nic_number || '',

        }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id,user,navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProvinceChange = async (e) => {
    const provinceId = e.target.value;
    setFormData(prev => ({
      ...prev,
      province: provinceId,
      district: '',
      ds_division: ''
    }));
    
    if (provinceId) {
      const districtsData = await getDistricts(provinceId);
      console.log('see the data',districtsData);
      setDistricts(districtsData);
    } else {
      setDistricts([]);
      setDSDivisions([]);
    }
  };

  console.log('districts set',districts);

  const handleDistrictChange = async (e) => {
    const districtId = e.target.value;
    setFormData(prev => ({
      ...prev,
      district: districtId,
      ds_division: ''
    }));
    
    if (districtId) {
      const dsDivisionsData = await getDSDivisions(districtId);
      setDSDivisions(dsDivisionsData);
    } else {
      setDSDivisions([]);
    }
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/enrollments/enrollments/', formData);
      navigate('/enrollment-success');
    } catch (error) {
      setError(error.response?.data?.message || 'Enrollment failed');
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  if (!course) return <div className="text-center py-12">Course not found</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8 my-8 sm:my-12 border border-gray-100 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-28 h-28 sm:w-40 sm:h-40 bg-red-100 rounded-full absolute -top-10 -left-10 sm:-top-20 sm:-left-20 opacity-30"></div>
        <div className="w-20 h-20 sm:w-32 sm:h-32 bg-red-200 rounded-full absolute -bottom-8 -right-8 sm:-bottom-16 sm:-right-16 opacity-20"></div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 sm:mb-8 text-center tracking-tight">Course Enrollment </h2>
      
      {/* Progress Steps */}
      <div className="flex flex-col sm:flex-row items-center justify-center mb-8 sm:mb-10">
        <div className="flex items-center">
          <div className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${step === 1 ? 'border-red-700 bg-red-700 text-white scale-110 shadow-lg' : 'border-gray-300 bg-white text-gray-400'}`}>
            1
          </div>
          <span className={`mx-1 sm:mx-2 text-xs sm:text-sm font-semibold ${step === 1 ? 'text-red-700' : 'text-gray-400'}`}>Course</span>
        </div>
        <div className={`w-full sm:flex-1 h-1 mx-1 sm:mx-2 rounded-full transition-all duration-300 ${step === 2 ? 'bg-red-700' : 'bg-gray-200'}`}></div>
        <div className="flex items-center">
          <div className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${step === 2 ? 'border-red-700 bg-red-700 text-white scale-110 shadow-lg' : 'border-gray-300 bg-white text-gray-400'}`}>
            2
          </div>
          <span className={`mx-1 sm:mx-2 text-xs sm:text-sm font-semibold ${step === 2 ? 'text-red-700' : 'text-gray-400'}`}>Student</span>
        </div>
      </div>

       {/* Step 1: Course Details  */}
      {step === 1 && (
        <div>
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-800">Course Information</h3>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Course Code</label>
              <input 
                type="text" 
                value={course.code} 
                readOnly 
                className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg bg-gray-50 font-semibold text-gray-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Course Title</label>
              <input 
                type="text" 
                value={course.title} 
                readOnly 
                className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg bg-gray-50 font-semibold text-gray-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">NVQ Level</label>
              <select
                name="nvq_level"
                value={formData.nvq_level}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg bg-white font-semibold text-gray-700 focus:outline-none"
                required
              >
                {course.nvq_level === 'both' ? (
                  <>
                    <option value="nvq3">NVQ Level 3</option>
                    <option value="nvq4">NVQ Level 4</option>
                  </>
                ) : (
                  <option value={course.nvq_level}>{course.nvq_level.toUpperCase()}</option>
                )}
              </select>
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Duration</label>
              <input 
                type="text" 
                value={
                  formData.nvq_level === 'nvq3' ? `${course.nvq3_duration} ${course.nvq3_duration_unit}` :
                  formData.nvq_level === 'nvq4' ? `${course.nvq4_duration} ${course.nvq4_duration_unit}` :
                  `${course.non_nvq_duration} ${course.non_nvq_duration_unit}`
                } 
                readOnly 
                className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg bg-gray-50 font-semibold text-gray-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Course Fee (LKR)</label>
              <input 
                type="text" 
                value={course.fee ? Number(course.fee).toLocaleString() : 'Free'} 
                readOnly 
                className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg bg-gray-50 font-semibold text-gray-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Registration Fee (LKR)</label>
              <input 
                type="text" 
                value={Number(course.registration_fee).toLocaleString()} 
                readOnly 
                className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg bg-gray-50 font-semibold text-gray-700 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={nextStep}
              className="flex items-center gap-2 bg-gradient-to-r from-red-700 to-red-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-bold shadow hover:from-red-800 hover:to-red-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Next
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Student Details */}
      {step === 2 && (
        <form onSubmit={handleSubmit} autoComplete="off">
          <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-800">Student Information</h3>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Name with Initials</label>
              <input
                type="text"
                name="name_with_initials"
                value={formData.name_with_initials}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg bg-white font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-200"
                placeholder="Ex:- D.D.Bandara"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg bg-white font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-200"
                placeholder="Ex:- Damith Darshana Bandara"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">NIC Number</label>
              <input
                type="text"
                name="nic_number"
                value={formData.nic_number}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg bg-white font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-200"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg bg-white font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-200"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Date of Birth</label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg bg-white font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-200"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg bg-white font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-200"
                placeholder="No:123, Main Street, Kadawatha"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg bg-white font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-200"
                placeholder="079 101 1010"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg bg-white font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-200"
                placeholder="hello@world.com"
                required
              />
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">Province</label>
              <select
                name="province"
                value={formData.province}
                onChange={handleProvinceChange}
                className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg bg-white font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-200"
                required
              >
                <option value="">Select Province</option>
                {provinces.map(province => (
                  <option key={province.id} value={province.id}>{province.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">District</label>
              <select
                name="district"
                value={formData.district}
                onChange={handleDistrictChange}
                className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg bg-white font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-200"
                required
                disabled={!formData.province}
              >
                <option value="">Select District</option>
                {districts.map(district => (
                  <option key={district.id} value={district.id}>{district.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-600 mb-1 font-medium">DS Division</label>
              <select
                name="ds_division"
                value={formData.ds_division}
                onChange={handleChange}
                className="w-full p-2 sm:p-3 border border-gray-200 rounded-lg bg-white font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-200"
                required
                disabled={!formData.district}
              >
                <option value="">Select DS Division</option>
                {dsDivisions.map(dsDivision => (
                  <option key={dsDivision.id} value={dsDivision.id}>{dsDivision.name}</option>
                ))}
              </select>
            </div>
          </div>

          {error && <div className="text-red-600 mb-4 text-center font-semibold">{error}</div>}

          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 sm:mt-8">
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-100 text-gray-700 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-bold shadow hover:bg-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-red-700 to-red-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-bold shadow hover:from-red-800 hover:to-red-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Submit Application
            </button>
          </div>
        </form>
      )}
    </div>
  );
}