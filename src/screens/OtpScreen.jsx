import React, { useState, useEffect, useRef } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setOtpSession, setLoginSuccess } from '../redux/authSlice';
import { getOtpSchema } from '../validations/schemas';
import apiClient from '../api/client';
import { handleApiError } from '../utils/errorHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations } from '../constants/translations';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

export default function OtpScreen({ route, navigation }) {
  const { mobile } = route.params || {};
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const { language } = useSelector((state) => state.language);
  const { loading, otpSession } = useSelector((state) => state.auth);
  const t = translations[language] || translations.english;

  const [code, setCode] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [localError, setLocalError] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(0);

  const ref0 = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const inputRefs = [ref0, ref1, ref2, ref3];
  const scrollViewRef = useRef(null);

  // Automatically scroll to make the OTP inputs sit perfectly above the keyboard
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      const offset = Platform.OS === 'ios' ? 160 : 180;
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

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      ref0.current?.focus();
    }, 100);

    if (otpSession?.code) {
      console.log(`[TESTING] OTP in active session: ${otpSession.code}`);
    }

    return () => clearTimeout(timerId);
  }, [otpSession?.code]);

  const handleInputChange = (text, index) => {
    const cleanDigit = text.replace(/[^0-9]/g, '');
    if (!cleanDigit) return;

    const newCode = [...code];
    newCode[index] = cleanDigit.substring(cleanDigit.length - 1);
    setCode(newCode);
    setLocalError('');

    if (index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace') {
      const newCode = [...code];

      if (newCode[index] !== '') {
        newCode[index] = '';
        setCode(newCode);
      } else if (index > 0) {
        newCode[index - 1] = '';
        setCode(newCode);
        inputRefs[index - 1].current?.focus();
      }
      setLocalError('');
    }
  };

  const handleResend = async () => {
    try {
      setTimer(30);
      setCode(['', '', '', '']);
      setLocalError('');
      inputRefs[0].current?.focus();

      dispatch(setLoading(true));
      const response = await apiClient.post('/driver/login/driver-login.php', {
        mobile,
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
          text2:
            language === 'english'
              ? 'A new OTP has been sent successfully.'
              : 'नया ओटीपी सफलतापूर्वक भेज दिया गया है।',
          position: 'top',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: language === 'english' ? 'Failed to send OTP' : 'ओटीपी भेजने में विफल',
          text2:
            payload?.message ||
            (language === 'english' ? 'Failed to send OTP.' : 'ओटीपी भेजने में विफल।'),
          position: 'top',
        });
      }
    } catch (error) {
      dispatch(setLoading(false));
      handleApiError(error, language);
    }
  };

  const handleSubmit = async () => {
    const fullOtp = code.join('');

    const schema = getOtpSchema(translations[language]);
    const validation = schema.safeParse({ otp: fullOtp });

    if (!validation.success) {
      const errorMessage = validation.error.errors[0]?.message || t.otp.errorInvalid;
      setLocalError(errorMessage);
      return;
    }

    try {
      if (otpSession && otpSession.code === fullOtp && Date.now() < otpSession.expiresAt) {
        const sessionData = { mobile };
        await AsyncStorage.setItem('@driver_session', JSON.stringify(sessionData));
        dispatch(setLoginSuccess(sessionData));

        Toast.show({
          type: 'success',
          text1: language === 'english' ? 'Login Successful' : 'लॉगिन सफल',
          text2:
            language === 'english'
              ? 'Welcome to your driver dashboard.'
              : 'आपके ड्राइवर डैशबोर्ड में आपका स्वागत है।',
          position: 'top',
        });
      } else {
        let errMsg = language === 'english' ? 'Invalid or expired OTP' : 'अमान्य या समाप्त ओटीपी';
        if (otpSession && Date.now() >= otpSession.expiresAt) {
          errMsg =
            language === 'english'
              ? 'OTP session expired. Please request a new OTP.'
              : 'ओटीपी सत्र समाप्त हो गया। कृपया नया ओटीपी प्राप्त करें।';
        }
        setLocalError(errMsg);
        Toast.show({
          type: 'error',
          text1: language === 'english' ? 'Verification Failed' : 'सत्यापन विफल',
          text2: errMsg,
          position: 'top',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    }
  };

  const isCodeComplete = code.every((digit) => digit !== '');

  const formatTimer = (secs) => {
    const s = secs < 10 ? `0${secs}` : secs;
    return `00:${s}`;
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {/* Custom Back Button Bar */}
          <View style={styles.headerBar}>
            <TouchableOpacity
              onPress={() => {
                if (navigation.canGoBack()) {
                  navigation.goBack();
                } else {
                  Toast.show({
                    type: 'info',
                    text1: 'Back Navigation',
                    text2: 'No previous screen in stack (Testing Mode)',
                  });
                }
              }}
              style={styles.backButton}
              activeOpacity={0.7}>
              <Ionicons name="arrow-back" size={26} color="#1e293b" />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              <View>
                {/* Header Title Text */}
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{t.otp.title}</Text>
                  <Text style={styles.subtitle}>
                    {t.otp.subtitle}
                    {'\n'}
                    <Text style={{ fontWeight: '800', color: '#1e293b' }}>+91 {mobile}</Text>
                  </Text>
                </View>

                {/* Security Shield Graphic */}
                {!localError && (
                  <View style={styles.graphicContainer}>
                    <Image
                      source={require('../../assets/shield.png')}
                      style={{ width: 190, height: 190 }}
                      resizeMode="contain"
                    />
                  </View>
                )}
              </View>

              {/* Bottom half elements: Inputs, Timer, Button */}
              <View style={{ marginTop: 16 }}>
                {/* Input Boxes */}
                <View style={styles.inputContainer}>
                  {code.map((digit, index) => {
                    const isFocused = focusedIndex === index;
                    const hasErrorBorder = !!localError;
                    return (
                      <TextInput
                        key={index}
                        ref={inputRefs[index]}
                        value={digit}
                        onChangeText={(text) => handleInputChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        keyboardType="number-pad"
                        maxLength={1}
                        selectTextOnFocus
                        textAlign="center"
                        onFocus={() => {
                          setFocusedIndex(index);
                          setTimeout(() => {
                            const offset = Platform.OS === 'ios' ? 160 : 180;
                            scrollViewRef.current?.scrollTo({ y: offset, animated: true });
                          }, 100);
                        }}
                        style={[
                          styles.pinBox,
                          hasErrorBorder
                            ? styles.pinBoxError
                            : isFocused
                              ? styles.pinBoxFocused
                              : styles.pinBoxNormal,
                        ]}
                      />
                    );
                  })}
                </View>

                {/* Local Error Alert Card */}
                {localError ? (
                  <View style={styles.errorAlert}>
                    <Ionicons name="alert-circle" size={18} color="#ef4444" />
                    <Text style={styles.errorAlertText}>{localError}</Text>
                  </View>
                ) : null}

                {/* Resend Code Section */}
                <View style={styles.timerContainer}>
                  {timer > 0 ? (
                    <Text style={styles.timerText}>
                      {t.otp.resendPrompt}{' '}
                      <Text style={styles.timerHighlight}>
                        {t.otp.resendTimer} {formatTimer(timer)}
                      </Text>
                    </Text>
                  ) : (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.timerText}>{t.otp.resendPrompt} </Text>
                      <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
                        <Text style={styles.resendLink}>{t.otp.resendButton}</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>

                {/* Submit Trigger */}
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={!isCodeComplete || loading}
                  activeOpacity={0.8}
                  style={[
                    styles.button,
                    isCodeComplete && !loading ? styles.buttonActive : styles.buttonDisabled,
                  ]}>
                  {loading && (
                    <ActivityIndicator size="small" color="#ffffff" style={{ marginRight: 8 }} />
                  )}
                  <Text style={styles.buttonText}>{loading ? t.otp.loading : t.otp.button}</Text>
                </TouchableOpacity>
              </View>
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
    backgroundColor: '#f8fafc',
  },
  headerBar: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 24,
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
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },
  graphicContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },
  pinBox: {
    height: 68,
    width: 60,
    borderRadius: 12,
    borderWidth: 1.5,
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginHorizontal: 8,
  },
  pinBoxNormal: {
    backgroundColor: '#ffffff',
    borderColor: '#e2e8f0',
    color: '#1e293b',
  },
  pinBoxFocused: {
    backgroundColor: '#ffffff',
    borderColor: '#2563eb',
    color: '#1e293b',
  },
  pinBoxError: {
    backgroundColor: '#fef2f2',
    borderColor: '#ef4444',
    color: '#dc2626',
  },
  errorAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fef2f2',
    borderColor: '#fee2e2',
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  errorAlertText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#dc2626',
    marginLeft: 8,
    textAlign: 'center',
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  timerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  timerHighlight: {
    fontWeight: '700',
    color: '#2563eb',
  },
  resendLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2563eb',
  },
  button: {
    height: 56,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
  buttonActive: {
    backgroundColor: '#2563eb',
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
});
