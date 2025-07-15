import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../styles/colors';
import {dimensions} from '../styles/dimensions';

const CountdownTimer = ({onComplete}) => {
  const [timeLeft, setTimeLeft] = useState(60); // 5 minutes in seconds

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      onComplete();
      setTimeLeft(60); // Reset timer
    }
  }, [timeLeft, onComplete]);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Next Roll In:</Text>
      <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.surface,
    borderRadius: dimensions.borderRadius,
    margin: 10,
  },
  label: {
    color: colors.textSecondary,
    fontSize: dimensions.fontSize.medium,
    marginBottom: 5,
  },
  timer: {
    color: colors.primary,
    fontSize: dimensions.fontSize.xlarge,
    fontWeight: 'bold',
  },
});

export default CountdownTimer;
