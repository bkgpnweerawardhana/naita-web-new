import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegistrationSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home after 5 seconds
    const timer = setTimeout(() => navigate('/'), 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Registration Successful!
          </h2>
        </div>
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative">
          <p>Please check your email to activate your account.</p>
          <p className="mt-2 text-sm">You will be redirected to the home page shortly.</p>
        </div>
      </div>
    </div>
  );
}