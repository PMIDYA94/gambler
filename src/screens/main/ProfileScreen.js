import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from '../../components/CustomButton';
import {useAuth} from '../../context/AuthContext';
import {colors} from '../../styles/colors';
import {globalStyles} from '../../styles/globalStyles';
import {dimensions} from '../../styles/dimensions';

const ProfileScreen = () => {
  const {user, logout} = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <LinearGradient colors={colors.gradient.dark} style={globalStyles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={globalStyles.title}>👤 Profile</Text>
        </View>

        <View style={globalStyles.card}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Icon name="person" size={60} color={colors.primary} />
            </View>
            <Text style={styles.userName}>{user?.name || 'User'}</Text>
            <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
          </View>
        </View>

        <View style={globalStyles.card}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Member Since:</Text>
            <Text style={styles.infoValue}>January 2025</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Account Status:</Text>
            <Text style={[styles.infoValue, {color: colors.success}]}>Active</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Total Balance:</Text>
            <Text style={styles.infoValue}>${user?.balance || 0}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Total Withdrawn:</Text>
            <Text style={styles.infoValue}>${user?.totalWithdrawn || 0}</Text>
          </View>
        </View>

        <View style={globalStyles.card}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingItem}>
            <Icon name="notifications" size={24} color={colors.textSecondary} />
            <Text style={styles.settingText}>Notifications</Text>
            <Text style={styles.comingSoon}>Coming Soon</Text>
          </View>
          <View style={styles.settingItem}>
            <Icon name="security" size={24} color={colors.textSecondary} />
            <Text style={styles.settingText}>Privacy & Security</Text>
            <Text style={styles.comingSoon}>Coming Soon</Text>
          </View>
          <View style={styles.settingItem}>
            <Icon name="help" size={24} color={colors.textSecondary} />
            <Text style={styles.settingText}>Help & Support</Text>
            <Text style={styles.comingSoon}>Coming Soon</Text>
          </View>
        </View>

        <View style={globalStyles.card}>
          <Text style={styles.sectionTitle}>Game Statistics</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Games Played</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Games Won</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0%</Text>
              <Text style={styles.statLabel}>Win Rate</Text>
            </View>
          </View>
        </View>

        <CustomButton
          title="Logout"
          onPress={handleLogout}
          variant="secondary"
          style={styles.logoutButton}
        />
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  userName: {
    color: colors.text,
    fontSize: dimensions.fontSize.xlarge,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    color: colors.textSecondary,
    fontSize: dimensions.fontSize.medium,
  },
  sectionTitle: {
    color: colors.primary,
    fontSize: dimensions.fontSize.large,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    color: colors.textSecondary,
    fontSize: dimensions.fontSize.medium,
  },
  infoValue: {
    color: colors.text,
    fontSize: dimensions.fontSize.medium,
    fontWeight: 'bold',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  settingText: {
    color: colors.text,
    fontSize: dimensions.fontSize.medium,
    marginLeft: 15,
    flex: 1,
  },
  comingSoon: {
    color: colors.textSecondary,
    fontSize: dimensions.fontSize.small,
    fontStyle: 'italic',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: colors.primary,
    fontSize: dimensions.fontSize.xlarge,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statLabel: {
    color: colors.textSecondary,
    fontSize: dimensions.fontSize.small,
    textAlign: 'center',
  },
  logoutButton: {
    marginHorizontal: 20,
    marginTop: 20,
  },
});

export default ProfileScreen;