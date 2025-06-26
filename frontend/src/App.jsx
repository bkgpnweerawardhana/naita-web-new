import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext"
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CourseDetail from './pages/CourseDetail';
import CourseDetail2 from './pages/CourseDetail2';
import AboutUs from './pages/AboutUs';
import News from './pages/News';
import AllCoursesPage from './pages/AllCoursesPage';
import NewsDetail from './pages/NewsDetail';
import ErrorBoundary from './components/ErrorBoundary';

import InstitutionsPage from './pages/InstitutionsPage';
import ContactPage from './pages/ContactPage';

import PasswordResetRequest from './pages/PasswordResetRequest';
import PasswordResetConfirm from './pages/PasswordResetConfirm';
import RegistrationSuccess from './pages/RegistrationSuccess';
import ActivationPage from './pages/ActivationPage';
import InstructorDashboard from './pages/InstructorDashboard';
import EnrollmentPage from './pages/EnrollmentPage';
import EnrollmentSuccess from './pages/EnrollmentSuccess';
import { LanguageProvider } from './context/LanguageContext';



import DownloadPage from './pages/DownloadPage';


function App() {
  return (
    <Router>
      <LanguageProvider>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/registration-success' element={<RegistrationSuccess />} />
          <Route path="/activate/:uidb64/:token" element={<ActivationPage />} />
          <Route path="/" element={<Home />} />
          
          <Route 
            path="/courses/:id" 
            element={
              <ErrorBoundary>
                <CourseDetail2/>
              </ErrorBoundary>
            }
          
          />
          <Route path='/news/:slug' element={<NewsDetail />} />
          <Route path='/about' element={<AboutUs/>} />
          <Route path='/news' element={<News/>} />
          <Route path='/courses' element={<AllCoursesPage/>} />
          <Route path='/institutions' element ={<InstitutionsPage/>} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/password-reset" element={<PasswordResetRequest/>}/>
          <Route path="/password-reset/confirm/:uidb64/:token" element={<PasswordResetConfirm />} />
          <Route path="/courses/:id/enroll" element={<EnrollmentPage />} />
          <Route path="/instructor-dashboard" element={<InstructorDashboard/>}/>
          <Route path='/enrollment-success' element={<EnrollmentSuccess />} />
          <Route path="/downloads" element={<DownloadPage />} />
        </Routes>
      </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;