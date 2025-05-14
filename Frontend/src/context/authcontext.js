import React, { createContext, useState, useEffect } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    
    // Check if user is logged in on component mount
    useEffect(() => {
        // Check localStorage, cookies, or your authentication service
        const token = localStorage.getItem('token');
        if (token) {
            // Validate token or fetch user data if needed
            setIsLoggedIn(true);
            // You might want to fetch user data here
            // fetchUserData(token).then(userData => setUser(userData));
        }
    }, []);
    
    // Login function
    const login = (userData, token) => {
        localStorage.setItem('token', token);
        setUser(userData);
        setIsLoggedIn(true);
    };
    
    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsLoggedIn(false);
    };
    
    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};