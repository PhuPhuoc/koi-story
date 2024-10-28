import React, { useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";

const RecommendPage = () => {
  const link =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7xEokJSMqs--m0NL2SGgWqpsc4ux5Xpwv8g&s";
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
          max-height: 500px;
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
      <h1>The Importance of Good Typography</h1>
      <p>
        Typography plays a crucial role in design, affecting readability and user experience. A well-chosen typeface can convey a brand's personality, while poor typography can detract from even the best design. In this blog post, we will explore various typefaces and their impact on communication.
      </p>
      <img src="${link}" alt="Typography" />
      
      <h2>Color Theory in Design</h2>
      <p>
        Understanding color theory is essential for any designer. Colors evoke emotions and can influence decision-making. This post discusses how to choose color palettes that resonate with your target audience and create visually appealing designs.
      </p>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvEYnxugqvXMcuXWmIxP5OfhtSMyJFjno0Tg&s" alt="Color Theory" />
      
      <h2>Designing for User Experience</h2>
      <p>
        User experience (UX) is at the heart of successful design. This blog post will delve into the principles of UX design and how to create intuitive interfaces that enhance user satisfaction. We will also share some best practices to keep in mind when designing for usability.
      </p>
      <img src="https://i.pinimg.com/236x/81/63/78/81637861f1566bb718979b454ce94eed.jpg" alt="User Experience" />
      
      <h2>The Impact of Visual Hierarchy</h2>
      <p>
        Visual hierarchy is crucial in guiding users through content. This entry explores how to structure content effectively to improve user comprehension and engagement.
      </p>
      <img src="https://i.pinimg.com/236x/46/45/43/464543d7ee4269313c8b72b9816dfa69.jpg" alt="Visual Hierarchy" />
      
      <h2>Exploring Minimalist Design</h2>
      <p>
        Minimalism in design emphasizes simplicity and clarity. This blog discusses the principles of minimalist design and how to apply them to create clean and effective interfaces.
      </p>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdPRkX-LWJF5Q20yssHr3JXaaleTHe-MHprA&s" alt="Minimalist Design" />
      
      <p class="bottom">
        Enjoy our insights into design and creativity through these blog posts. Thank you for reading!
      </p>
    </body>
  </html>
`);

  if (!htmlContent) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: htmlContent }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default RecommendPage;
