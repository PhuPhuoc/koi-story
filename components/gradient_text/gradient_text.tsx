import React, { useState } from 'react';
import { Text, StyleSheet, TextProps, TextStyle } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

interface GradientTextProps extends TextProps {
    size: number;
    style?: TextStyle;
    colors?: string[];
}

const GradientText: React.FC<GradientTextProps> = ({
    size,
    style,
    colors = ['#4c669f', '#3b5998', '#192f6a'],
    ...props
}) => {
    const [textHeight, setTextHeight] = useState(0);

    return (
        <MaskedView
            maskElement={
                <Text
                    {...props}
                    style={[styles.text, style, { fontSize: size }]}
                    onLayout={(event) => {
                        const { height } = event.nativeEvent.layout;
                        setTextHeight(height);
                    }}
                />
            }
        >
            <LinearGradient
                colors={colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ height: textHeight }}
            >
                <Text {...props} style={[styles.text, style, { opacity: 0, fontSize: size }]} />
            </LinearGradient>
        </MaskedView>
    );
};

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
    },
});

export default GradientText;
