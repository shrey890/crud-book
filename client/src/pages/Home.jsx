import { useNavigate} from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call the logout endpoint
      await axios.post('http://localhost:3000/logout');
      // Redirect to login page
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
