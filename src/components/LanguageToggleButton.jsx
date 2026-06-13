import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setLanguage } from '../redux/languageSlice';
import { translations } from '../constants/translations';
import { Feather } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

export function useLanguage() {
  const dispatch = useDispatch();
  const { language } = useSelector((state) => state.language);
  const t = translations[language] || translations.english;

  const changeLanguage = async (nextLang) => {
    try {
      await AsyncStorage.setItem('@app_language', nextLang);
      dispatch(setLanguage(nextLang));

      const tLang = translations[nextLang]?.dashboard || translations.english.dashboard;
      Toast.show({
        type: 'success',
        text1: nextLang === 'english' ? 'Language Updated' : 'भाषा अपडेट की गई',
        text2: tLang.langSuccess,
        position: 'top',
        visibilityTime: 2000,
      });
    } catch {
      // Ignore
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === 'english' ? 'hindi' : 'english';
    changeLanguage(nextLang);
  };

  return { language, t, changeLanguage, toggleLanguage };
}

export default function LanguageToggleButton({ style }) {
  const { language, toggleLanguage } = useLanguage();

  return (
    <TouchableOpacity
      onPress={toggleLanguage}
      activeOpacity={0.8}
      style={[
        {
          backgroundColor: 'rgba(255, 255, 255, 0.18)',
          borderRadius: 20,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.3)',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}>
      <Feather name="globe" size={14} color="#ffffff" style={{ marginRight: 6 }} />
      <Text style={{ fontSize: 12, fontWeight: '800', color: '#ffffff' }}>
        {language === 'english' ? 'हिंदी' : 'EN'}
      </Text>
    </TouchableOpacity>
  );
}
