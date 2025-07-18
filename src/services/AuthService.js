import api from '../utils/api';

export const loginUser = async (username, password) => {
    try {

        const response = await api.post('auth/login', { username, password });
        return response;

    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

