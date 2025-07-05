import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useAuth} from '../../context/AuthContext';
import {colors} from '../../styles/colors';
import {globalStyles} from '../../styles/globalStyles';

const SignupScreen = ({navigation}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const {signup} = useAuth();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({...prev, [field]: value}));
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: null}));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    const result = await signup(
      formData.name,
      formData.email,
      formData.password,
    );
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
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <Text style={styles.title}>🎲</Text>
            <Text style={globalStyles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join the casino experience</Text>

            <CustomInput
              label="Full Name"
              value={formData.name}
              onChangeText={value => handleInputChange('name', value)}
              placeholder="Enter your full name"
              leftIcon="person"
              error={errors.name}
            />

            <CustomInput
              label="Email"
              value={formData.email}
              onChangeText={value => handleInputChange('email', value)}
              placeholder="Enter your email"
              keyboardType="email-address"
              leftIcon="email"
              error={errors.email}
            />

            <CustomInput
              label="Password"
              value={formData.password}
              onChangeText={value => handleInputChange('password', value)}
              placeholder="Create a password"
              secureTextEntry={true}
              leftIcon="lock"
              error={errors.password}
            />

            <CustomInput
              label="Confirm Password"
              value={formData.confirmPassword}
              onChangeText={value =>
                handleInputChange('confirmPassword', value)
              }
              placeholder="Confirm your password"
              secureTextEntry={true}
              leftIcon="lock"
              error={errors.confirmPassword}
            />

            {errors.general && (
              <Text style={styles.errorText}>{errors.general}</Text>
            )}

            <CustomButton
              title="Sign Up"
              onPress={handleSignup}
              style={styles.button}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <Text
                style={styles.linkText}
                onPress={() => navigation.navigate('Login')}>
                Login
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
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
  errorText: {
    color: colors.error,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default SignupScreen;
