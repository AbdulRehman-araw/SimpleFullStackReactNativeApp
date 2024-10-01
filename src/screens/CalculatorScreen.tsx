import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';

export default function CalculatorScreen() {
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [operation, setOperation] = useState<string>('add');
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const calculate = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('https://calculatorapi-production-62c4.up.railway.app/calculate', {
        num1: num1,
        num2: num2,
        operation: operation,
      });

      // Assuming the API returns the result in a structure like { result: <value> }
      setResult(response.data.result);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const getOperationIcon = () => {
    switch (operation) {
      case 'add': return 'plus';
      case 'subtract': return 'minus';
      case 'multiply': return 'multiplication';
      default: return 'calculator';
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Calculator</Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Number 1"
            placeholderTextColor={'#2D3748'}
            keyboardType="numeric"
            onChangeText={setNum1}
            value={num1}
            style={styles.input}
          />
          <Icon name={getOperationIcon()} size={24} color="#4A5568" style={styles.operationIcon} />
          <TextInput
            placeholder="Number 2"
            placeholderTextColor={'#2D3748'}
            keyboardType="numeric"
            onChangeText={setNum2}
            value={num2}
            style={styles.input}
          />
        </View>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={operation}
            onValueChange={(itemValue) => setOperation(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Add" value="add" />
            <Picker.Item label="Subtract" value="subtract" />
            <Picker.Item label="Multiply" value="multiply" />
          </Picker>
        </View>
        <TouchableOpacity
          style={styles.calculateButton}
          onPress={calculate}
          disabled={loading || !num1 || !num2}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Icon name="calculator" size={24} color="#FFFFFF" style={styles.buttonIcon} />
              <Text style={styles.buttonText}>Calculate</Text>
            </>
          )}
        </TouchableOpacity>
        {error && <Text style={styles.errorText}>{error}</Text>}
        {result !== null && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Result:</Text>
            <Text style={styles.resultValue}>{result}</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#2D3748',
  },
  operationIcon: {
    marginHorizontal: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    color:'#2D3748'
  },
  calculateButton: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#E53E3E',
    marginTop: 12,
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 18,
    color: '#4A5568',
    marginBottom: 8,
  },
  resultValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2D3748',
  },
});