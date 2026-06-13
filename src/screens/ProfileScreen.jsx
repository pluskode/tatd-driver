import React from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '../components/LanguageToggleButton';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const { language, t, changeLanguage } = useLanguage();
  const [shareLocation, setShareLocation] = React.useState(true);

  const { user } = useSelector((state) => state.auth);
  const activeMobile = user?.mobile || '';

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('@driver_session');
      dispatch(logout());
    } catch {
      // Ignore
    }
  };

  const handleLogoutPress = () => {
    Alert.alert(
      language === 'english' ? 'Logout' : 'लॉगआउट',
      language === 'english'
        ? 'Are you sure you want to logout?'
        : 'क्या आप वाकई लॉगआउट करना चाहते हैं?',
      [
        { text: language === 'english' ? 'Cancel' : 'रद्द करें', style: 'cancel' },
        {
          text: language === 'english' ? 'Logout' : 'लॉगआउट',
          style: 'destructive',
          onPress: handleLogout,
        },
      ]
    );
  };

  const handlePayoutPress = () => {
    Alert.alert(
      language === 'english' ? 'Initiate Payout' : 'पेआउट शुरू करें',
      language === 'english'
        ? 'Do you want to transfer your balance of ₹940 to your linked bank account?'
        : 'क्या आप अपने ₹940 के बैलेंस को जुड़े हुए बैंक खाते में ट्रांसफर करना चाहते हैं?',
      [
        { text: language === 'english' ? 'Cancel' : 'रद्द करें', style: 'cancel' },
        {
          text: language === 'english' ? 'Transfer' : 'ट्रांसफर करें',
          onPress: () => {
            Alert.alert(
              language === 'english' ? 'Success' : 'सफलता',
              language === 'english'
                ? 'Your payout request of ₹940 has been processed successfully.'
                : 'आपका ₹940 का पेआउट अनुरोध सफलतापूर्वक संसाधित कर दिया गया है.'
            );
          },
        },
      ]
    );
  };

  const handleCheckUpdates = () => {
    Alert.alert(
      language === 'english' ? 'App Update' : 'ऐप अपडेट',
      language === 'english' ? 'Your app is already up to date.' : 'आपका ऐप पहले से ही अपडेटेड है।'
    );
  };

  const handleContactPress = (type) => {
    if (type === 'call') {
      Linking.openURL('tel:+919876543210').catch(() => {
        Alert.alert('Error', 'Helpline could not be opened.');
      });
    } else if (type === 'whatsapp') {
      Linking.openURL('https://wa.me/919876543210').catch(() => {
        Alert.alert('Error', 'WhatsApp could not be opened.');
      });
    } else if (type === 'email') {
      Linking.openURL('mailto:support@tatd.in').catch(() => {
        Alert.alert('Error', 'Mail app could not be opened.');
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f6f8fb' }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}>
        {/* Profile Header Banner */}
        <View
          style={{
            backgroundColor: '#0056d2',
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
            paddingTop: insets.top + 20,
            paddingBottom: 70,
            paddingHorizontal: 24,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 24, fontWeight: '800', color: '#ffffff' }}>
              {t.dashboard.profileHeader}
            </Text>
          </View>
        </View>

        {/* Profile Content Container (overlapping the banner) */}
        <View style={{ paddingHorizontal: 20, marginTop: -45 }}>
          {/* Main Info Card */}
          <View
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 24,
              padding: 20,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.04,
              shadowRadius: 20,
              elevation: 4,
            }}>
            {/* Avatar container */}
            <View style={{ position: 'relative', marginRight: 16 }}>
              <View
                style={{
                  width: 72,
                  height: 72,
                  borderRadius: 36,
                  backgroundColor: '#f0f5ff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 3,
                  borderColor: '#e0eaff',
                }}>
                <Feather name="user" size={36} color="#0056d2" />
              </View>
              {/* Online indicator dot */}
              <View
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  backgroundColor: '#22c55e',
                  borderWidth: 3,
                  borderColor: '#ffffff',
                }}
              />
            </View>

            {/* Profile Info Details */}
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: '800', color: '#1e293b' }}>
                  {language === 'english' ? 'TATD Partner' : 'TATD पार्टनर'}
                </Text>
                <View
                  style={{
                    backgroundColor: '#dcfce7',
                    borderRadius: 100,
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                    marginLeft: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Feather name="check-circle" size={10} color="#15803d" />
                  <Text
                    style={{
                      fontSize: 9,
                      fontWeight: '800',
                      color: '#15803d',
                      marginLeft: 3,
                      textTransform: 'uppercase',
                    }}>
                    {language === 'english' ? 'Verified' : 'सत्यापित'}
                  </Text>
                </View>
              </View>

              <Text style={{ fontSize: 13, color: '#64748b', fontWeight: '600', marginTop: 4 }}>
                +91 {activeMobile}
              </Text>

              {/* Rating representation */}
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
                <Feather name="star" size={13} color="#eab308" fill="#eab308" />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '800',
                    color: '#475569',
                    marginLeft: 4,
                  }}>
                  4.9 Rating
                </Text>
              </View>
            </View>
          </View>

          {/* Quick Stats Grid */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 16,
            }}>
            {/* Stat Item 1 */}
            <View
              style={{
                flex: 1,
                backgroundColor: '#ffffff',
                borderRadius: 16,
                padding: 12,
                marginRight: 8,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#f1f5f9',
              }}>
              <Text style={{ fontSize: 11, fontWeight: '700', color: '#94a3b8' }}>
                {language === 'english' ? 'RATING' : 'रेटिंग'}
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '800', color: '#0f172a', marginTop: 4 }}>
                ⭐ 4.9
              </Text>
            </View>

            {/* Stat Item 2 */}
            <View
              style={{
                flex: 1,
                backgroundColor: '#ffffff',
                borderRadius: 16,
                padding: 12,
                marginHorizontal: 4,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#f1f5f9',
              }}>
              <Text style={{ fontSize: 11, fontWeight: '700', color: '#94a3b8' }}>
                {language === 'english' ? 'TOTAL TRIPS' : 'कुल यात्राएं'}
              </Text>
              <Text style={{ fontSize: 15, fontWeight: '800', color: '#0056d2', marginTop: 4 }}>
                9 {language === 'english' ? 'Trips' : 'यात्राएं'}
              </Text>
            </View>

            {/* Stat Item 3 */}
            <View
              style={{
                flex: 1,
                backgroundColor: '#ffffff',
                borderRadius: 16,
                padding: 12,
                marginLeft: 8,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#f1f5f9',
              }}>
              <Text style={{ fontSize: 11, fontWeight: '700', color: '#94a3b8' }}>
                {language === 'english' ? 'SINCE' : 'सदस्यता'}
              </Text>
              <Text style={{ fontSize: 13, fontWeight: '800', color: '#475569', marginTop: 6 }}>
                {language === 'english' ? 'June 2026' : 'जून २०२६'}
              </Text>
            </View>
          </View>

          {/* Wallet & Payout Card */}
          <View
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 20,
              padding: 16,
              marginTop: 20,
              borderWidth: 1,
              borderColor: '#f1f5f9',
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.02,
              shadowRadius: 8,
              elevation: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '700',
                    color: '#64748b',
                    textTransform: 'uppercase',
                  }}>
                  {language === 'english' ? 'Wallet Balance' : 'वॉलेट बैलेंस'}
                </Text>
                <Text style={{ fontSize: 24, fontWeight: '800', color: '#1e293b', marginTop: 4 }}>
                  ₹1,450
                </Text>
              </View>
              <TouchableOpacity
                onPress={handlePayoutPress}
                activeOpacity={0.8}
                style={{
                  backgroundColor: '#0056d2',
                  borderRadius: 12,
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Feather name="arrow-up-right" size={14} color="#ffffff" />
                <Text style={{ fontSize: 13, fontWeight: '800', color: '#ffffff', marginLeft: 4 }}>
                  {language === 'english' ? 'Payout' : 'पेआउट'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ height: 1, backgroundColor: '#f1f5f9', marginVertical: 14 }} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 13, fontWeight: '600', color: '#64748b' }}>
                {language === 'english' ? "Today's Payout Eligible" : 'आज का पेआउट योग्य'}
              </Text>
              <Text style={{ fontSize: 14, fontWeight: '800', color: '#22c55e' }}>₹940</Text>
            </View>
          </View>

          {/* Group 1: General Info Settings */}
          <Text
            style={{
              fontSize: 14,
              fontWeight: '800',
              color: '#475569',
              marginTop: 28,
              marginBottom: 10,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}>
            {language === 'english' ? 'Account Details' : 'खाता विवरण'}
          </Text>

          <View
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 20,
              padding: 16,
              borderWidth: 1,
              borderColor: '#f1f5f9',
            }}>
            {/* Account Status Row */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Feather name="activity" size={18} color="#0056d2" />
                <Text style={{ marginLeft: 12, fontSize: 14, fontWeight: '700', color: '#1e293b' }}>
                  {t.dashboard.profileStatus}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#dcfce7',
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 12,
                }}>
                <Text style={{ fontSize: 11, fontWeight: '800', color: '#15803d' }}>
                  {language === 'english' ? 'ACTIVE' : 'सक्रिय'}
                </Text>
              </View>
            </View>

            {/* Account Joined Row */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 14,
                paddingTop: 14,
                borderTopWidth: 1,
                borderTopColor: '#f1f5f9',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Feather name="calendar" size={18} color="#0056d2" />
                <Text style={{ marginLeft: 12, fontSize: 14, fontWeight: '700', color: '#1e293b' }}>
                  {t.dashboard.profileJoined}
                </Text>
              </View>
              <Text style={{ fontSize: 13, fontWeight: '700', color: '#64748b' }}>
                {language === 'english' ? '12 June 2026' : '१२ जून २०२६'}
              </Text>
            </View>
          </View>

          {/* Group 2: Vehicle Info Settings */}
          <Text
            style={{
              fontSize: 14,
              fontWeight: '800',
              color: '#475569',
              marginTop: 24,
              marginBottom: 10,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}>
            {t.dashboard.vehicleInfo}
          </Text>

          <View
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 20,
              padding: 16,
              borderWidth: 1,
              borderColor: '#f1f5f9',
            }}>
            {/* Vehicle Model Row */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Feather name="truck" size={18} color="#0056d2" />
                <Text style={{ marginLeft: 12, fontSize: 14, fontWeight: '700', color: '#1e293b' }}>
                  {language === 'english' ? 'Vehicle Model' : 'वाहन का मॉडल'}
                </Text>
              </View>
              <Text style={{ fontSize: 13, fontWeight: '700', color: '#1e293b' }}>
                {t.dashboard.vehicleModel}
              </Text>
            </View>

            {/* Vehicle Plate Row */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 14,
                paddingTop: 14,
                borderTopWidth: 1,
                borderTopColor: '#f1f5f9',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Feather name="credit-card" size={18} color="#0056d2" />
                <Text style={{ marginLeft: 12, fontSize: 14, fontWeight: '700', color: '#1e293b' }}>
                  {language === 'english' ? 'Plate Number' : 'लाइसेंस प्लेट नंबर'}
                </Text>
              </View>
              <Text style={{ fontSize: 13, fontWeight: '800', color: '#0f172a' }}>
                {t.dashboard.vehiclePlate}
              </Text>
            </View>
          </View>

          {/* Group 2.5: Safety & Emergency */}
          <Text
            style={{
              fontSize: 14,
              fontWeight: '800',
              color: '#ef4444',
              marginTop: 24,
              marginBottom: 10,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}>
            {t.dashboard.profileSafety}
          </Text>

          <View
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 20,
              padding: 16,
              borderWidth: 1,
              borderColor: '#fee2e2',
            }}>
            {/* Trigger SOS Button */}
            <TouchableOpacity
              onPress={() => {
                Alert.alert(t.dashboard.profileSosAlertTitle, t.dashboard.profileSosAlertMsg, [
                  { text: 'OK', style: 'default' },
                ]);
              }}
              activeOpacity={0.8}
              style={{
                backgroundColor: '#fef2f2',
                borderWidth: 1,
                borderColor: '#fca5a5',
                borderRadius: 14,
                paddingVertical: 12,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Feather name="alert-triangle" size={16} color="#dc2626" />
              <Text style={{ fontSize: 13, fontWeight: '800', color: '#dc2626', marginLeft: 8 }}>
                {t.dashboard.profileSosBtn}
              </Text>
            </TouchableOpacity>

            {/* Share Live Location Toggle */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 16,
                paddingTop: 14,
                borderTopWidth: 1,
                borderTopColor: '#f1f5f9',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Feather name="navigation" size={18} color="#0056d2" />
                <Text style={{ marginLeft: 12, fontSize: 14, fontWeight: '700', color: '#1e293b' }}>
                  {t.dashboard.profileShareLocation}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setShareLocation(!shareLocation)}
                activeOpacity={0.8}
                style={{
                  width: 48,
                  height: 26,
                  borderRadius: 13,
                  backgroundColor: shareLocation ? '#22c55e' : '#cbd5e1',
                  padding: 2,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    backgroundColor: '#ffffff',
                    transform: [{ translateX: shareLocation ? 22 : 0 }],
                  }}
                />
              </TouchableOpacity>
            </View>

            {/* Emergency Contacts Helpline Row */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 14,
                paddingTop: 14,
                borderTopWidth: 1,
                borderTopColor: '#f1f5f9',
              }}>
              {/* Call Police (112) */}
              <TouchableOpacity
                onPress={() => Linking.openURL('tel:112')}
                activeOpacity={0.7}
                style={{
                  flex: 1,
                  backgroundColor: '#f8fafc',
                  borderWidth: 1,
                  borderColor: '#e2e8f0',
                  borderRadius: 12,
                  paddingVertical: 10,
                  marginRight: 6,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Feather name="shield" size={14} color="#0056d2" />
                <Text style={{ fontSize: 11, fontWeight: '800', color: '#0f172a', marginTop: 4 }}>
                  Police (112)
                </Text>
              </TouchableOpacity>

              {/* Call Ambulance (108) */}
              <TouchableOpacity
                onPress={() => Linking.openURL('tel:108')}
                activeOpacity={0.7}
                style={{
                  flex: 1,
                  backgroundColor: '#f8fafc',
                  borderWidth: 1,
                  borderColor: '#e2e8f0',
                  borderRadius: 12,
                  paddingVertical: 10,
                  marginLeft: 6,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Feather name="heart" size={14} color="#dc2626" />
                <Text style={{ fontSize: 11, fontWeight: '800', color: '#0f172a', marginTop: 4 }}>
                  Ambulance (108)
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Group 3: Help & Support */}
          <Text
            style={{
              fontSize: 14,
              fontWeight: '800',
              color: '#475569',
              marginTop: 24,
              marginBottom: 10,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}>
            {language === 'english' ? 'Help & Support' : 'सहायता और संपर्क'}
          </Text>

          <View
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 20,
              padding: 16,
              borderWidth: 1,
              borderColor: '#f1f5f9',
            }}>
            {/* Call Helpline Row */}
            <TouchableOpacity
              onPress={() => handleContactPress('call')}
              activeOpacity={0.7}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Feather name="phone" size={18} color="#0056d2" />
                <Text style={{ marginLeft: 12, fontSize: 14, fontWeight: '700', color: '#1e293b' }}>
                  {language === 'english' ? 'Call Support Helpline' : 'कॉल सपोर्ट हेल्पलाइन'}
                </Text>
              </View>
              <Feather name="chevron-right" size={16} color="#cbd5e1" />
            </TouchableOpacity>

            {/* WhatsApp Row */}
            <TouchableOpacity
              onPress={() => handleContactPress('whatsapp')}
              activeOpacity={0.7}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 14,
                paddingTop: 14,
                borderTopWidth: 1,
                borderTopColor: '#f1f5f9',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Feather name="message-circle" size={18} color="#22c55e" />
                <Text style={{ marginLeft: 12, fontSize: 14, fontWeight: '700', color: '#1e293b' }}>
                  {language === 'english' ? 'WhatsApp Support' : 'व्हाट्सएप सपोर्ट'}
                </Text>
              </View>
              <Feather name="chevron-right" size={16} color="#cbd5e1" />
            </TouchableOpacity>

            {/* Email Support Row */}
            <TouchableOpacity
              onPress={() => handleContactPress('email')}
              activeOpacity={0.7}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 14,
                paddingTop: 14,
                borderTopWidth: 1,
                borderTopColor: '#f1f5f9',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Feather name="mail" size={18} color="#e11d48" />
                <Text style={{ marginLeft: 12, fontSize: 14, fontWeight: '700', color: '#1e293b' }}>
                  {language === 'english' ? 'Email Support' : 'ईमेल सपोर्ट'}
                </Text>
              </View>
              <Feather name="chevron-right" size={16} color="#cbd5e1" />
            </TouchableOpacity>
          </View>

          {/* Group 4: Language Settings */}
          <Text
            style={{
              fontSize: 14,
              fontWeight: '800',
              color: '#475569',
              marginTop: 24,
              marginBottom: 10,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}>
            {t.dashboard.langTitle}
          </Text>

          {/* Segmented Picker Pill */}
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#ffffff',
              borderRadius: 100,
              borderWidth: 1,
              borderColor: '#e2e8f0',
              padding: 4,
              height: 48,
            }}>
            {/* English Tab */}
            <TouchableOpacity
              onPress={() => {
                if (language !== 'english') changeLanguage('english');
              }}
              activeOpacity={0.8}
              style={{
                flex: 1,
                backgroundColor: language === 'english' ? '#0056d2' : 'transparent',
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '700',
                  color: language === 'english' ? '#ffffff' : '#64748b',
                }}>
                English
              </Text>
            </TouchableOpacity>

            {/* Hindi Tab */}
            <TouchableOpacity
              onPress={() => {
                if (language !== 'hindi') changeLanguage('hindi');
              }}
              activeOpacity={0.8}
              style={{
                flex: 1,
                backgroundColor: language === 'hindi' ? '#0056d2' : 'transparent',
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: '700',
                  color: language === 'hindi' ? '#ffffff' : '#64748b',
                }}>
                हिंदी
              </Text>
            </TouchableOpacity>
          </View>

          {/* Logout Button */}
          <TouchableOpacity
            onPress={handleLogoutPress}
            activeOpacity={0.8}
            style={{
              backgroundColor: '#fef2f2',
              borderWidth: 1,
              borderColor: '#fee2e2',
              borderRadius: 18,
              paddingVertical: 16,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginTop: 32,
              shadowColor: '#ef4444',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.05,
              shadowRadius: 12,
              elevation: 1,
            }}>
            <Feather name="log-out" size={18} color="#ef4444" />
            <Text style={{ fontSize: 15, fontWeight: '800', color: '#ef4444', marginLeft: 8 }}>
              {t.dashboard.logout}
            </Text>
          </TouchableOpacity>

          {/* App Version & Build Metadata */}
          <View style={{ alignItems: 'center', marginTop: 36, marginBottom: 16 }}>
            <Text style={{ fontSize: 12, color: '#94a3b8', fontWeight: '700' }}>
              App Version: v1.0.0 (Build 102)
            </Text>
            <TouchableOpacity
              onPress={handleCheckUpdates}
              activeOpacity={0.7}
              style={{ marginTop: 6, paddingVertical: 4, paddingHorizontal: 12 }}>
              <Text style={{ fontSize: 12, color: '#0056d2', fontWeight: '800' }}>
                {language === 'english' ? 'Check for Updates' : 'अपडेट के लिए जांचें'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
