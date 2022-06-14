import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SimulatorButtonGroup {
  onPress: () => void;
  onPressInstallments: () => void;
}

const SimulatorButtonGroup = ({
  onPress,
  onPressInstallments,
}: SimulatorButtonGroup) => (
  <View style={styles.buttonContainer}>
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.buttonCredit}
      onPress={onPress}>
      <Text style={styles.buttonCreditText}>Obtené crédito</Text>
    </TouchableOpacity>
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.buttonDetails}
      onPress={onPressInstallments}>
      <Text style={styles.buttonDetailsText}>Ver detalle de cuotas</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonCredit: {
    width: '68%',
    padding: 10,
    backgroundColor: '#16aa8d',
    paddingRight: '2%',
  },
  buttonCreditText: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#fff',
  },
  buttonDetails: {
    width: '30%',
    padding: 7,
    backgroundColor: '#0a548b',
  },
  buttonDetailsText: {
    fontSize: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#fff',
  },
});

export default SimulatorButtonGroup;
