import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../services/authService';
import { useAuth } from '../context/AuthContext';

export default function ActivationPage() {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const{setUser} = useAuth();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const activateAccount = async () => {

      setIsLoading(true);
      setMessage('');
      setIsSuccess(false);
      try {
        const response = await verifyEmail(uidb64, token);
        
        // If verification is successful, automatically log the user in
        if ( response.access && response.refresh) {
          localStorage.setItem('token', response.access);
          localStorage.setItem('refreshToken', response.refresh);

          //update AuthContext user state if the setUser is available
          if (setUser && response.user ) {
            setUser(response.user);
          }

          setMessage(response.detail || 'Account activated successfully! You are now logged in.');
          setIsSuccess(true);
          // Redirect to home after 3 seconds
          setTimeout(() => navigate('/'), 3000);
        } else if (response.detail) {
          setMessage(response.detail || 'Account activated successfully! Please login.');
          setIsSuccess(true);
          setTimeout(() => navigate('/login'), 3000);
        } else{
          setError('Activation completed but with unexpected  response');
          setIsSuccess(false);
          setTimeout(()=>navigate('/login'),3000);

        }
      } catch (err) {
    
        setError(err.detail || 'Activation failed. The link may be invalid or expired.');
        setIsSuccess(false)

      } finally {
        setIsLoading(false);
      }
    };

    activateAccount();
  }, [uidb64, token, navigate,setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Account Activation
          </h2>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-800"></div>
          </div>
        ) : (
          
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {message}
                <button
                  onClick={() => navigate('/login')}
                  className={isSuccess ? "mt-2 px-4 py-2 bg-green-800 text-white rounded-md hover:bg-green-900" : "mt-2 px-4 py-2 bg-red-800 text-white rounded-md hover:bg-red-900"}
            >
                  Go to Login
                </button>
              </div>
            )}
            {message && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                {message}
              </div>
         
       
        )}
      </div>
    </div>
  );
}