import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AnimatedDice from '../../components/AnimatedDice';
import CountdownTimer from '../../components/CountdownTimer';
import CustomButton from '../../components/CustomButton';
import CustomInput from '../../components/CustomInput';
import {useAuth} from '../../context/AuthContext';
import {colors} from '../../styles/colors';
import {globalStyles} from '../../styles/globalStyles';
import {dimensions} from '../../styles/dimensions';

const DashboardScreen = () => {
  const [selectedNumber, setSelectedNumber] = useState('');
  const [diceResult, setDiceResult] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [lastResult, setLastResult] = useState(null);
  const [isNumberSelected, setIsNumberSelected] = useState(false);
  const {user, updateBalance} = useAuth();

  const handleNumberSelect = () => {
    const number = parseInt(selectedNumber);
    if (number < 1 || number > 100) {
      Alert.alert('Invalid Number', 'Please select a number between 1 and 100');
      return;
    }
    setIsNumberSelected(true);
    Alert.alert('Number Selected', `You selected ${number}. Wait for the dice roll!`);
  };

  const handleDiceRoll = () => {
    setIsRolling(true);
    
    // Simulate dice roll after 3 seconds
    setTimeout(() => {
      const result = Math.floor(Math.random() * 100) + 1;
      setDiceResult(result);
      setIsRolling(false);
      
      // Check if player won
      if (parseInt(selectedNumber) === result) {
        const winAmount = 500;
        updateBalance(user.balance + winAmount);
        Alert.alert('🎉 Congratulations!', `You won ${winAmount}!`);
      } else {
        Alert.alert('Try Again', `The dice showed ${result}. Better luck next time!`);
      }
      
      setLastResult({
        diceNumber: result,
        userNumber: parseInt(selectedNumber),
        won: parseInt(selectedNumber) === result,
      });
      
      // Reset for next round
      setSelectedNumber('');
      setIsNumberSelected(false);
    }, 3000);
  };

  return (
    <LinearGradient colors={colors.gradient.dark} style={globalStyles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={globalStyles.title}>🎲 Dice Roll Game</Text>
          <Text style={styles.balance}>Balance: ${user?.balance || 0}</Text>
        </View>

        <View style={globalStyles.card}>
          <Text style={styles.gameDescription}>
            Select a number between 1-100. If the dice matches your number, you win $500!
          </Text>
        </View>

        <View style={globalStyles.card}>
          <CustomInput
            label="Select Your Number (1-100)"
            value={selectedNumber}
            onChangeText={setSelectedNumber}
            placeholder="Enter a number"
            keyboardType="numeric"
            leftIcon="casino"
          />
          
          <CustomButton
            title="Confirm Number"
            onPress={handleNumberSelect}
            disabled={!selectedNumber || isNumberSelected}
            style={styles.button}
          />
          
          {isNumberSelected && (
            <Text style={styles.selectedText}>
              ✅ Your number: {selectedNumber}
            </Text>
          )}
        </View>

        <View style={globalStyles.card}>
          <AnimatedDice isRolling={isRolling} result={diceResult} />
          
          <CountdownTimer onComplete={handleDiceRoll} />
          
          {lastResult && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>Last Round Result:</Text>
              <Text style={styles.resultText}>
                Dice: {lastResult.diceNumber} | Your Number: {lastResult.userNumber}
              </Text>
              <Text style={[
                styles.resultStatus,
                {color: lastResult.won ? colors.success : colors.error}
              ]}>
                {lastResult.won ? '🎉 You Won!' : '😔 Try Again'}
              </Text>
            </View>
          )}
        </View>

        <View style={globalStyles.card}>
          <Text style={styles.howToPlay}>How to Play:</Text>
          <Text style={styles.instruction}>1. Select a number between 1-100</Text>
          <Text style={styles.instruction}>2. Wait for the automatic dice roll (every 5 minutes)</Text>
          <Text style={styles.instruction}>3. Win $500 if your number matches!</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  balance: {
    fontSize: dimensions.fontSize.large,
    color: colors.primary,
    fontWeight: 'bold',
    marginTop: 10,
  },
  gameDescription: {
    color: colors.text,
    fontSize: dimensions.fontSize.medium,
    textAlign: 'center',
    lineHeight: 24,
  },
  button: {
    marginTop: 15,
  },
  selectedText: {
    color: colors.success,
    fontSize: dimensions.fontSize.medium,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
    padding: 15,
    backgroundColor: colors.background,
    borderRadius: dimensions.borderRadius,
  },
  resultTitle: {
    color: colors.primary,
    fontSize: dimensions.fontSize.medium,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultText: {
    color: colors.text,
    fontSize: dimensions.fontSize.medium,
    marginBottom: 5,
  },
  resultStatus: {
    fontSize: dimensions.fontSize.large,
    fontWeight: 'bold',
  },
  howToPlay: {
    color: colors.primary,
    fontSize: dimensions.fontSize.large,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  instruction: {
    color: colors.text,
    fontSize: dimensions.fontSize.medium,
    marginBottom: 8,
    paddingLeft: 10,
  },
});

export default DashboardScreen;