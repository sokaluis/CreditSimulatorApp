import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
// Core
import { formattedAmount, unFormattedAmount } from '../helpers/formattedAmount';

interface SimulatorItemProps {
  title: string;
  onAmountChange: (value: number) => void;
  dynamicValue: number;
  minAmount: string;
  maxAmount: string;
  notACurrency?: boolean;
}

const SimulatorSlider = ({
  title,
  dynamicValue,
  onAmountChange,
  minAmount,
  maxAmount,
  notACurrency,
  ...props
}: SimulatorItemProps) => {
  const totalAmount = formattedAmount(dynamicValue);
  const [inputValue, setInputValue] = useState<string>(totalAmount);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const onChangeInput = (value: string) => {
    if (value.length === 1 && !notACurrency) {
      console.log('onChangeInput', value);
      setInputValue(`$${value}`);
    } else {
      setInputValue(value);
    }
    if (isEditing) {
      setInputValue(Number(value).toFixed(0));
    }
    onAmountChange(unFormattedAmount(value));
  };

  const onFocusInput = () => {
    setIsEditing(true);
    if (notACurrency) {
      return setInputValue(dynamicValue.toString());
    }
    setInputValue(totalAmount);
  };

  const onBlurInput = () => {
    if (notACurrency) {
      return setInputValue(dynamicValue.toString());
    }
    setInputValue(totalAmount);
    setIsEditing(false);
  };

  useEffect(() => {
    setInputValue(totalAmount);
  }, [totalAmount]);

  return (
    <>
      <View style={styles.simulatorItemTitle}>
        <Text style={styles.simulatorItemTotalAmount}>{title}</Text>
        <TextInput
          value={notACurrency ? dynamicValue.toFixed(0).toString() : inputValue}
          onChangeText={onChangeInput}
          onFocus={onFocusInput}
          onBlur={onBlurInput}
          style={styles.simulatorItemValue}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.simulatorSlider}>
        <Slider
          value={dynamicValue}
          onValueChange={value => onAmountChange(Number(value))}
          thumbTouchSize={{ width: 50, height: 50 }}
          containerStyle={styles.slider}
          maximumValue={
            !notACurrency ? unFormattedAmount(maxAmount) : Number(maxAmount)
          }
          minimumValue={
            !notACurrency ? unFormattedAmount(minAmount) : Number(minAmount)
          }
          {...props}
        />
        <View style={styles.sliderRange}>
          <Text style={styles.rangeValues}>{minAmount}</Text>
          <Text style={styles.rangeValues}>{maxAmount}</Text>
        </View>
      </View>
    </>
  );
};

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
