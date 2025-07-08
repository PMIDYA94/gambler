import React from 'react';
import {useAuth} from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import BottomTabs from './BottomTabs';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {colors} from '../styles/colors';

const AppNavigator = () => {
  const {user, loading} = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  //   return user ? <BottomTabs /> : <AuthNavigator />;
  return <BottomTabs />;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNavigator;
