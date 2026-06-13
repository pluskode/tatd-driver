import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setOtpSession } from '../redux/authSlice';
import { getLoginSchema } from '../validations/schemas';
import { translations } from '../constants/translations';
import { Feather } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import apiClient from '../api/client';
import { handleApiError } from '../utils/errorHandler';
import LanguageToggleButton from '../components/LanguageToggleButton';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const { language } = useSelector((state) => state.language);
  const { loading } = useSelector((state) => state.auth);
  const t = translations[language] || translations.english;

  const [isFocused, setIsFocused] = useState(false);
  const scrollViewRef = useRef(null);

  // Automatically scroll to make the text input sit perfectly above the keyboard
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      const offset = Platform.OS === 'ios' ? 220 : 250;
      scrollViewRef.current?.scrollTo({ y: offset, animated: true });
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(getLoginSchema(translations[language])),
    mode: 'onChange',
    defaultValues: {
      mobile: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true));
      const response = await apiClient.post('/driver/login/driver-login.php', {
        mobile: data.mobile,
        user_type: 'Driver',
        app_version: '2.37',
        app_type: 'android',
      });

      const payload = response.data;
      dispatch(setLoading(false));

      if (payload && (payload.status_code === '200' || payload.status_code === 200)) {
        let numericOtp = '';
        if (payload.otp) {
          const match = payload.otp.match(/\d{4}/);
          numericOtp = match ? match[0] : '';
        }

        if (numericOtp) {
          dispatch(
            setOtpSession({
              code: numericOtp,
              expiresAt: Date.now() + 5 * 60 * 1000,
            })
          );
        }

        Toast.show({
          type: 'success',
          text1: language === 'english' ? 'OTP Sent' : 'ओटीपी भेजा गया',
          text2: language === 'english' ? 'OTP sent successfully.' : 'ओटीपी सफलतापूर्वक भेजा गया।',
          position: 'top',
        });

        navigation.navigate('Otp', {
          mobile: data.mobile,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: language === 'english' ? 'Failed to send OTP' : 'ओटीपी भेजने में विफल',
          text2:
            payload?.message ||
            (language === 'english' ? 'Invalid mobile number.' : 'अमान्य मोबाइल नंबर।'),
          position: 'top',
        });
      }
    } catch (error) {
      dispatch(setLoading(false));
      handleApiError(error, language);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {/* Top Banner Image with curved overlay */}
          <View style={styles.bannerContainer}>
            <Image
              source={require('../../assets/truck.png')}
              style={styles.bannerImage}
              resizeMode="cover"
            />
            <LanguageToggleButton
              style={[styles.langButton, { top: insets.top > 0 ? insets.top + 10 : 20 }]}
            />
            <View style={styles.waveOverlay} />
          </View>

          {/* Form Content Area */}
          <View style={[styles.content, { paddingBottom: insets.bottom + 20 }]}>
            {/* Title & Subtitle */}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{t.login.welcome}</Text>
              <Text style={styles.subtitle}>{t.login.subtitle}</Text>
            </View>

            {/* Fixed Spacer to avoid keyboard height jitter */}
            <View style={{ height: 24 }} />

            {/* Mobile Input Field & Button */}
            <View>
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>{t.login.label}</Text>

                <Controller
                  control={control}
                  name="mobile"
                  render={({ field: { onChange, onBlur: hookOnBlur, value } }) => (
                    <View
                      style={[
                        styles.inputWrapper,
                        errors.mobile
                          ? styles.inputErrorBorder
                          : isFocused
                            ? styles.inputFocusedBorder
                            : styles.inputNormalBorder,
                      ]}>
                      <Feather
                        name="phone"
                        size={18}
                        color={errors.mobile ? '#ef4444' : isFocused ? '#3b82f6' : '#64748b'}
                        style={{ marginRight: 10 }}
                      />
                      <TextInput
                        keyboardType="phone-pad"
                        maxLength={10}
                        placeholder={t.login.placeholder}
                        placeholderTextColor="#94a3b8"
                        onFocus={() => {
                          setIsFocused(true);
                          setTimeout(() => {
                            const offset = Platform.OS === 'ios' ? 220 : 250;
                            scrollViewRef.current?.scrollTo({ y: offset, animated: true });
                          }, 100);
                        }}
                        onBlur={() => {
                          hookOnBlur();
                          setIsFocused(false);
                        }}
                        onChangeText={(text) => {
                          const cleanText = text.replace(/[^0-9]/g, '');
                          onChange(cleanText);
                        }}
                        value={value}
                        style={styles.input}
                      />
                    </View>
                  )}
                />

                <Text style={errors.mobile ? styles.errorText : styles.helperText}>
                  {errors.mobile
                    ? errors.mobile.message
                    : language === 'english'
                      ? 'Enter 10 digit mobile number'
                      : '10 अंकों का मोबाइल नंबर दर्ज करें'}
                </Text>
              </View>

              {/* Continue Button */}
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                disabled={!isValid || loading}
                activeOpacity={0.8}
                style={[
                  styles.button,
                  isValid && !loading ? styles.buttonActive : styles.buttonDisabled,
                ]}>
                {loading && (
                  <ActivityIndicator size="small" color="#ffffff" style={{ marginRight: 8 }} />
                )}
                <Text style={styles.buttonText}>{loading ? t.login.loading : t.login.button}</Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Feather name="shield" size={15} color="#2563eb" />
              <Text style={styles.footerText}>
                {language === 'english'
                  ? 'Your data is secure with us'
                  : 'आपका डेटा हमारे साथ सुरक्षित है'}
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  bannerContainer: {
    position: 'relative',
    width: '100%',
    height: 420,
    overflow: 'hidden',
  },
  langButton: {
    position: 'absolute',
    right: 16,
    zIndex: 10,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  waveOverlay: {
    position: 'absolute',
    bottom: -50,
    left: -40,
    right: -40,
    height: 100,
    backgroundColor: '#ffffff',
    borderRadius: 200,
    transform: [{ scaleX: 1.5 }],
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1e293b',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
    fontWeight: '500',
    textAlign: 'center',
  },
  fieldContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#475569',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1.5,
    paddingHorizontal: 12,
    height: 56,
  },
  inputNormalBorder: {
    borderColor: '#e2e8f0',
  },
  inputFocusedBorder: {
    borderColor: '#3b82f6',
  },
  inputErrorBorder: {
    borderColor: '#ef4444',
  },
  phonePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginRight: 12,
  },
  phoneIcon: {
    marginRight: 4,
  },
  countryCode: {
    fontSize: 13,
    fontWeight: '700',
    color: '#334155',
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    height: '100%',
  },
  helperText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
    marginTop: 6,
  },
  errorText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#ef4444',
    marginTop: 6,
  },
  button: {
    height: 56,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0056d2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
  buttonActive: {
    backgroundColor: '#0056d2',
  },
  buttonDisabled: {
    backgroundColor: '#93c5fd',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  footerText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
    marginLeft: 6,
  },
});
