import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../styles/colors';
import {globalStyles} from '../../styles/globalStyles';
import {dimensions} from '../../styles/dimensions';

const NotificationsScreen = () => {
  return (
    <LinearGradient colors={colors.gradient.dark} style={globalStyles.container}>
      <View style={styles.container}>
        <Text style={globalStyles.title}>🔔 Notifications</Text>
        
        <View style={styles.comingSoonContainer}>
          <Icon name="notifications" size={80} color={colors.primary} />
          <Text style={styles.comingSoonTitle}>Coming Soon</Text>
          <Text style={styles.comingSoonText}>
            Stay tuned for game updates, winning alerts, and special promotions!
          </Text>
        </View>

        <View style={globalStyles.card}>
          <Text style={styles.featureTitle}>Future Features:</Text>
          <Text style={styles.featureItem}>• Game result notifications</Text>
          <Text style={styles.featureItem}>• Winning alerts</Text>
          <Text style={styles.featureItem}>• Special promotions</Text>
          <Text style={styles.featureItem}>• Account updates</Text>
          <Text style={styles.featureItem}>• Tournament announcements</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  comingSoonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  comingSoonTitle: {
    color: colors.primary,
    fontSize: dimensions.fontSize.xlarge,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  comingSoonText: {
    color: colors.textSecondary,
    fontSize: dimensions.fontSize.medium,
    textAlign: 'center',
    lineHeight: 24,
  },
  featureTitle: {
    color: colors.primary,
    fontSize: dimensions.fontSize.large,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  featureItem: {
    color: colors.text,
    fontSize: dimensions.fontSize.medium,
    marginBottom: 8,
  },
});

export default NotificationsScreen;