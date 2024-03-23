const API_BASE_URL = '';

const AuthService = {
    async login(username, password) {
        try {
            const response = await fetch (`/api/Auth/Login`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({username, password})
            });
            if(!response.ok) {
                throw new Error(`HTTP error: $response.status`);
            }
            const data = await response.json();
            localStorage.setItem('user', JSON.stringify(data));
            return data;
        } catch (error) {
            console.log('Error logging in:' + error);
            throw error;
        }
    },

    async register(username, password, email) {
        try {
            const response = await fetch(`/api/Auth/Register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password, email })
            });
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return { success: true };
        } catch (error) {
            console.log('Error during registration:', error);
            throw error;
        }
    },

    
    async logout() {
        try {
            // Perform logout action, such as clearing local storage, revoking tokens, etc.
            localStorage.removeItem('user');
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    },

    isLoggedIn() {
        // Check if a user is logged in by verifying if their credentials exist in local storage or any other relevant method
        return !!localStorage.getItem('user'); // Example: Check if 'user' exists in local storage
    }
    
};

export default AuthService;