import React from 'react';
import { SafeAreaView } from 'react-native';
import LoaderScreen from './components/LoaderScreen'; // Import the LoaderScreen component
import { Redirect } from 'expo-router';
import "react-native-gesture-handler"
export default function App() {
  return (
    <Redirect href={'/(auth)/login'} />

  );
}
