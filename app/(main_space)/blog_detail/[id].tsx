import { Stack, useGlobalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import WebView from "react-native-webview";

interface data {
  content: string;
}

const DetailPage = () => {
  const { id } = useGlobalSearchParams();
  const [data, setData] = useState<data>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://api.koistory.site/api/v1/post-blog/${id}`
        );
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const htmlTemplate = (content: string) => `
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
        ${content}
      </body>
    </html>
  `;

  const htmlContent = data ? htmlTemplate(data.content) : null;

  if (loading || !htmlContent) {
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
};

export default DetailPage;
