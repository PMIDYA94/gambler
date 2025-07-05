import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useAuth} from '../../context/AuthContext';
import {colors} from '../../styles/colors';
import {globalStyles} from '../../styles/globalStyles';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const {login} = useAuth();

  const handleLogin = async () => {
    setErrors({});

    if (!email) {
      setErrors(prev => ({...prev, email: 'Email is required'}));
      return;
    }
    if (!password) {
      setErrors(prev => ({...prev, password: 'Password is required'}));
      return;
    }

    const result = await login(email, password);
    if (!result.success) {
      setErrors({general: result.error});
    }
  };

  return (
    <LinearGradient
      colors={colors.gradient.dark}
      style={globalStyles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.content}>
          <Text style={styles.title}>🎲</Text>
          <Text style={globalStyles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Login to your account</Text>

          <CustomInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            leftIcon="email"
            error={errors.email}
          />

          <CustomInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry={true}
            leftIcon="lock"
            error={errors.password}
          />

          {errors.general && (
            <Text style={styles.errorText}>{errors.general}</Text>
          )}

          <CustomButton
            title="Login"
            onPress={handleLogin}
            style={styles.button}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Text
              style={styles.linkText}
              onPress={() => navigation.navigate('Signup')}>
              Sign Up
            </Text>
          </View>

          <Text
            style={styles.forgotText}
            onPress={() => navigation.navigate('ForgotPassword')}>
            Forgot Password?
          </Text>
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
  forgotText: {
    color: colors.primary,
    textAlign: 'center',
    marginTop: 15,
  },
  errorText: {
    color: colors.error,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default LoginScreen;
