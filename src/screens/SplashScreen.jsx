import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
  StatusBar,
  Easing,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { translations } from '../constants/translations';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ onAnimationComplete }) {
  const { language } = useSelector((state) => state.language);
  const t = translations[language] || translations.english;

  // Animation values
  const fadeAnim = useRef(new Animated.Value(1)).current; // Screen fade out
  const logoScale = useRef(new Animated.Value(0.4)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoRotate = useRef(new Animated.Value(0)).current;

  const textOpacity = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(30)).current;

  const subtextOpacity = useRef(new Animated.Value(0)).current;
  const subtextTranslateY = useRef(new Animated.Value(20)).current;

  const progressAnim = useRef(new Animated.Value(0)).current;
  const footerOpacity = useRef(new Animated.Value(0)).current;

  // Ambient pulsing background glow
  const pulseAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // 1. Ambient pulsing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.9,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 2. Main entrance animations
    Animated.sequence([
      // Stage 1: Logo scale & rotate in
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 6,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.timing(logoRotate, {
          toValue: 1,
          duration: 900,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
      ]),

      // Stage 2: App Name and Subtitle fade-in/slide-up
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateY, {
          toValue: 0,
          duration: 600,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),

      // Stage 3: Subtext & Footer fade-in
      Animated.parallel([
        Animated.timing(subtextOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(subtextTranslateY, {
          toValue: 0,
          duration: 500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(footerOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // 3. Progress bar animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 2200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false, // width/layout animations cannot use native driver
    }).start();

    // 4. Exit Animation
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      });
    }, 2800); // Keep splash for 2.8s total for a premium feel

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const spin = logoRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['-20deg', '0deg'],
  });

  const progressBarWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <StatusBar barStyle="light-content" backgroundColor="#050b18" />

      {/* Decorative Background Elements */}
      <View style={styles.backgroundContainer}>
        {/* Deep Dark Indigo Layer */}
        <View style={styles.bgDark} />

        {/* Animated Radial Pulse Rings */}
        <Animated.View style={[styles.glowRing1, { transform: [{ scale: pulseAnim }] }]} />
        <Animated.View style={[styles.glowRing2, { transform: [{ scale: pulseAnim }] }]} />
        <View style={styles.accentCorner1} />
        <View style={styles.accentCorner2} />
      </View>

      {/* Content Area */}
      <View style={styles.content}>
        {/* Logo Section */}
        <Animated.View
          style={[
            styles.logoWrapper,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }, { rotate: spin }],
            },
          ]}>
          {/* Inner Circle container for Logo */}
          <View style={styles.logoInnerCircle}>
            <Image
              source={require('../../assets/shield.png')}
              style={styles.logoImage}
              resizeMode="contain"
            />
            {/* Overlay icon representing transport/safety */}
            <View style={styles.overlayIconContainer}>
              <Feather name="truck" size={20} color="#ffffff" />
            </View>
          </View>
        </Animated.View>

        {/* Text Details */}
        <View style={styles.textContainer}>
          <Animated.Text
            style={[
              styles.appName,
              {
                opacity: textOpacity,
                transform: [{ translateY: textTranslateY }],
              },
            ]}>
            TATD
          </Animated.Text>

          <Animated.Text
            style={[
              styles.appSubtitle,
              {
                opacity: subtextOpacity,
                transform: [{ translateY: subtextTranslateY }],
              },
            ]}>
            {language === 'hindi' ? 'पार्टनर ड्राइवर ऐप' : 'Partner Driver App'}
          </Animated.Text>
        </View>

        {/* Progress Bar Container */}
        <View style={styles.loaderContainer}>
          <View style={styles.loaderTrack}>
            <Animated.View style={[styles.loaderFill, { width: progressBarWidth }]} />
          </View>
        </View>
      </View>

      {/* Footer Info */}
      <Animated.View style={[styles.footer, { opacity: footerOpacity }]}>
        <Feather name="shield" size={14} color="#3b82f6" style={styles.footerIcon} />
        <Text style={styles.footerText}>
          {t.login.footer || '100% Safe & Secure Partner Authentication'}
        </Text>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#050b18',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999, // Ensure it draws over everything
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgDark: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#050b18',
  },
  glowRing1: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: (width * 0.8) / 2,
    backgroundColor: 'rgba(37, 99, 235, 0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(37, 99, 235, 0.12)',
  },
  glowRing2: {
    position: 'absolute',
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: (width * 1.2) / 2,
    backgroundColor: 'rgba(59, 130, 246, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.06)',
  },
  accentCorner1: {
    position: 'absolute',
    top: -height * 0.15,
    right: -width * 0.15,
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: (width * 0.7) / 2,
    backgroundColor: 'rgba(59, 130, 246, 0.06)',
    filter: 'blur(40px)',
  },
  accentCorner2: {
    position: 'absolute',
    bottom: -height * 0.1,
    left: -width * 0.2,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: (width * 0.8) / 2,
    backgroundColor: 'rgba(37, 99, 235, 0.04)',
    filter: 'blur(50px)',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 40,
  },
  logoWrapper: {
    marginBottom: 24,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  logoInnerCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(11, 22, 47, 0.95)',
    borderWidth: 2,
    borderColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logoImage: {
    width: 60,
    height: 60,
  },
  overlayIconContainer: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#2563eb',
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#0b162f',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  appName: {
    fontSize: 40,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 4,
    textShadowColor: 'rgba(59, 130, 246, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  appSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94a3b8',
    marginTop: 8,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  loaderContainer: {
    width: 160,
    height: 4,
    marginTop: 40,
    justifyContent: 'center',
  },
  loaderTrack: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loaderFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 2,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  footerIcon: {
    marginRight: 6,
  },
  footerText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748b',
    textAlign: 'center',
  },
});
