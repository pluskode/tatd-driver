import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { translations } from '../constants/translations';
import { Feather } from '@expo/vector-icons';
import LanguageToggleButton from '../components/LanguageToggleButton';
import Toast from 'react-native-toast-message';

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();

  const [checklist, setChecklist] = useState({
    1: false,
    2: false,
    3: false,
  });

  const toggleChecklist = (id) => {
    setChecklist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Retrieve states
  const { language } = useSelector((state) => state.language);
  const { user } = useSelector((state) => state.auth);
  const t = translations[language] || translations.english;

  const activeMobile = user?.mobile || '';

  return (
    <View style={{ flex: 1, backgroundColor: '#f6f8fb' }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}>
        {/* Blue Top Header Banner */}
        <View
          style={{
            backgroundColor: '#0056d2',
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
            paddingTop: insets.top + 24,
            paddingBottom: 48,
            paddingHorizontal: 24,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
            <View style={{ flex: 1, paddingRight: 16 }}>
              <Text style={{ fontSize: 24, fontWeight: '800', color: '#ffffff' }}>
                {t.dashboard.welcome}
              </Text>
              <Text style={{ fontSize: 14, fontWeight: '500', color: '#93c5fd', marginTop: 4 }}>
                {t.dashboard.subtitle}
              </Text>
            </View>

            <LanguageToggleButton style={{ marginTop: 4 }} />
          </View>
        </View>

        {/* Mobile Number Card (Overlapping) */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            borderRadius: 24,
            padding: 20,
            marginTop: -32,
            marginHorizontal: 24,
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.05,
            shadowRadius: 16,
            elevation: 6,
          }}>
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: '#e6f0fa',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: 38,
                height: 38,
                borderRadius: 19,
                backgroundColor: '#0056d2',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Feather name="phone" size={18} color="#ffffff" />
            </View>
          </View>
          <View style={{ marginLeft: 16 }}>
            <Text style={{ fontSize: 13, color: '#64748b', fontWeight: '600' }}>
              {t.dashboard.mobileLabel}
            </Text>
            <Text style={{ fontSize: 18, color: '#0f172a', fontWeight: '800', marginTop: 2 }}>
              {activeMobile}
            </Text>
          </View>
        </View>

        {/* Today's Summary Stats Card */}
        <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
          <Text style={{ fontSize: 15, fontWeight: '800', color: '#334155', marginBottom: 12 }}>
            {t.dashboard.statsTitle}
          </Text>

          <View
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 24,
              padding: 20,
              shadowColor: '#0056d2',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.04,
              shadowRadius: 24,
              elevation: 4,
              borderWidth: 1,
              borderColor: '#f1f5f9',
            }}>
            {/* Top row: Big Primary Stat (Earnings) */}
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
                    color: '#64748b',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}>
                  {t.dashboard.earnings}
                </Text>
                <Text style={{ fontSize: 28, fontWeight: '900', color: '#10b981', marginTop: 4 }}>
                  ₹1,240
                </Text>
              </View>

              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: '#ecfdf5',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Feather name="trending-up" size={24} color="#10b981" />
              </View>
            </View>

            {/* Separator line */}
            <View style={{ height: 1, backgroundColor: '#f1f5f9', marginVertical: 16 }} />

            {/* Bottom Row: Secondary Stats Grid */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {/* Stat 1: Trips */}
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: '#eff6ff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                  }}>
                  <Feather name="navigation" size={18} color="#3b82f6" />
                </View>
                <View>
                  <Text style={{ fontSize: 11, color: '#64748b', fontWeight: '600' }}>
                    {t.dashboard.trips}
                  </Text>
                  <Text style={{ fontSize: 15, fontWeight: '800', color: '#1e293b', marginTop: 2 }}>
                    5
                  </Text>
                </View>
              </View>

              {/* Vertical divider */}
              <View style={{ width: 1, backgroundColor: '#f1f5f9', marginHorizontal: 16 }} />

              {/* Stat 2: Rating */}
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: '#fffbeb',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                  }}>
                  <Feather name="star" size={18} color="#eab308" fill="#eab308" />
                </View>
                <View>
                  <Text style={{ fontSize: 11, color: '#64748b', fontWeight: '600' }}>
                    {t.dashboard.rating}
                  </Text>
                  <Text style={{ fontSize: 15, fontWeight: '800', color: '#1e293b', marginTop: 2 }}>
                    4.9 ★
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions Grid */}
        <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#334155', marginBottom: 12 }}>
            {t.dashboard.actionsTitle}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {/* Action 1 */}
            <TouchableOpacity
              onPress={() =>
                Toast.show({
                  type: 'info',
                  text1: language === 'english' ? 'Coming Soon' : 'जल्द ही आ रहा है',
                  text2:
                    language === 'english'
                      ? 'This feature will be available shortly.'
                      : 'यह सुविधा जल्द ही उपलब्ध होगी।',
                })
              }
              activeOpacity={0.8}
              style={{
                width: '30%',
                backgroundColor: '#ffffff',
                borderRadius: 16,
                paddingVertical: 14,
                alignItems: 'center',
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.03,
                shadowRadius: 8,
                elevation: 2,
              }}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: '#eff6ff',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Feather name="truck" size={16} color="#3b82f6" />
              </View>
              <Text
                style={{
                  fontSize: 12,
                  color: '#475569',
                  fontWeight: '700',
                  marginTop: 8,
                  textAlign: 'center',
                }}>
                {t.dashboard.actionVehicles}
              </Text>
            </TouchableOpacity>

            {/* Action 2 */}
            <TouchableOpacity
              onPress={() =>
                Toast.show({
                  type: 'info',
                  text1: language === 'english' ? 'Coming Soon' : 'जल्द ही आ रहा है',
                  text2:
                    language === 'english'
                      ? 'This feature will be available shortly.'
                      : 'यह सुविधा जल्द ही उपलब्ध होगी।',
                })
              }
              activeOpacity={0.8}
              style={{
                width: '30%',
                backgroundColor: '#ffffff',
                borderRadius: 16,
                paddingVertical: 14,
                alignItems: 'center',
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.03,
                shadowRadius: 8,
                elevation: 2,
              }}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: '#f0fdf4',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Feather name="file-text" size={16} color="#22c55e" />
              </View>
              <Text
                style={{
                  fontSize: 12,
                  color: '#475569',
                  fontWeight: '700',
                  marginTop: 8,
                  textAlign: 'center',
                }}>
                {t.dashboard.actionDocuments}
              </Text>
            </TouchableOpacity>

            {/* Action 3 */}
            <TouchableOpacity
              onPress={() =>
                Toast.show({
                  type: 'info',
                  text1: language === 'english' ? 'Coming Soon' : 'जल्द ही आ रहा है',
                  text2:
                    language === 'english'
                      ? 'This feature will be available shortly.'
                      : 'यह सुविधा जल्द ही उपलब्ध होगी।',
                })
              }
              activeOpacity={0.8}
              style={{
                width: '30%',
                backgroundColor: '#ffffff',
                borderRadius: 16,
                paddingVertical: 14,
                alignItems: 'center',
                shadowColor: '#000000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.03,
                shadowRadius: 8,
                elevation: 2,
              }}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: '#fdf2f8',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Feather name="help-circle" size={16} color="#ec4899" />
              </View>
              <Text
                style={{
                  fontSize: 11,
                  color: '#475569',
                  fontWeight: '700',
                  marginTop: 8,
                  textAlign: 'center',
                }}>
                {t.dashboard.actionSupport}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notice Board Section */}
        <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#334155', marginBottom: 12 }}>
            {language === 'english' ? '📢 Announcements' : '📢 घोषणाएं'}
          </Text>
          <View
            style={{
              backgroundColor: '#fffbeb',
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: '#fef3c7',
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 }}>
              <Feather name="gift" size={16} color="#d97706" style={{ marginTop: 2 }} />
              <Text
                style={{
                  fontSize: 13,
                  color: '#b45309',
                  fontWeight: '600',
                  marginLeft: 10,
                  flex: 1,
                }}>
                {language === 'english'
                  ? 'Weekly incentive: Complete 15 rides to get ₹500 bonus!'
                  : 'साप्ताहिक प्रोत्साहन: ₹500 बोनस पाने के लिए 15 यात्राएं पूरी करें!'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Feather name="info" size={16} color="#d97706" style={{ marginTop: 2 }} />
              <Text
                style={{
                  fontSize: 13,
                  color: '#b45309',
                  fontWeight: '600',
                  marginLeft: 10,
                  flex: 1,
                }}>
                {language === 'english'
                  ? 'Keep your app updated to the latest version v2.37.'
                  : 'अपने ऐप को नवीनतम संस्करण v2.37 पर अपडेट रखें।'}
              </Text>
            </View>
          </View>
        </View>

        {/* Driver Checklist Section */}
        <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
          <Text style={{ fontSize: 15, fontWeight: '700', color: '#334155', marginBottom: 12 }}>
            {language === 'english' ? '✅ Daily Safety Checklist' : '✅ दैनिक सुरक्षा चेकलिस्ट'}
          </Text>
          <View
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 20,
              padding: 16,
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.03,
              shadowRadius: 8,
              elevation: 2,
            }}>
            {[
              {
                id: 1,
                en: 'Check vehicle fuel/battery level',
                hi: 'वाहन के ईंधन/बैटरी स्तर की जाँच करें',
              },
              {
                id: 2,
                en: 'Check tire pressure and lights',
                hi: 'टायर के दबाव और लाइटों की जाँच करें',
              },
              {
                id: 3,
                en: 'Ensure physical Driving License is with you',
                hi: 'सुनिश्चित करें कि भौतिक ड्राइविंग लाइसेंस आपके पास है',
              },
            ].map((item) => {
              const isChecked = checklist[item.id];
              return (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => toggleChecklist(item.id)}
                  activeOpacity={0.8}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 12,
                    borderBottomWidth: item.id === 3 ? 0 : 1,
                    borderBottomColor: '#f1f5f9',
                  }}>
                  <Feather
                    name={isChecked ? 'check-square' : 'square'}
                    size={20}
                    color={isChecked ? '#22c55e' : '#94a3b8'}
                  />
                  <Text
                    style={{
                      fontSize: 13,
                      color: isChecked ? '#94a3b8' : '#334155',
                      fontWeight: '600',
                      marginLeft: 12,
                      flex: 1,
                      textDecorationLine: isChecked ? 'line-through' : 'none',
                    }}>
                    {language === 'english' ? item.en : item.hi}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
