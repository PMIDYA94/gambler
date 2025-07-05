import React, {useState} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../styles/colors';
import {dimensions} from '../styles/dimensions';

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  style,
  leftIcon,
  rightIcon,
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error && styles.errorBorder]}>
        {leftIcon && (
          <Icon name={leftIcon} size={20} color={colors.textSecondary} />
        )}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
            <Icon
              name={isSecure ? 'visibility' : 'visibility-off'}
              size={20}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
        {rightIcon && (
          <Icon name={rightIcon} size={20} color={colors.textSecondary} />
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    color: colors.text,
    fontSize: dimensions.fontSize.medium,
    marginBottom: 5,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: dimensions.borderRadius,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.surface,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: dimensions.fontSize.medium,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  errorBorder: {
    borderColor: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: dimensions.fontSize.small,
    marginTop: 5,
  },
});

export default CustomInput;
