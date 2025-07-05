import React, {useState} from 'react';
import {View, Text, StyleSheet, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {colors} from '../../styles/colors';
import {globalStyles} from '../../styles/globalStyles';

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const handleResetPassword = () => {
    setErrors({});
    
    if (!email) {
      setErrors({email: 'Email is required'});
      return;
    }

    // Mock reset password logic
    Alert.alert(
      'Reset Link Sent',
      'A password reset link has been sent to your email address.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Login'),
        },
      ]
    );
  };

  return (
    <LinearGradient colors={colors.gradient.dark} style={globalStyles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.content}>
          <Text style={styles.title}>🎲</Text>
          <Text style={globalStyles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Enter your email address and we'll send you a link to reset your password.
          </Text>

          <CustomInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            leftIcon="email"
            error={errors.email}
          />

          <CustomButton
            title="Send Reset Link"
            onPress={handleResetPassword}
            style={styles.button}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Remember your password? </Text>
            <Text
              style={styles.linkText}
              onPress={() => navigation.navigate('Login')}>
              Login
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  button: {
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: colors.textSecondary,
  },
  linkText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;