import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../styles/colors';
import {dimensions} from '../styles/dimensions';

const CustomButton = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  variant = 'primary',
}) => {
  const getGradientColors = () => {
    switch (variant) {
      case 'secondary':
        return colors.gradient.secondary;
      case 'dark':
        return colors.gradient.dark;
      default:
        return colors.gradient.primary;
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}>
      <LinearGradient
        colors={disabled ? ['#666', '#444'] : getGradientColors()}
        style={styles.gradient}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: dimensions.borderRadius,
    overflow: 'hidden',
    marginVertical: 10,
  },
  gradient: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.text,
    fontSize: dimensions.fontSize.medium,
    fontWeight: 'bold',
  },
});

export default CustomButton;
