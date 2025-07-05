import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {colors} from '../styles/colors';
import {dimensions} from '../styles/dimensions';

const AnimatedDice = ({isRolling, result}) => {
  const spinValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isRolling) {
      // Create spinning animation
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ).start();

      // Create scaling animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleValue, {
            toValue: 1.2,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      // Stop animations
      spinValue.stopAnimation();
      scaleValue.stopAnimation();

      // Reset values
      spinValue.setValue(0);
      scaleValue.setValue(1);
    }
  }, [isRolling]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.dice,
          {
            transform: [{rotate: spin}, {scale: scaleValue}],
          },
        ]}>
        <Text style={styles.diceText}>{isRolling ? '?' : result || '?'}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  dice: {
    width: 100,
    height: 100,
    backgroundColor: colors.primary,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 15,
  },
  diceText: {
    fontSize: dimensions.fontSize.xxlarge,
    fontWeight: 'bold',
    color: colors.background,
  },
});

export default AnimatedDice;
