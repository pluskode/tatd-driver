import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Share } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import LanguageToggleButton, { useLanguage } from '../components/LanguageToggleButton';

// Mock upcoming scheduled bookings
const scheduleData = [
  {
    id: 'sched_1',
    dateEn: 'Tomorrow, 09:30 AM',
    dateHi: 'कल, सुबह 09:30 बजे',
    originEn: 'Pune Airport (PNQ)',
    originHi: 'पुणे एयरपोर्ट (PNQ)',
    destEn: 'Kothrud, Pune',
    destHi: 'कोथरुड, पुणे',
    typeEn: 'Local Trip',
    typeHi: 'लोकल ट्रिप',
    modelEn: 'Sedan (AC)',
    modelHi: 'सेडान (AC)',
    fare: '₹850',
  },
  {
    id: 'sched_2',
    dateEn: '15 June, 05:00 PM',
    dateHi: '15 जून, शाम 05:00 बजे',
    originEn: 'Swargate Bus Stand, Pune',
    originHi: 'स्वारगेट बस स्टैंड, पुणे',
    destEn: 'Mumbai Airport T2',
    destHi: 'मुंबई एयरपोर्ट T2',
    typeEn: 'Outstation One-Way',
    typeHi: 'आउटस्टेशन वन-वे',
    modelEn: 'SUV (6-Seater)',
    modelHi: 'एसयूवी (6-सीटर)',
    fare: '₹2,800',
  },
  {
    id: 'sched_3',
    dateEn: '18 June, 10:00 AM',
    dateHi: '18 जून, सुबह 10:00 बजे',
    originEn: 'Hinjawadi Phase 3, Pune',
    originHi: 'हिंजवड़ी फेज 3, पुणे',
    destEn: 'Chinchwad Station, Pune',
    destHi: 'चिंचवड़ स्टेशन, पुणे',
    typeEn: 'Hourly Rental (4 Hrs)',
    typeHi: 'प्रति घंटा रेंटल (4 घंटे)',
    modelEn: 'Tata Ace Gold',
    modelHi: 'टाटा एस गोल्ड',
    fare: '₹1,200',
  },
];

export default function ScheduleScreen() {
  const insets = useSafeAreaInsets();
  const { language, t } = useLanguage();

  const getLocalizedVal = (enVal, hiVal) => {
    return language === 'english' ? enVal : hiVal;
  };

  const handleShareBooking = async (item) => {
    try {
      const shareMessage =
        language === 'english'
          ? `TATD Scheduled Ride:\n📅 ${item.dateEn}\n📍 Pickup: ${item.originEn}\n🏁 Drop: ${item.destEn}\n💰 Est. Fare: ${item.fare}`
          : `TATD शेड्यूल यात्रा:\n📅 ${item.dateHi}\n📍 पिकअप: ${item.originHi}\n🏁 ड्रॉप: ${item.destHi}\n💰 अनु. किराया: ${item.fare}`;

      await Share.share({
        message: shareMessage,
      });
    } catch {
      // Ignore
    }
  };

  const renderScheduleItem = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 20,
          padding: 16,
          marginBottom: 16,
          borderWidth: 1,
          borderColor: '#e2e8f0',
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.02,
          shadowRadius: 12,
          elevation: 1,
        }}>
        {/* Top Header Row of Booking Card */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Feather name="calendar" size={14} color="#0056d2" />
            <Text
              style={{
                marginLeft: 6,
                fontSize: 13,
                fontWeight: '800',
                color: '#0056d2',
              }}>
              {getLocalizedVal(item.dateEn, item.dateHi)}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#eff6ff',
              paddingHorizontal: 8,
              paddingVertical: 3,
              borderRadius: 8,
            }}>
            <Text style={{ fontSize: 10, fontWeight: '700', color: '#1d4ed8' }}>
              {getLocalizedVal(item.typeEn, item.typeHi)}
            </Text>
          </View>
        </View>

        {/* Location Details block */}
        <View style={{ position: 'relative', paddingLeft: 20, marginBottom: 12 }}>
          {/* Visual vertical dot connector */}
          <View
            style={{
              position: 'absolute',
              left: 4,
              top: 4,
              bottom: 4,
              width: 1,
              backgroundColor: '#cbd5e1',
              borderStyle: 'dashed',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: 7,
                height: 7,
                borderRadius: 3.5,
                backgroundColor: '#0056d2',
                marginLeft: -3,
              }}
            />
            <View
              style={{
                width: 7,
                height: 7,
                borderRadius: 3.5,
                backgroundColor: '#ef4444',
                marginLeft: -3,
              }}
            />
          </View>

          {/* Origin Address */}
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 10,
                color: '#94a3b8',
                fontWeight: '700',
                textTransform: 'uppercase',
              }}>
              {language === 'english' ? 'PICKUP' : 'पिकअप'}
            </Text>
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#1e293b', marginTop: 1 }}>
              {getLocalizedVal(item.originEn, item.originHi)}
            </Text>
          </View>

          {/* Destination Address */}
          <View>
            <Text
              style={{
                fontSize: 10,
                color: '#94a3b8',
                fontWeight: '700',
                textTransform: 'uppercase',
              }}>
              {language === 'english' ? 'DROP' : 'ड्रॉप'}
            </Text>
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#1e293b', marginTop: 1 }}>
              {getLocalizedVal(item.destEn, item.destHi)}
            </Text>
          </View>
        </View>

        {/* Separator line */}
        <View style={{ height: 1, backgroundColor: '#f1f5f9', marginVertical: 10 }} />

        {/* Footer info & share button */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Feather name="truck" size={14} color="#64748b" />
            <Text
              style={{
                fontSize: 12,
                color: '#475569',
                fontWeight: '600',
                marginLeft: 6,
              }}>
              {getLocalizedVal(item.modelEn, item.modelHi)}
            </Text>
            <Text style={{ fontSize: 12, color: '#94a3b8', marginHorizontal: 6 }}>•</Text>
            <Text style={{ fontSize: 13, fontWeight: '800', color: '#22c55e' }}>{item.fare}</Text>
          </View>

          <TouchableOpacity
            onPress={() => handleShareBooking(item)}
            activeOpacity={0.7}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#f8fafc',
              borderWidth: 1,
              borderColor: '#e2e8f0',
              borderRadius: 8,
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}>
            <Feather name="share-2" size={12} color="#0056d2" />
            <Text
              style={{
                fontSize: 11,
                fontWeight: '700',
                color: '#0056d2',
                marginLeft: 4,
              }}>
              {language === 'english' ? 'Share' : 'शेयर'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f6f8fb' }}>
      {/* Header Banner */}
      <View
        style={{
          backgroundColor: '#0056d2',
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
          paddingTop: insets.top + 20,
          paddingBottom: 24,
          paddingHorizontal: 24,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{ fontSize: 24, fontWeight: '800', color: '#ffffff' }}>
            {t.dashboard.scheduleHeader}
          </Text>
          <LanguageToggleButton />
        </View>
      </View>

      {/* Main FlatList */}
      <FlatList
        data={scheduleData}
        keyExtractor={(item) => item.id}
        renderItem={renderScheduleItem}
        contentContainerStyle={{ padding: 20, paddingBottom: 110 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 80 }}>
            <Feather name="calendar" size={48} color="#cbd5e1" />
            <Text
              style={{
                fontSize: 14,
                color: '#64748b',
                fontWeight: '600',
                marginTop: 12,
              }}>
              {t.dashboard.scheduleNoRides}
            </Text>
          </View>
        }
      />
    </View>
  );
}
