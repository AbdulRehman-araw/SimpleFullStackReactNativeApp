import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator,
    Modal,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';

const LoginScreen = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const isValidEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleLogin = async () => {
        setError('');
        setLoading(true);

        if (!isValidEmail(email)) {
            setError('Please enter a valid email address.');
            setLoading(false);
            return;
        }

        try {
            const userData = await auth().signInWithEmailAndPassword(email, password);
            await AsyncStorage.setItem('uid', userData?.user?.uid);
            navigation.dispatch(StackActions.replace('tab'));
        } catch (e: any) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'New passwords do not match!');
            return;
        }

        try {
            // Sign in the user with their email and old password
            const userCredential = await auth().signInWithEmailAndPassword(email, oldPassword);
            const user = userCredential.user;

            // If successful, update the password
            await user.updatePassword(newPassword);
            Alert.alert('Success', 'Password has been updated successfully.');
            setModalVisible(false); // Close the modal
            setEmail('');
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (e: any) {
            if (e.code === 'auth/wrong-password') {
                Alert.alert('Error', 'Old password is incorrect!');
            } else if (e.code === 'auth/user-not-found') {
                Alert.alert('Error', 'No user found with this email!');
            } else {
                setError(e.message);
            }
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
            >
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Log in to your account</Text>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="#888"
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="#888"
                            secureTextEntry={!showPassword}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            {/* Add icon for showing/hiding password if desired */}
                        </TouchableOpacity>
                    </View>

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#FFFFFF" />
                        ) : (
                            <Text style={styles.buttonText}>Log In</Text>
                        )}
                    </TouchableOpacity>

                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>Don't have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={styles.signupLink}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => {
                        setModalVisible(true)
                        setError('')
                    }}>
                        <Text style={styles.forgotPassword}>Forgot Password?</Text>
                    </TouchableOpacity>

                    {/* Modal for Reset Password */}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalTitle}>Reset Password</Text>

                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Email"
                                        placeholderTextColor="#888"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        onChangeText={setEmail}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Old Password"
                                        placeholderTextColor="#888"
                                        secureTextEntry
                                        onChangeText={setOldPassword}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="New Password"
                                        placeholderTextColor="#888"
                                        secureTextEntry
                                        onChangeText={setNewPassword}
                                    />
                                </View>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Confirm Password"
                                        placeholderTextColor="#888"
                                        secureTextEntry
                                        onChangeText={setConfirmPassword}
                                    />
                                </View>

                                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                                <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                                    <Text style={styles.buttonText}>Reset Password</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    setModalVisible(false)
                                    setError('')
                                }}>
                                    <Text style={styles.closeModal}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F5F8',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2D2D2D',
        textAlign: 'center',
        marginBottom: 8,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        textAlign: 'center',
        marginBottom: 40,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 20,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    input: {
        flex: 1,
        height: 50,
        color: '#333',
        fontSize: 16,
        fontFamily: 'Helvetica',
    },
    eyeIcon: {
        padding: 8,
    },
    errorText: {
        color: '#FF4D4D',
        textAlign: 'center',
        marginBottom: 16,
        fontSize: 14,
    },
    button: {
        backgroundColor: '#1E1E1E',
        borderRadius: 10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#1A73E8',
        shadowOpacity: 0.4,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
        marginVertical: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
    },
    signupText: {
        color: '#666',
        fontSize: 16,
    },
    signupLink: {
        color: '#1E1E1E',
        fontWeight: '600',
        marginLeft: 5,
        fontSize: 16,
    },
    forgotPassword: {
        color: '#1E1E1E',
        fontWeight: '600',
        marginTop: 20,
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2D3748',
        textAlign: 'center',
    },
    closeModal: {
        color: '#1E1E1E',
        fontWeight: '600',
        marginTop: 10,
        textAlign: 'center',
    },
});

export default LoginScreen;
