// import { useLocation, useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
// import { URL } from '../url';

// // Custom hook to get query parameters from the URL
// const useQuery = () => {
//   return new URLSearchParams(useLocation().search);
// };

const VerifyEmail = () => {
//   const [errorMsg, setErrorMsg] = useState('')  
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(true);
//   const query = useQuery();
//   const token = query.get('token');
//   const navigate = useNavigate();

//   const verifyEmail = async () => {
//     try {
//       const res = await axios.get(${URL}/api/auth/verify-email?token=${token});
//       if (res.status === 200) {
//         setMessage(res.data.msg);
//         navigate('/login');
//       }
//     } catch (error) {
//       setMessage('Email verification successful.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       console.log('Verifying email...');
//       verifyEmail();
//     } else {
//       setMessage('Invalid or missing token.');
//       setLoading(false);
//     }
//   }, [token]);

  return (
    <div className='text-center mt-12'>
        Verification
      {/* {loading ? (
        <p>Loading...</p>
      ) : (
        <p>
          {message}{' '}
          {message === 'Email verification successful.' && (
            <Link to="/login" className="text-orange-500 hover:text-orange-600">
              Click to login
            </Link>
          )}
        </p>
      )} */}
    </div>
  );
};

export default VerifyEmail;