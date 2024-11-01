import { Stack, useGlobalSearchParams } from "expo-router"
import { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native"
import WebView from "react-native-webview";

const DetailPage = () => {
    const { id } = useGlobalSearchParams()
    const link = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7xEokJSMqs--m0NL2SGgWqpsc4ux5Xpwv8g&s";
    const [htmlContent, setHtmlContent] = useState<string | null>(`
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif; 
            margin: 0; 
            padding: 20px; 
            background-color: #f4f4f9;
            color: #444;
          }
          h1 {
            font-size: 2.5em; 
            color: #4a90e2; 
            margin-bottom: 10px;
          }
          h2 {
            font-size: 3em; 
            margin-top: 20px; 
            margin-bottom: 10px;
          }
          p {
            font-size: 3em; 
            line-height: 1.6; 
            margin-bottom: 20px;
          }
          img {
            width: 100%;  
            height: auto;
            border-radius: 25px; 
            margin: 10px auto; 
            display: block;
          }
          .bottom {
            margin-bottom: 250px;
          }
        </style>
      </head>
      <body>
        <h2><strong>Sell Koi</strong></h2><p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><p><img src="https://firebasestorage.googleapis.com/v0/b/nextbean-b48cc.appspot.com/o/admin%2FA.jpg?alt=media&amp;token=a943c9ba-bcf0-446b-b047-80902b11bdd2"></p><h2><strong>Description</strong></h2><p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.<img src="https://firebasestorage.googleapis.com/v0/b/nextbean-b48cc.appspot.com/o/admin%2Fbackground_login.png?alt=media&amp;token=cd9ea7da-fd26-4ea1-b723-b30647f7db95"></p>
      </body>
    </html>
  `);
  
    if (!htmlContent) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
  
    return (
      <View style={{ flex: 1 }}>
         <Stack.Screen options={{ title: "blog" }} />
        <WebView
          originWhitelist={["*"]}
          source={{ html: htmlContent }}
          style={{ flex: 1 }}
        />
      </View>
    );
}

export default DetailPage
