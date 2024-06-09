import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator, Image } from 'react-native';

export default function LoaderScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate asynchronous task (e.g., fetching data or initializing resources)
        const loadData = async () => {
            try {
                // Simulate loading for 2 seconds
                await new Promise(resolve => setTimeout(resolve, 2000));
                setIsLoading(false); // Once loading is completed, set isLoading to false
            } catch (error) {
                console.error('Error loading data:', error);
                setIsLoading(false); // In case of error, stop loading
            }
        };

        loadData();
    }, []);

    return (
        <View style={styles.container}>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <Image source={require('../../assets/images/splash-screen.png')} style={styles.image} />
                </View>
            ) : (
                <View style={styles.content}>
                    {/* <ActivityIndicator size="large" color="#007bff" /> */}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    image: {
        width: 200, // Adjust the width and height as needed
        height: 200,
        resizeMode: 'contain', // Adjust the image's resizing mode as needed
    },
});
