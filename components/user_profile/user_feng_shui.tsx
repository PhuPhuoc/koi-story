import React from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';
import dataUserFengShui from '../../dummy_data/dummy_user_feng_shui.json';

interface Koi {
  koi_id: number;
  type: string;
  color: string;
  size: string;
  old: string;
}

interface FengShui {
  year_of_birth: number;
  feng_shui: string;
  recommended_koi: Koi[];
}

const UserFengShui = () => {
  const { year_of_birth, feng_shui, recommended_koi } = dataUserFengShui as FengShui;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Feng Shui</Text>

      <Text style={styles.text}>Year of Birth: {year_of_birth}</Text>
      <Text style={styles.text}>Feng Shui Element: {feng_shui}</Text>

      {/* Koi List*/}
      <Text style={styles.subTitle}>Recommended Koi:</Text>
      <FlatList
        data={recommended_koi}
        keyExtractor={(item) => item.koi_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.koiContainer}>
            <Text style={styles.text}>Type: {item.type}</Text>
            <Text style={styles.text}>Color: {item.color}</Text>
            <Text style={styles.text}>Size: {item.size}</Text>
            <Text style={styles.text}>Old: {item.old}</Text>
          </View>
        )}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  title: {
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  koiContainer: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
});

export default UserFengShui;
