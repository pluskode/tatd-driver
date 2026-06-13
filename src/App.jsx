import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './redux/store';
import AppNavigator from './navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';

// Load NativeWind v4 compiled entry stylesheet
import '../global.css';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <StatusBar style="dark" />
        <AppNavigator />
        <Toast />
      </SafeAreaProvider>
    </Provider>
  );
}
