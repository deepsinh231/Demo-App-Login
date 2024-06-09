import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text, Card, RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { Redirect } from 'expo-router';
const RegistrationScreen: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [userType, setUserType] = useState('');
    const [loading, setLoading] = useState(false);
    const [account, setAccount] = useState(false);

    const handleRegister = async () => {
        if (!firstName || !lastName || !email || !password || !rePassword) {
            Alert.alert('Error', 'Please fill all fields.');
            return;
        }

        if (!isValidEmail(email)) {
            Alert.alert('Error', 'Please enter a valid email address.');
            return;
        }

        if (password !== rePassword) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch('http://192.168.31.117:3000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                    userType, // You may customize this based on your requirements
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.error.includes('Email already exists')) {
                    Alert.alert('Error', 'Email is already registered.');
                } else {
                    throw new Error('Failed to register');
                }
                return;
            }

            const responseData = await response.json();
            Alert.alert('Success', responseData.message);
            if (responseData) {
                setFirstName("")
                setLastName("")
                setEmail("")
                setPassword("")
                setRePassword("")
                setUserType("")
                setAccount(true)
            }
        } catch (error) {
            Alert.alert('Error', (error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    const isValidEmail = (email: string): boolean => {
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    if (account) {
        return <Redirect href={"/"} />
    }
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Card style={styles.card}>
                    <Card.Title title="Create New Account " titleStyle={styles.title} />
                    <Card.Content>
                        <TextInput
                            label="First Name"
                            value={firstName}
                            onChangeText={setFirstName}
                            style={styles.input}
                            mode="outlined"
                        />
                        <TextInput
                            label="Last Name"
                            value={lastName}
                            onChangeText={setLastName}
                            style={styles.input}
                            mode="outlined"
                        />
                        <TextInput
                            label="Email"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                            mode="outlined"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <TextInput
                            label="Password"
                            value={password}
                            onChangeText={setPassword}
                            style={styles.input}
                            mode="outlined"
                            secureTextEntry
                        />
                        <TextInput
                            label="Re-enter Password"
                            value={rePassword}
                            onChangeText={setRePassword}
                            style={styles.input}
                            mode="outlined"
                            secureTextEntry
                        />
                        <View style={styles.pickerContainer}>
                            <Text style={styles.pickerLabel}>User Type</Text>
                            <Picker
                                selectedValue={userType}
                                onValueChange={(itemValue) => setUserType(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item label="Admin" value="Admin" />
                                <Picker.Item label="Student" value="Student" />
                                <Picker.Item label="Teacher" value="Teacher" />
                            </Picker>
                        </View>
                        <View style={styles.radioContainer}>
                            <Text>User Type</Text>
                            <RadioButton.Group onValueChange={value => setUserType(value)} value={userType}>
                                <View style={styles.radioButton}>
                                    <RadioButton value="Admin" />
                                    <Text>Admin</Text>
                                </View>
                                <View style={styles.radioButton}>
                                    <RadioButton value="Student" />
                                    <Text>Student</Text>
                                </View>
                                <View style={styles.radioButton}>
                                    <RadioButton value="Teacher" />
                                    <Text>Teacher</Text>
                                </View>
                            </RadioButton.Group>
                        </View>
                        <Button mode="contained" onPress={handleRegister} loading={loading} style={styles.button}>
                            Register
                        </Button>
                    </Card.Content>
                </Card>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    card: {
        padding: 20,
        marginVertical: 20,
    },
    radioContainer: {
        flexDirection: 'column',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        marginBottom: 20,
    },
    pickerContainer: {
        marginBottom: 20,
    },
    pickerLabel: {
        fontSize: 16,
        marginBottom: 5,
        color: '#695C5C',
    },
    picker: {
        height: 50,
        width: '100%',
    },
    button: {
        marginTop: 20,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default RegistrationScreen;
