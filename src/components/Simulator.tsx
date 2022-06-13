import React, { useCallback, useState } from 'react';
import { formattedAmount } from '../helpers/formattedAmount';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SimulatorSlider from './SimulatorSlider';

const Simulator = () => {
  const [creditAmount, setCreditAmount] = useState<number>(0);
  const [installments, setInstallments] = useState<number>(1);
  const totalAmount = formattedAmount(creditAmount);
  const result = formattedAmount(creditAmount / installments);
  const minAmount = formattedAmount(1);
  const maxAmount = formattedAmount(100);

  const onCreditChange = useCallback(
    (value: number) => {
      setCreditAmount(value);
    },
    [setCreditAmount],
  );

  const onInstallmentsChange = useCallback(
    (value: number) => {
      setInstallments(value);
    },
    [setInstallments],
  );

  return (
    <View style={styles.simulatorItem}>
      <SimulatorSlider
        title="Monto Total"
        amount={totalAmount}
        dynamicValue={creditAmount}
        onAmountChange={onCreditChange}
        minAmount={minAmount}
        maxAmount={maxAmount}
      />
      <SimulatorSlider
        title="Plazo"
        amount={installments}
        dynamicValue={installments}
        onAmountChange={onInstallmentsChange}
        minAmount={minAmount}
        maxAmount={maxAmount}
      />
      <View style={styles.simulatorResult}>
        <Text style={styles.simulatorResultTitle}>Cuota fija por mes</Text>
        <Text style={styles.simulatorResultValue}>{result}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.buttonCredit}
          onPress={() => {}}>
          <Text style={styles.buttonCreditText}>Obtené crédito</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.buttonDetails}
          onPress={() => {}}>
          <Text style={styles.buttonDetailsText}>Ver detalle de cuotas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  simulatorItem: {
    width: '100%',
    paddingHorizontal: 20,
  },
  simulatorResult: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#00355d',
    padding: 10,
  },
  simulatorResultTitle: {
    fontSize: 14,
    color: '#fff',
    textTransform: 'uppercase',
  },
  simulatorResultValue: {
    fontSize: 18,
    color: '#fff',
  },
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

export default Simulator;
