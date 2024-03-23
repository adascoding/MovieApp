import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import { useMovieContext } from "../store/MovieContext";
import { FaUserCircle } from 'react-icons/fa';
import { IoLogOut } from 'react-icons/io5';
import AuthService from "../services/AuthService";

export default function Profile() {
    const { user, setUser } = useMovieContext();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await AuthService.logout();
            setUser(null);
            navigate('/login');
        } catch (error) {
        }
    }

    if (!user) {
        navigate('/login');
        return null;
    }
    
    return (
        <div className="max-w-lg mx-auto mt-8 px-4">
            <div className="bg-white shadow-md rounded-lg p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Profile Information</h2>
                        <p className="text-gray-600">Welcome back, {user.username}!</p>
                        <p className="text-gray-600">Email: {user.email}</p>
                    </div>
                    <button onClick={handleLogout} className="text-red-500 hover:text-red-600 focus:outline-none">
                        <IoLogOut size={24} />
                    </button>
                </div>
                <div className="mt-4 flex justify-center">
                    <FaUserCircle size={120} color="#6B7280" />
                </div>
            </div>
        </div>
    );
}