import React, { useCallback, useEffect, useState } from 'react';
import { formattedAmount, unFormattedAmount } from '../helpers/formattedAmount';
import { Alert, Button, Modal, StyleSheet, Text, View } from 'react-native';
// Components
import SimulatorSlider from './SimulatorSlider';
import SimulatorButtonGroup from './SimulatorButtonGroup';

const Simulator = () => {
  const [creditAmount, setCreditAmount] = useState<number>(500);
  const [installments, setInstallments] = useState<number>(2);
  const [result, setResult] = useState<string>(formattedAmount(0));
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isModalInstallments, setModalInstallments] = useState<boolean>(false);
  const minCreditAmount = formattedAmount(500);
  const maxCreditAmount = formattedAmount(50000);
  const minInstallments = 2;
  const maxInstallments = 24;

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

  const calculate = useCallback(() => {
    const total = creditAmount / installments;
    setResult(formattedAmount(total, 2));
  }, [creditAmount, installments]);

  const onModalVisible = useCallback(() => {
    setIsModalVisible(!isModalVisible);
  }, [isModalVisible]);

  const alertCredit = useCallback(
    () =>
      Alert.alert(
        'Error en el monto',
        'Ingresaste un monto mayor al permitido',
        [
          {
            text: 'OK',
            onPress: () => {
              setCreditAmount(unFormattedAmount(minCreditAmount));
              setInstallments(minInstallments);
            },
          },
        ],
      ),
    [minCreditAmount],
  );

  useEffect(() => {
    if (
      creditAmount > unFormattedAmount(maxCreditAmount) ||
      installments > maxInstallments
    ) {
      alertCredit();
    }
  }, [alertCredit, creditAmount, installments, maxCreditAmount]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  return (
    <View style={styles.simulatorItem}>
      <SimulatorSlider
        title="Monto Total"
        dynamicValue={creditAmount}
        onAmountChange={onCreditChange}
        minAmount={minCreditAmount}
        maxAmount={maxCreditAmount}
      />
      <SimulatorSlider
        title="Plazo"
        notACurrency
        dynamicValue={installments}
        onAmountChange={onInstallmentsChange}
        minAmount={Number(minInstallments).toFixed(0)}
        maxAmount={Number(maxInstallments).toFixed(0)}
      />
      <View style={styles.simulatorResult}>
        <Text style={styles.simulatorResultTitle}>Cuota fija por mes</Text>
        <Text style={styles.simulatorResultValue}>{result}</Text>
      </View>
      <SimulatorButtonGroup
        onPress={onModalVisible}
        onPressInstallments={() => setModalInstallments(true)}
      />
      <Modal
        visible={isModalVisible}
        onRequestClose={onModalVisible}
        animationType="fade"
        transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Felicidades ten han aprobado el crédito de ${creditAmount} 😎 👌
              💰
            </Text>
            <Button title="Cerrar" onPress={onModalVisible} />
          </View>
        </View>
      </Modal>
      <Modal
        visible={isModalInstallments}
        onRequestClose={() => setModalInstallments(false)}
        animationType="fade"
        transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Tenes {installments} cuotas de {result} cada mes sin intereses
            </Text>
            <Button
              title="Cerrar"
              onPress={() => setModalInstallments(false)}
            />
          </View>
        </View>
      </Modal>
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
    fontSize: 12,
    color: '#fff',
    textTransform: 'uppercase',
  },
  simulatorResultValue: {
    fontSize: 25,
    color: '#fff',
  },
  installmentDetails: {
    width: '100%',
    marginTop: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: '#00355d',
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Simulator;
