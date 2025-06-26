import { useEffect, useState } from 'react';
import { useParams,Link, useNavigate } from 'react-router-dom';
import { getCourseDetails } from '../services/CourseService';
import {useAuth} from '../context/AuthContext';



export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {user} = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseDetails(id);
        const processedCourse = {
          ...data,
          districts: data.available_districts || [],
          features: data.features || [],
          content: data.content || [],
          requirements: data.requirements || [],
        };
        setCourse(processedCourse);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);
 
  if (loading) return <div className="text-center py-12">Loading course details...</div>;
  if (error) return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  if (!course) return <div className="text-center py-12">Course not found</div>;

  
  const handleApplyClick = () =>{
    if (!user) {
      navigate('/login',{state:{from:`/courses/${id}/enroll`}});
      return;
    }
    if (user.user_type !==3){
      alert('Only students can apply for courses');
      return;
    }
    navigate(`/courses/${id}/enroll`);
  }

  return (
    <div>
      {/* Hero Image */}
      <div className="w-full overflow-clip relative z-0">
        <div
          className="bg-cover bg-no-repeat bg-center h-[235px] lg:h-[400px] "
          style={{ backgroundImage: `url(${course.background_image})` }}
        ></div>
      </div>

      <div className="px-5 bg-gray-100 pb-24">
        {/* Responsive Layout */}
          <div className="relative max-w-7xl mx-auto flex flex-col gap-8 lg:flex-row lg:gap-12 -mt-24">
            {/* Course Card */}
            <div className="z-10 bg-white rounded-lg px-7 py-8 w-full shadow-lg lg:w-4/4  lg:min-h-96 lg:max-96 lg:py-12 lg:px-12">
              <div className="mb-4 text-2xl font-bold text-gray-900 lg:text-4xl">
                <h1>{course.title}</h1>
              </div>
              <div className="text-sm  text-justify text-gray-600 mb-6 lg:text-xl">
                <p>{course.description}</p>
              </div>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-col gap-2  text-xs lg:text-base">
            <div className="flex flex-row items-center gap-2 text-gray-600">
              {/* Clock Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3"/>
              </svg>
              <div>Duration - {course.duration} {course.duration_unit}</div>
            </div>
            {course.certification && (
              <div className="flex flex-row items-center gap-2 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-red-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 17.75l-6.172 3.247 1.179-6.873L2 9.753l6.914-1.004L12 2.25l3.086 6.499L22 9.753l-5.007 4.371 1.179 6.873z" />
                </svg>
                <div>{course.certification}</div>
              </div>


            )}

           
                </div>
               {/* <Link 
                  to={`/courses/${course.id}/enroll`}
                  className="text-xs font-bold w-32 h-12 text-white bg-red-800 hover:bg-red-900 rounded-md lg:w-52 lg:mt-28 lg:h-16 lg:text-2xl transition flex items-center justify-center"
                >
                  Apply Now
                </Link> */}

                 <button
                      onClick={handleApplyClick}
                      className="text-xs font-bold w-32 h-12 text-white bg-red-800 hover:bg-red-900 rounded-md lg:w-52 lg:mt-28 lg:h-16 lg:text-2xl transition flex items-center justify-center"
                            >
                                Apply Now
                            </button>

              </div>
            </div>

            {/* Price Section */}
        
        </div>
          <div className="bg-white flex flex-col w-42 p-2 absolute right-4 rounded-sm mt-6 shadow-sm lg:rotate-0 lg:w-[300px] lg:h-[180px] lg:p-6 lg:mt-14 lg:mr-6">
            <div className="text-gray-600  text-[10px] lg:text-xl lg:font-bold py-1">Course Fee</div>
            <div className="text-sm font-bold text-red-800 lg:text-4xl py-1">{Number(course.fee).toLocaleString()} LKR</div>
            <div className="text-gray-600 text-nowrap  text-[10px] lg:text-xl lg:font-bold py-1">
              Registration Fee - {Number(course.registration_fee).toLocaleString()} LKR
            </div>
          </div>

        {/* Details Sections */}
        <div className="max-w-7xl mx-auto mt-34 flex flex-col gap-10 | lg:mt-84 ">
          {/* District Section */}
          {course.districts.length > 0 && (
            <div>
              <div className="text-lg font-bold text-gray-900 mb-2 lg:text-3xl">
                <h1>Available Districts</h1>
              </div>
              <div className="font-[inter] text-sm text-gray-600 lg:text-xl flex flex-wrap gap-2">
                {course.districts.map((district, idx) => (
                  <span key={idx} className="flex items-center gap-2 bg-gray-200 px-3 py-1 rounded-full">
                    <span className="bg-red-800 w-2 h-2 rounded-full"></span>
                    {district}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Features Section */}
          {course.features.length > 0 && (
            <div>
              <div className="text-lg font-bold text-gray-900 mb-2 lg:text-3xl">
                <h1>Features</h1>
              </div>
              <ul className="font-[inter] text-sm text-gray-600 text-justify lg:text-xl space-y-2">
                {course.features.map((feature, idx) => (
                  <li key={idx} className="flex items-baseline gap-2">
                    <span className="bg-red-800 w-2 h-2 rounded-full"></span>
                    <span className="text-pretty">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Course Content Section */}
          {course.content.length > 0 && (
            <div className="lg:col-span-2">
              <div className="text-lg font-bold text-gray-900 mb-2 lg:text-3xl">
                <h1>Course Content</h1>
              </div>
              <div className="space-y-6">
                {course.content.map((module, idx) => (
                  <div key={idx} className="bg-white rounded-md shadow p-4">
                    <div className="text-base font-semibold text-gray-700 mb-2 lg:text-xl">
                      <h2>{module.title}</h2>
                    </div>
                    <ul>
                      {module.topics?.map((topic, tIdx) => (
                        <li
                          key={tIdx}
                          className="bg-gray-100 my-1 p-2 border-l-4 border-red-800 text-sm font-[inter] text-gray-700 lg:text-base rounded"
                        >
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Entry Qualifications Section */}
          {course.requirements.length > 0 && (
            <div className="lg:col-span-2">
              <div className="text-lg font-bold  text-gray-900 mb-2 lg:text-3xl">
                <h1>Entry Qualifications</h1>
              </div>
              <ul className="font-[inter] text-sm text-gray-600 text-justify lg:text-xl space-y-2">
                {course.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-baseline gap-2">
                    <span className="bg-red-800 w-2 h-2 rounded-full"></span>
                    <span className="text-pretty">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
