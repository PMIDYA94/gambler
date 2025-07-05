import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useAuth} from '../../context/AuthContext';
import {colors} from '../../styles/colors';
import {globalStyles} from '../../styles/globalStyles';
import {dimensions} from '../../styles/dimensions';

const PaymentsScreen = () => {
  const [addAmount, setAddAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const {user, updateBalance} = useAuth();

  const handleAddAmount = () => {
    const amount = parseFloat(addAmount);
    if (!amount || amount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount');
      return;
    }

    updateBalance(user.balance + amount);
    Alert.alert('Success', `${amount} added to your balance!`);
    setAddAmount('');
  };

  const handleWithdrawAmount = () => {
    const amount = parseFloat(withdrawAmount);
    if (!amount || amount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount');
      return;
    }

    if (amount > user.balance) {
      Alert.alert('Insufficient Balance', 'You don\'t have enough balance to withdraw');
      return;
    }

    updateBalance(user.balance - amount, amount);
    Alert.alert('Success', `${amount} withdrawn successfully!`);
    setWithdrawAmount('');
  };

  return (
    <LinearGradient colors={colors.gradient.dark} style={globalStyles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={globalStyles.title}>💰 Payments</Text>
        </View>

        {/* Balance Overview */}
        <View style={globalStyles.card}>
          <View style={styles.balanceContainer}>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceLabel}>Total Balance</Text>
              <Text style={styles.balanceAmount}>${user?.balance || 0}</Text>
            </View>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceLabel}>Total Withdrawn</Text>
              <Text style={styles.withdrawnAmount}>${user?.totalWithdrawn || 0}</Text>
            </View>
          </View>
        </View>

        {/* Add Amount Section */}
        <View style={globalStyles.card}>
          <Text style={styles.sectionTitle}>💳 Add Amount</Text>
          <CustomInput
            label="Amount to Add"
            value={addAmount}
            onChangeText={setAddAmount}
            placeholder="Enter amount"
            keyboardType="numeric"
            leftIcon="add-circle"
          />
          <CustomButton
            title="Add Amount"
            onPress={handleAddAmount}
            variant="primary"
            style={styles.button}
          />
          <Text style={styles.note}>
            * This is a demo. No real money is involved.
          </Text>
        </View>

        {/* Withdraw Amount Section */}
        <View style={globalStyles.card}>
          <Text style={styles.sectionTitle}>💸 Withdraw Amount</Text>
          <CustomInput
            label="Amount to Withdraw"
            value={withdrawAmount}
            onChangeText={setWithdrawAmount}
            placeholder="Enter amount"
            keyboardType="numeric"
            leftIcon="remove-circle"
          />
          <CustomButton
            title="Withdraw Amount"
            onPress={handleWithdrawAmount}
            variant="secondary"
            style={styles.button}
          />
          <Text style={styles.note}>
            * Withdrawal requires minimum balance of $10
          </Text>
        </View>

        {/* Transaction History */}
        <View style={globalStyles.card}>
          <Text style={styles.sectionTitle}>📊 Quick Stats</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Available Balance</Text>
              <Text style={styles.statValue}>${user?.balance || 0}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Lifetime Winnings</Text>
              <Text style={styles.statValue}>$0</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Games Played</Text>
              <Text style={styles.statValue}>0</Text>
            </View>
          </View>
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
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceItem: {
    flex: 1,
    alignItems: 'center',
  },
  balanceLabel: {
    color: colors.textSecondary,
    fontSize: dimensions.fontSize.medium,
    marginBottom: 5,
  },
  balanceAmount: {
    color: colors.success,
    fontSize: dimensions.fontSize.xlarge,
    fontWeight: 'bold',
  },
  withdrawnAmount: {
    color: colors.primary,
    fontSize: dimensions.fontSize.xlarge,
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: colors.primary,
    fontSize: dimensions.fontSize.large,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    marginTop: 15,
  },
  note: {
    color: colors.textSecondary,
    fontSize: dimensions.fontSize.small,
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 15,
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: dimensions.fontSize.small,
    marginBottom: 5,
  },
  statValue: {
    color: colors.text,
    fontSize: dimensions.fontSize.medium,
    fontWeight: 'bold',
  },
});

export default PaymentsScreen;