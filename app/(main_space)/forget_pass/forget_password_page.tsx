import { View, Text, StyleSheet, TextInput, Pressable, ImageBackground, Image } from 'react-native'
import React from 'react'
import { router, Stack } from 'expo-router'
import { THEME_COLOR } from '../../../constants/const';
import Entypo from '@expo/vector-icons/Entypo';

const handleGoback = () => {
    router.back()
}

const ForgetPasswordPage = () => {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <ImageBackground
                source={require('../../../assets/forget_bg2.jpg')}
                style={styles.header}
                resizeMode="cover"
            >
                <Pressable onPress={handleGoback}>
                    <Image
                        source={require('../../../assets/icon_back1.png')}
                        style={styles.iconback}
                        resizeMode="center"

                    />
                </Pressable>
                <View style={styles.headerText}>
                    {/* <Text style={styles.feng}>Feng</Text>
                    <Text style={styles.shui}>Shui</Text> */}
                </View>
            </ImageBackground>
            <Text style={styles.title}>Password Assistance</Text>
            <Text style={styles.titleDetail}>Enter the email address associated with your Koi Story account</Text>

            <View style={styles.formContainer}>
                <View style={styles.formView}>
                    <Entypo name="email" size={20} color="#CDC9C9" />
                    <View style={styles.line}></View>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                    />
                </View>
                <Pressable style={styles.continueButton}>
                    <Text style={styles.continueButtonText}>CONTINUE</Text>
                </Pressable>

                <View style={styles.gobackContainer}>
                    <Pressable onPress={handleGoback}>
                        <Text style={styles.goback}>Go back</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingTop: 20,
        width: "100%",
        height: 350,
        borderColor: "red",
        borderWidth: 1
    },
    iconback: {
        marginTop: 35,
        marginLeft: 7,
        width: "15%",
        height: 60,
    },
    headerText: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        // marginBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        // borderColor: "red",
        // borderWidth: 1
    },
    feng: {
        fontSize: 27,
        fontWeight: "bold",
        paddingStart: 23
    },
    shui: {
        fontSize: 27,
        fontWeight: "bold",
        paddingEnd: 23
    },
    title: {
        paddingHorizontal: 30,
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 20,
    },
    titleDetail: {
        fontSize: 15,
        fontWeight: "bold",
        paddingHorizontal: 30,
        paddingVertical: 10,
    },
    formContainer: {
        marginTop: 25,
        paddingHorizontal: 20
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
    subtitle: {
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 30,
    },
    formView: {
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
    continueButton: {
        backgroundColor: THEME_COLOR,
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 30,
        alignItems: 'center',
    },
    continueButtonText: {
        fontSize: 17,
        color: 'white',
        fontWeight: 'bold',
    },
    gobackContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 20,
    },
    goback: {
        fontSize: 17,
        marginStart: 7,
        color: THEME_COLOR,
        fontWeight: 'bold',
        borderBottomColor: THEME_COLOR,
        borderBottomWidth: 2,
    },
});

export default ForgetPasswordPage;
