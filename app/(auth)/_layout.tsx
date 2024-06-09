import React from 'react'
import { Redirect, Stack } from 'expo-router'
import 'react-native-gesture-handler';
import { useAuth } from '../provider/AuthProvider';
export default function _layout() {
    const { user } = useAuth()
    if (user) {
        return <Redirect href={"/(home)"} />
    }
    return (
        <Stack>
            <Stack.Screen name="RegistrationScreen" options={{
                headerTitle: 'Create Account',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#6200ee' },
                headerTintColor: '#fff',
                presentation: "modal",

            }} />
            <Stack.Screen name="login" options={{
                headerTitle: "Login",
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#6200ee' },
                headerTintColor: '#fff',
                // headerRight: () => <Image
                //     source={{ uri: './splash-screen.png' }}
                //     style={{ width: 30, height: 30, marginRight: 10 }}
                // />,
            }} />
        </Stack>
    )
}