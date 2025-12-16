import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { colors } from '../theme';
import Logo from '../components/Logo';
import {
  LandingScreen,
  LoginScreen,
  DashboardScreen,
  CheckInOutScreen,
  ChildProfileScreen,
  SettingsScreen,
} from '../screens';
import AddChildScreen from '../screens/AddChildScreen';
import EditChildScreen from '../screens/EditChildScreen';
import HistoryScreen from '../screens/HistoryScreen';
import CalendarScreen from '../screens/CalendarScreen';

const Stack = createNativeStackNavigator();
const { width } = Dimensions.get('window');
const isLargeScreen = width > 900;

// Custom Header with Top Navigation
const CustomHeader = ({ navigation, currentRoute }) => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { isDark, setTheme } = useTheme();

  const handleToggleTheme = () => {
    const newMode = isDark ? 'light' : 'dark';
    setTheme(newMode);
  };
  const insets = useSafeAreaInsets();

  const navItems = [
    { name: 'Dashboard', label: t('nav.overview'), icon: 'grid-outline' },
    { name: 'CheckInOut', label: t('nav.checkInOut'), icon: 'checkmark-circle-outline' },
    { name: 'Calendar', label: t('nav.calendar') || 'Kalender', icon: 'calendar-outline' },
    { name: 'History', label: t('nav.history'), icon: 'time-outline' },
    { name: 'Settings', label: t('nav.settings'), icon: 'settings-outline' },
  ];

  return (
    <View style={[styles.header, { paddingTop: insets.top }]}>
      <View style={styles.headerContent}>
        {/* Logo */}
        <TouchableOpacity 
          style={styles.headerLogoContainer}
          onPress={() => navigation.navigate('Dashboard')}
          activeOpacity={0.8}
        >
          <View style={styles.logoCircle}>
            <Logo size={32} />
          </View>
          <Text style={styles.headerLogoText}>Henteklar</Text>
        </TouchableOpacity>

        {/* Top Navigation */}
        <View style={styles.topNav}>
          {navItems.map((item) => (
            <TouchableOpacity
              key={item.name}
              style={[
                styles.navItem,
                currentRoute === item.name && styles.navItemActive,
              ]}
              onPress={() => navigation.navigate(item.name)}
              activeOpacity={0.7}
            >
              <Ionicons 
                name={item.icon} 
                size={18} 
                color={currentRoute === item.name ? colors.white : colors.neutral[500]} 
                style={styles.navItemIcon}
              />
              {isLargeScreen && (
                <Text
                  style={[
                    styles.navItemText,
                    currentRoute === item.name && styles.navItemTextActive,
                  ]}
                >
                  {item.label}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* User & Logout */}
        <View style={styles.headerRight}>
          {/* Dark mode toggle */}
          <TouchableOpacity
            style={styles.themeToggle}
            onPress={handleToggleTheme}
            activeOpacity={0.7}
          >
            <Ionicons 
              name={isDark ? 'sunny' : 'moon'} 
              size={20} 
              color={isDark ? colors.amber[500] : colors.neutral[600]} 
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.userInfo} activeOpacity={0.8}>
            <LinearGradient
              colors={[colors.primary[400], colors.primary[600]]}
              style={styles.avatar}
            >
              <Text style={styles.avatarText}>{user?.avatar}</Text>
            </LinearGradient>
            {isLargeScreen && (
              <View style={styles.userText}>
                <Text style={styles.userName}>{user?.name}</Text>
                <Text style={styles.userRole}>
                  {user?.role === 'admin' ? 'Administrator' : user?.role === 'staff' ? 'Ansatt' : 'Forelder'}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={logout}
            activeOpacity={0.7}
          >
            <Ionicons name="log-out-outline" size={20} color={colors.red[500]} />
            {isLargeScreen && (
              <Text style={styles.logoutText}>Logg ut</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Main Screen Container with Top Nav
const MainScreen = ({ navigation, route }) => {
  const { isDark } = useTheme();
  const [currentRoute, setCurrentRoute] = useState('Dashboard');

  const createNavigation = (name) => ({
    ...navigation,
    navigate: (targetName, params) => {
      if (['Dashboard', 'CheckInOut', 'Calendar', 'History', 'Settings'].includes(targetName)) {
        setCurrentRoute(targetName);
      } else {
        navigation.navigate(targetName, params);
      }
    },
  });

  const renderScreen = () => {
    switch (currentRoute) {
      case 'Dashboard':
        return <DashboardScreen navigation={createNavigation('Dashboard')} />;
      case 'CheckInOut':
        return <CheckInOutScreen navigation={createNavigation('CheckInOut')} />;
      case 'Calendar':
        return <CalendarScreen navigation={createNavigation('Calendar')} />;
      case 'History':
        return <HistoryScreen navigation={createNavigation('History')} />;
      case 'Settings':
        return <SettingsScreen navigation={createNavigation('Settings')} />;
      default:
        return <DashboardScreen navigation={createNavigation('Dashboard')} />;
    }
  };

  return (
    <View style={[styles.mainContainer, { backgroundColor: isDark ? colors.dark.bg.primary : colors.neutral[50] }]}>
      <CustomHeader 
        navigation={{ navigate: setCurrentRoute }} 
        currentRoute={currentRoute} 
      />
      <View style={styles.screenContainer}>
        {renderScreen()}
      </View>
    </View>
  );
};

// Loading Screen
const LoadingScreen = () => {
  const { isDark } = useTheme();
  const gradientColors = isDark
    ? [colors.dark.bg.primary, colors.dark.bg.secondary]
    : [colors.primary[50], colors.white];

  return (
    <LinearGradient
    colors={gradientColors}
    style={styles.loadingContainer}
  >
    <View style={styles.loadingContent}>
      <View style={styles.loadingMascotContainer}>
        <View style={styles.loadingMascotGlow} />
        <Logo size={96} />
      </View>
      <Text style={styles.loadingText}>Henteklar</Text>
      <Text style={styles.loadingSubtext}>Laster inn...</Text>
    </View>
  </LinearGradient>
  );
};
// Main App Navigator
const AppNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen
              name="ChildProfile"
              component={ChildProfileScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="AddChild"
              component={AddChildScreen}
              options={{
                headerShown: true,
                headerTitle: 'Legg til barn',
                headerBackTitle: 'Tilbake',
                headerTintColor: colors.neutral[700],
                headerTitleStyle: {
                  fontWeight: '600',
                },
                headerStyle: {
                  backgroundColor: colors.neutral[50],
                },
                headerShadowVisible: false,
              }}
            />
            <Stack.Screen
              name="EditChild"
              component={EditChildScreen}
              options={{
                headerShown: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.neutral[50],
  },
  header: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 16,
  },
  headerLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerMascot: {
    width: 32,
    height: 32,
  },
  headerLogoText: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary[600],
    display: isLargeScreen ? 'flex' : 'none',
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.neutral[100],
    borderRadius: 14,
    padding: 5,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: isLargeScreen ? 18 : 14,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 8,
  },
  navItemActive: {
    backgroundColor: colors.primary[500],
    shadowColor: colors.primary[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  navItemIcon: {
    opacity: 0.9,
  },
  navItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[600],
  },
  navItemTextActive: {
    color: colors.white,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  themeToggle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.neutral[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.neutral[50],
    paddingRight: isLargeScreen ? 16 : 0,
    paddingLeft: 4,
    paddingVertical: 4,
    borderRadius: 28,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
  },
  userText: {},
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.neutral[800],
  },
  userRole: {
    fontSize: 12,
    color: colors.neutral[500],
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: colors.red[50],
    borderWidth: 1,
    borderColor: colors.red[100],
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.red[600],
  },
  screenContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContent: {
    alignItems: 'center',
  },
  loadingMascotContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  loadingMascotGlow: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: colors.primary[200],
    opacity: 0.3,
    top: -20,
    left: -20,
  },
  loadingMascot: {
    width: 140,
    height: 140,
  },
  loadingText: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.primary[600],
    marginBottom: 8,
  },
  loadingSubtext: {
    fontSize: 16,
    color: colors.neutral[500],
  },
});

export default AppNavigator;