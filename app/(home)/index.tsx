// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Text, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
// import { useAuth } from '../provider/AuthProvider'; // Import the useAuth hook

// const HomeScreen: React.FC = () => {
//     const { user, logout } = useAuth(); // Access the user and logout function from the auth context
//     const [userInfo, setUserInfo] = useState<{ fullName: string; userType: string } | null>(null);
//     useEffect(() => {
//         const fetchUserInfo = async () => {
//             try {
//                 // Make a request to your backend API to fetch user info based on authentication token
//                 const response = await fetch('http://192.168.31.117:3000/user-info', {
//                     method: 'GET',
//                     headers: {
//                         Authorization: `Bearer ${user?.token}`,
//                     },
//                 });

//                 if (!response.ok) {
//                     throw new Error('Failed to fetch user info');
//                 }

//                 const data = await response.json();
//                 setUserInfo(data); // Set the user info in state
//             } catch (error) {
//                 console.error('Failed to fetch user info:', (error as Error).message);
//                 Alert.alert('Error', 'Failed to fetch user info');
//             }
//         };

//         if (user) {
//             fetchUserInfo();
//         }
//     }, [user]);

//     const handleLogout = async () => {
//         try {
//             await logout(); // Call the logout function
//             // After logout, you can navigate to the login screen or perform any other action
//         } catch (error) {
//             console.error('Logout failed:', (error as Error).message);
//         }
//     };
//     return (
//         <SafeAreaView style={styles.container}>
//             <View>
//                 <Text>Welcome, {userInfo?.fullName}</Text>
//                 <Text>User Type: {userInfo?.userType}</Text>
//                 <TouchableOpacity style={styles.button} onPress={handleLogout}>
//                     <Text>Logout</Text>
//                 </TouchableOpacity>
//             </View>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     button: {
//         backgroundColor: '#007bff',
//         paddingVertical: 12,
//         paddingHorizontal: 50,
//         borderRadius: 5,
//         marginTop: 20,
//     },
// });

// export default HomeScreen;

import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../provider/AuthProvider';
import { Alert, Text, TouchableOpacity } from 'react-native';
import Navigation from './Navigation';
const Tab = createBottomTabNavigator()
export default function index() {
    const { user, logout } = useAuth(); // Access the user and logout function from the auth context
    const [userInfo, setUserInfo] = useState<{ fullName: string; userType: string } | null>(null);
    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                // Make a request to your backend API to fetch user info based on authentication token
                const response = await fetch('http://192.168.31.117:3000/user-info', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${user?.token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch user info');
                }

                const data = await response.json();
                setUserInfo(data); // Set the user info in state
            } catch (error) {
                console.error('Failed to fetch user info:', (error as Error).message);
                Alert.alert('Error', 'Failed to fetch user info');
            }
        };

        if (user) {
            fetchUserInfo();
        }
    }, [user]);

    const handleLogout = async () => {
        try {
            await logout(); // Call the logout function
            // After logout, you can navigate to the login screen or perform any other action
        } catch (error) {
            console.error('Logout failed:', (error as Error).message);
        }
    };
    return (
        <Navigation />
    )
}