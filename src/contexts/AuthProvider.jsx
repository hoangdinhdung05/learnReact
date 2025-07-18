// src/providers/AuthProvider.js
import React, { useState, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import api from '../utils/api'; 

export const AuthProvider = ({ children }) => { // This is a named export, which is correct
    // ... (your existing AuthProvider code)
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    const [loading, setLoading] = useState(true);

    const login = async (username, password) => {
        try {
            const response = await api.post('/auth/login', { username, password });
            const { accessToken, userId, username: userUsername, roles } = response.data;
            
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('user', JSON.stringify({ userId, username: userUsername, roles }));

            setAccessToken(accessToken);
            setUser({ userId, username: userUsername, roles });
            return response.data;
        } catch (error) {
            console.error("Login failed in AuthProvider:", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        setUser(null);
        setAccessToken(null);
    };

    useEffect(() => {
        const storedAccessToken = localStorage.getItem('accessToken');
        const storedUser = localStorage.getItem('user');
        if (storedAccessToken && storedUser) {
            try {
                setUser(JSON.parse(storedUser));
                setAccessToken(storedAccessToken);
            } catch (e) {
                console.error("Failed to parse user from localStorage", e);
                logout();
            }
        }
        setLoading(false);
    }, []);

    const value = {
        user,
        accessToken,
        isLoggedIn: !!user,
        login,
        logout,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
            {loading && <div>Loading authentication...</div>}
        </AuthContext.Provider>
    );
};