import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useAuth } from '../provider/AuthProvider';

const LoginScreen: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState<string>('deep@gmail.com');
  const [password, setPassword] = useState<string>('12345');
  const [emailFocused, setEmailFocused] = useState<boolean>(false);
  const [passwordFocused, setPasswordFocused] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const handleLogin = async () => {
    setEmailError(false);
    setPasswordError(false);

    if (!email.trim() || !password.trim()) {
      if (!email.trim()) setEmailError(true);
      if (!password.trim()) setPasswordError(true);
      Alert.alert('Error', 'Please enter your email and password.');
      return;
    }

    if (!isValidEmail(email.trim())) {
      setEmailError(true);
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }
    try {
      const response = await fetch('http://192.168.31.117:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const responseData = await response.json();
      Alert.alert('Success', responseData.message);
      try {
        await login(email, password, responseData.token);
      } catch (error) {
        Alert.alert('Error', (error as Error).message);
      }
      // Navigate to the main screen or perform any other actions after successful login
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }

  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleForgotPassword = () => {
    console.log('Forgot password');
  };

  // const handleCreateAccount = () => {
  //   console.log('Create new account');
  //   // Navigate to the create account screen
  //   navigation.navigate('RegistrationScreen.tsx');
  // };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* <Text style={styles.headerTitle}>Login</Text> */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[
              styles.input,
              emailError && styles.errorInput,
              { borderColor: emailFocused ? '#007bff' : '#ccc' },
            ]}
            placeholder="Enter your email"
            onChangeText={setEmail}
            value={email}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', position: "relative" }}>
            <TextInput
              style={[
                styles.input,
                passwordError && styles.errorInput,
                { borderColor: passwordFocused ? '#007bff' : '#ccc' },
              ]}
              placeholder="Enter your password"
              onChangeText={setPassword}
              value={password}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Link href={"/(auth)/RegistrationScreen"} asChild >
          <TouchableOpacity style={styles.createAccountButton}
          // onPress={handleCreateAccount}
          >
            <Text style={styles.createAccountButtonText}>Create New Account</Text>

          </TouchableOpacity>
        </Link>
        <View>
          <Text style={styles.title}>Project</Text>
          <Text style={styles.description}>Independent Consultant for Mehsana-Himatnagar four laning from Km 103+000 to Km 163+751 section of SH-55 on DBFOT Design, Build, Finance, Operate & Transfer Annuity Contract under GSHP-II for Operation Period.</Text>
        </View>
        <View>
          <Text style={styles.title}>Client Name</Text>
          <Text style={styles.description}>The Chief Engineer (World Bank)</Text>
        </View>
        <View>
          <Text style={styles.title}>Concessionaire Name</Text>
          <Text style={styles.description}>The RKC Infrabuilt (Mehsana-Himmatnagar) Road Project Private Limited</Text>
        </View>
        <View>
          <Text style={styles.title}>Consultant Name</Text>
          <Text style={styles.description}>LSR Engineering Consultancy Services</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  errorInput: {
    borderColor: '#ff0000',
  },
  label: {
    marginBottom: 5,
    fontSize: 18,
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  createAccountButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 70,
    borderRadius: 10,
    marginTop: 20,
  },
  createAccountButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    marginTop: 20,
    fontSize: 16,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  eyeIcon: {
    marginLeft: 10,
    position: "absolute",
    right:12
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
});

export default LoginScreen;
