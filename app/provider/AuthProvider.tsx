import React, { createContext, useContext, useEffect, useState, PropsWithChildren } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the shape of the user object
interface User {
    email: string;
    token: string;
    // Add other user properties as needed
}

// Define the shape of the auth context
interface AuthContextType {
    user: User | null;
    login: (email: string, token: string, password: string) => Promise<void>;
    logout: () => void;
}

// Create the initial context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to access the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Auth provider component
export const AuthProvider: React.FC = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);

    // Function to handle login
    const login = async (email: string, password: string, token: string,) => {
        // Add your login logic here
        // For example, authenticate user with backend API
        // If successful, update the user state and store user data in AsyncStorage
        const userData: User = { email, token }; // Mock user data, replace with actual data
        setUser(userData);
        await AsyncStorage.setItem('user', JSON.stringify(userData));
    };

    // Function to handle logout
    const logout = async () => {
        // Remove user data from AsyncStorage and update the user state
        await AsyncStorage.removeItem('user');
        setUser(null);
    };

    // Load user data from AsyncStorage when component mounts
    useEffect(() => {
        const loadUser = async () => {
            try {
                const userDataString = await AsyncStorage.getItem('user');
                if (userDataString) {
                    const userData: User = JSON.parse(userDataString);
                    setUser(userData);
                }
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        };
        loadUser();
    }, []);

    // Provide the auth context value to its children
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
