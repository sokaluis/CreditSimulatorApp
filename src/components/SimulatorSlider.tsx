import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';

interface SimulatorItemProps {
  title: string;
  amount: string | number;
  onAmountChange: (value: number) => void;
  dynamicValue: number;
  minAmount: string;
  maxAmount: string;
}

const SimulatorSlider = ({
  title,
  amount,
  dynamicValue,
  onAmountChange,
  minAmount,
  maxAmount,
}: SimulatorItemProps) => (
  <>
    <View style={styles.simulatorItemTitle}>
      <Text style={styles.simulatorItemTotalAmount}>{title}</Text>
      <Text style={styles.simulatorItemValue}>{amount}</Text>
    </View>
    <View style={styles.simulatorSlider}>
      <Slider
        value={dynamicValue}
        onValueChange={value => onAmountChange(Number(value))}
        maximumValue={5000}
        minimumValue={0}
        thumbTouchSize={{ width: 50, height: 50 }}
        containerStyle={styles.slider}
        step={10}
      />
      <View style={styles.sliderRange}>
        <Text style={styles.rangeValues}>{minAmount}</Text>
        <Text style={styles.rangeValues}>{maxAmount}</Text>
      </View>
    </View>
  </>
);

const styles = StyleSheet.create({
  simulatorItemTitle: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  simulatorItemTotalAmount: {
    fontSize: 18,
    color: '#fff',
  },
  simulatorItemValue: {
    fontSize: 18,
    color: '#fff',
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 10,
    textAlign: 'center',
    minWidth: 100,
  },
  simulatorSlider: {},
  slider: {
    marginHorizontal: 10,
    maxHeight: 20,
  },
  sliderRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rangeValues: {
    fontSize: 12,
    color: '#fff',
  },
});

export default React.memo(SimulatorSlider);
