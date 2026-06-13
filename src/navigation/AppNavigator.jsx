import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLoginSuccess, setSessionLoaded } from '../redux/authSlice';
import { setLanguage } from '../redux/languageSlice';
import { translations } from '../constants/translations';
import { Feather } from '@expo/vector-icons';

// Import Screens
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import OtpScreen from '../screens/OtpScreen';
import DashboardScreen from '../screens/DashboardScreen';
import RidesScreen from '../screens/RidesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ScheduleScreen from '../screens/ScheduleScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  const { language } = useSelector((state) => state.language);
  const t = translations[language] || translations.english;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#0056d2',
        tabBarInactiveTintColor: '#94a3b8',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0',
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
        },
        tabBarIcon: ({ color }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Rides') {
            iconName = 'list';
          } else if (route.name === 'Schedule') {
            iconName = 'calendar';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }
          return <Feather name={iconName} size={20} color={color} />;
        },
      })}>
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        options={{ title: t.dashboard.tabHome }}
      />
      <Tab.Screen name="Rides" component={RidesScreen} options={{ title: t.dashboard.tabRides }} />
      <Tab.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{ title: t.dashboard.tabSchedule }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: t.dashboard.tabProfile }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const dispatch = useDispatch();
  const { sessionLoaded, isAuthenticated } = useSelector((state) => state.auth);
  const [splashAnimationFinished, setSplashAnimationFinished] = useState(false);

  // Load session and preferred language on mount from AsyncStorage
  useEffect(() => {
    const restoreSessionAndLanguage = async () => {
      try {
        const savedLang = await AsyncStorage.getItem('@app_language');
        if (savedLang) {
          dispatch(setLanguage(savedLang));
        }

        const session = await AsyncStorage.getItem('@driver_session');
        if (session) {
          dispatch(setLoginSuccess(JSON.parse(session)));
        }
      } catch {
        // Ignore restore errors
      } finally {
        dispatch(setSessionLoaded(true));
      }
    };

    restoreSessionAndLanguage();
  }, [dispatch]);

  // Show the animated splash screen until session is loaded AND the splash animation finishes
  if (!sessionLoaded || !splashAnimationFinished) {
    return <SplashScreen onAnimationComplete={() => setSplashAnimationFinished(true)} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={TabNavigator} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Otp" component={OtpScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
