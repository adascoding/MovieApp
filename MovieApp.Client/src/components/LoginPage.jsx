import { useState } from "react";
import { useMovieContext } from "../store/MovieContext";
import AuthService from "../services/AuthService";

export default function LoginPage() {
    const [mode, setMode] = useState('login');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { setUser } = useMovieContext();

    const changeMode = (newMode) => {
        setMode(newMode);
        setError('');
        setSuccessMessage('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (mode === 'login') {
                const user = await AuthService.login(username, password);
                setUser(user);
                setUsername('');
                setPassword('');
                setError('');
                setSuccessMessage('Login successful');
            } else {
                if (!username || !password || !email) {
                    setError('Please fill in all fields');
                    return;
                }
                const user = await AuthService.register(username, password, email);
                setUsername('');
                setEmail('');
                setPassword('');
                setError('');
                setSuccessMessage('Registration successful');
            }
        } catch (error) {
            setError('Invalid username or password');
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <div className="sm:max-w-[360px] mx-auto">
                <div className="grid gap-4 py-4">
                    {error && <div className="text-red-500">{error}</div>}
                    {successMessage && <div className="text-green-500">{successMessage}</div>}
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="username">Username</label>
                        <input onChange={(e) => setUsername(e.target.value)} value={username} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="username" placeholder="YourUsername" required="" type="text" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="password">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="password" required="" type="password" />
                    </div>
                    {mode === 'register' && (
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="email" placeholder="m@example.com" required="" type="email" />
                        </div>
                    )}
                </div>
                <div className="text-center">
                    <button onClick={handleSubmit} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-zinc-800 text-white text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
                        {mode === 'login' ? ('Login') : ('Register')}
                    </button>
                </div>
                <div className="text-center text-sm mt-2">
                    {mode === 'login' ? (
                        <p>New user? <a onClick={() => changeMode('register')} className="text-blue-500" href="#">Register here</a></p>
                    ) : (
                        <p>Already a user? <a onClick={() => changeMode('login')} className="text-blue-500" href="#">Login here</a></p>
                    )}
                </div>
            </div>
        </div>
    );
}