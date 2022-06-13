import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// Components
import Simulator from '../components/Simulator';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.simulator}>
        <Text style={styles.simulatorTitle}>Simulá tu crédito</Text>
        <Simulator />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#094f85',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  simulator: {
    width: '100%',
    backgroundColor: '#003b67',
  },
  simulatorTitle: {
    fontSize: 24,
    color: '#fff',
    marginVertical: 20,
    textAlign: 'center',
  },
});

export default HomeScreen;
