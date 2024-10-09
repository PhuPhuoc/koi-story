import { router, Stack } from 'expo-router'
import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, Pressable } from 'react-native';
import { THEME_COLOR } from '../../../constants/const';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import GradientText from '../../../components/gradient_text/gradient_text';

const LoginPage = () => {
    const handlePressRegister = () => {
        router.push("/register/register_page")
    }
    const handlePressForgetPassword = () => {
        router.push("/forget_pass/forget_password_page")
    }
    const handlePressLogin = () => {
        router.push("/(tabs)/blog")
    }
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.imageContainer}>
                <Image
                    source={require('../../../assets/bg_login1.png')}
                    style={styles.image}
                    resizeMode="center"
                />
            </View>
            <View style={styles.formContainer}>
                <View style={styles.welcomeContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title1}>Welcome To</Text>
                        <GradientText size={28} style={styles.title2} colors={['#FA8BFF', '#2BD2FF', '#2BFF88']}>
                            Koi Story
                        </GradientText>
                        <Text style={styles.title3}>!</Text>
                    </View>
                    <Text style={styles.subtitle}>Glad to see you again</Text>
                </View>
                <View style={styles.emailPassView}>
                    <Entypo name="email" size={20} color="#CDC9C9" />
                    <View style={styles.line}></View>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.emailPassView}>
                    <MaterialCommunityIcons name="lock-check-outline" size={20} color="#CDC9C9" />
                    <View style={styles.line}></View>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                    />
                </View>

                <Pressable onPress={handlePressForgetPassword}>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                </Pressable>

                <Pressable style={styles.loginButton} onPress={handlePressLogin}>
                    <Text style={styles.loginButtonText}>LOGIN</Text>
                </Pressable>

                <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>Don't have account? </Text>
                    <Pressable onPress={handlePressRegister}>
                        <Text style={styles.registerLink}>REGISTER</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 1
    },
    imageContainer: {
        marginBottom: 20
    },
    image: {
        width: "100%",
        height: 300,
    },
    formContainer: {
        padding: 20
    },
    welcomeContainer: {
        alignItems: "flex-start",
        paddingStart: 7,
        marginBottom: 20,
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 10,
    },
    title1: {
        fontSize: 28,
        fontWeight: 'bold',
        marginEnd: 9
    },
    title2: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    title3: {
        fontSize: 28,
        fontWeight: 'bold',
        marginStart: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 30,
    },
    emailPassView: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: "#666",
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 15,
        marginBottom: 17
    },
    line: {
        backgroundColor: "#EEE9E9",
        height: "50%",
        width: 2,
        marginStart: 10,
    },
    input: {
        width: "77%",
        padding: 15,
        borderRadius: 5,
    },
    forgotPassword: {
        textAlign: 'right',
        // color: '#8B8989',
        marginBottom: 20,
        fontWeight: "bold"
    },
    loginButton: {
        backgroundColor: THEME_COLOR,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    loginButtonText: {
        fontSize: 17,
        color: 'white',
        fontWeight: 'bold',
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 20,
    },
    registerText: {
        // color: '#8B8989',
        fontWeight: "bold"
    },
    registerLink: {
        marginStart: 7,
        color: THEME_COLOR,
        fontWeight: 'bold',
        borderBottomColor: THEME_COLOR,
        borderBottomWidth: 2,
    },
});

export default LoginPage

// const LoginPage = () => {
//     return (
//         <View>
//             <Stack.Screen options={{ headerTitle: "Login Page" }} />
//             <Text>LoginPage</Text>
//             <Button onPress={() => router.push("/(tabs)/blog")} title="Login"></Button>
//             <Button onPress={() => router.push("/register/register_page")} title="Register"></Button>
//         </View>
//     )
// }
// export default LoginPage
