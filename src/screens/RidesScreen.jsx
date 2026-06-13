import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal, Pressable, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { translations } from '../constants/translations';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import LanguageToggleButton from '../components/LanguageToggleButton';

export default function RidesScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { language } = useSelector((state) => state.language);
  const t = translations[language] || translations.english;

  const [rideFilter, setRideFilter] = useState('all');
  const [selectedRide, setSelectedRide] = useState(null);

  useEffect(() => {
    const parent = navigation.getParent();
    if (parent) {
      if (selectedRide !== null) {
        parent.setOptions({
          tabBarStyle: { display: 'none' },
        });
      } else {
        parent.setOptions({
          tabBarStyle: {
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 24,
            height: 68,
            paddingBottom: 10,
            paddingTop: 10,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.3)',
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.1,
            shadowRadius: 16,
            elevation: 8,
          },
        });
      }
    }
    return () => {
      if (parent) {
        parent.setOptions({
          tabBarStyle: {
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 24,
            height: 68,
            paddingBottom: 10,
            paddingTop: 10,
            borderWidth: 1,
            borderColor: 'rgba(255, 255, 255, 0.3)',
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.1,
            shadowRadius: 16,
            elevation: 8,
          },
        });
      }
    };
  }, [selectedRide, navigation]);

  const getLocalizedVal = (item, field) => {
    if (!item) return '';
    const key = language === 'english' ? `${field}En` : `${field}Hi`;
    return item[key] || item[field] || '';
  };

  const ridesData = [
    {
      id: '#34092',
      dateEn: '12 June, 05:30 PM',
      dateHi: '12 जून, शाम 05:30',
      amount: '₹280',
      status: 'completed',
      originEn: 'Akurdi Railway Station',
      originHi: 'आकुर्डी रेलवे स्टेशन',
      destinationEn: 'Nigdi Chowk',
      destinationHi: 'निगड़ी चौक',
    },
    {
      id: '#34081',
      dateEn: '12 June, 02:15 PM',
      dateHi: '12 जून, दोपहर 02:15',
      amount: '₹310',
      status: 'completed',
      originEn: 'Chinchwad Mall',
      originHi: 'चिंचवाड़ मॉल',
      destinationEn: 'Bhosari',
      destinationHi: 'भोसरी',
    },
    {
      id: '#34070',
      dateEn: '11 June, 11:00 AM',
      dateHi: '11 जून, सुबह 11:00',
      amount: '₹150',
      status: 'cancelled',
      originEn: 'Pimpri Chowk',
      originHi: 'पिंपरी चौक',
      destinationEn: 'Akurdi',
      destinationHi: 'आकुर्डी',
    },
    {
      id: '#34065',
      dateEn: '10 June, 04:45 PM',
      dateHi: '10 जून, शाम 04:45',
      amount: '₹420',
      status: 'completed',
      originEn: 'Pune Airport',
      originHi: 'पुणे हवाई अड्डा',
      destinationEn: 'Wakad',
      destinationHi: 'वाकड',
    },
    {
      id: '#34054',
      dateEn: '09 June, 08:30 PM',
      dateHi: '09 जून, रात 08:30',
      amount: '₹350',
      status: 'completed',
      originEn: 'Hinjawadi Phase 3',
      originHi: 'हिंजेवाड़ी फेज 3',
      destinationEn: 'Baner',
      destinationHi: 'बानेर',
    },
    {
      id: '#34042',
      dateEn: '08 June, 09:15 AM',
      dateHi: '08 जून, सुबह 09:15',
      amount: '₹180',
      status: 'completed',
      originEn: 'Kothrud',
      originHi: 'कोथरुड',
      destinationEn: 'Deccan Gymkhana',
      destinationHi: 'डेक्कन जिमखाना',
    },
    {
      id: '#34031',
      dateEn: '08 June, 12:45 PM',
      dateHi: '08 जून, दोपहर 12:45',
      amount: '₹220',
      status: 'completed',
      originEn: 'Swargate',
      originHi: 'स्वारगेट',
      destinationEn: 'Hadapsar',
      destinationHi: 'हड़पसर',
    },
    {
      id: '#34025',
      dateEn: '07 June, 03:00 PM',
      dateHi: '07 जून, दोपहर 03:00',
      amount: '₹290',
      status: 'cancelled',
      originEn: 'Katraj Zoo',
      originHi: 'कातरज चिड़ियाघर',
      destinationEn: 'Dhankawadi',
      destinationHi: 'धनकवाड़ी',
    },
    {
      id: '#34018',
      dateEn: '06 June, 10:10 AM',
      dateHi: '06 जून, सुबह 10:10',
      amount: '₹510',
      status: 'completed',
      originEn: 'Pune Station',
      originHi: 'पुणे स्टेशन',
      destinationEn: 'Kharadi',
      destinationHi: 'खराड़ी',
    },
    {
      id: '#34009',
      dateEn: '05 June, 06:15 PM',
      dateHi: '05 जून, शाम 06:15',
      amount: '₹190',
      status: 'completed',
      originEn: 'Viman Nagar',
      originHi: 'विमान नगर',
      destinationEn: 'Kalyani Nagar',
      destinationHi: 'कल्याणी नगर',
    },
    {
      id: '#33995',
      dateEn: '04 June, 02:30 PM',
      dateHi: '04 जून, दोपहर 02:30',
      amount: '₹330',
      status: 'completed',
      originEn: 'Yerwada',
      originHi: 'यरवदा',
      destinationEn: 'Koregaon Park',
      destinationHi: 'कोरेगांव पार्क',
    },
  ];

  const filteredRides = ridesData.filter((ride) => {
    if (rideFilter === 'all') return true;
    return ride.status === rideFilter;
  });

  const renderDrawerContent = () => {
    const ride = selectedRide || {
      id: '',
      status: '',
      origin: '',
      destination: '',
      amount: '',
      date: '',
    };

    const content = (
      <View
        style={{
          width: '100%',
          paddingHorizontal: 24,
          paddingTop: 16,
          paddingBottom: Math.max(insets.bottom, 16) + 16,
        }}>
        {/* Drag Handle Pill */}
        <View
          style={{
            width: 40,
            height: 5,
            borderRadius: 3,
            backgroundColor: '#cbd5e1',
            alignSelf: 'center',
            marginBottom: 20,
          }}
        />

        {/* Header Area */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <View>
            <Text style={{ fontSize: 13, color: '#64748b', fontWeight: '600' }}>
              {language === 'english' ? 'Ride Details' : 'यात्रा का विवरण'}
            </Text>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#0f172a', marginTop: 2 }}>
              Ride {ride.id}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: ride.status === 'completed' ? '#f0fdf4' : '#fef2f2',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: ride.status === 'completed' ? '#dcfce7' : '#fee2e2',
            }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '800',
                color: ride.status === 'completed' ? '#16a34a' : '#ef4444',
                textTransform: 'capitalize',
              }}>
              {ride.status === 'completed'
                ? t.dashboard.filterCompleted
                : t.dashboard.filterCancelled}
            </Text>
          </View>
        </View>

        {/* Info Cards / Route Timeline */}
        <View
          style={{
            backgroundColor: '#f8fafc',
            borderRadius: 20,
            padding: 16,
            borderWidth: 1,
            borderColor: '#f1f5f9',
            marginBottom: 20,
          }}>
          {/* Origin */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <View style={{ alignItems: 'center', marginRight: 12, marginTop: 3 }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: '#22c55e',
                }}
              />
              <View
                style={{
                  width: 2,
                  height: 32,
                  backgroundColor: '#cbd5e1',
                  marginVertical: 4,
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 11,
                  color: '#94a3b8',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                }}>
                {language === 'english' ? 'Pickup Location' : 'पिकअप स्थान'}
              </Text>
              <Text style={{ fontSize: 14, color: '#1e293b', fontWeight: '600', marginTop: 2 }}>
                {getLocalizedVal(ride, 'origin') || 'N/A'}
              </Text>
            </View>
          </View>

          {/* Destination */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <View style={{ alignItems: 'center', marginRight: 12, marginTop: 5 }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: '#ef4444',
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 11,
                  color: '#94a3b8',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                }}>
                {language === 'english' ? 'Drop Location' : 'ड्रॉप स्थान'}
              </Text>
              <Text style={{ fontSize: 14, color: '#1e293b', fontWeight: '600', marginTop: 2 }}>
                {getLocalizedVal(ride, 'destination') || 'N/A'}
              </Text>
            </View>
          </View>
        </View>

        {/* Ride Stats Grid */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
          {/* Fare Card */}
          <View
            style={{
              width: '48%',
              backgroundColor: '#f8fafc',
              borderRadius: 16,
              padding: 14,
              borderWidth: 1,
              borderColor: '#f1f5f9',
            }}>
            <Text style={{ fontSize: 11, color: '#64748b', fontWeight: '600' }}>
              {language === 'english' ? 'Total Fare' : 'कुल किराया'}
            </Text>
            <Text style={{ fontSize: 18, fontWeight: '800', color: '#0f172a', marginTop: 4 }}>
              {ride.amount}
            </Text>
          </View>

          {/* Payment Mode Card */}
          <View
            style={{
              width: '48%',
              backgroundColor: '#f8fafc',
              borderRadius: 16,
              padding: 14,
              borderWidth: 1,
              borderColor: '#f1f5f9',
            }}>
            <Text style={{ fontSize: 11, color: '#64748b', fontWeight: '600' }}>
              {language === 'english' ? 'Payment Mode' : 'भुगतान का तरीका'}
            </Text>
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#0f172a', marginTop: 6 }}>
              {ride.status === 'completed'
                ? language === 'english'
                  ? 'UPI / Cash'
                  : 'यूपीआई / कैश'
                : 'N/A'}
            </Text>
          </View>
        </View>

        {/* Date & Time Section */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#eff6ff',
            borderRadius: 16,
            padding: 14,
            marginBottom: 20,
          }}>
          <Feather name="calendar" size={18} color="#3b82f6" />
          <Text style={{ fontSize: 13, color: '#1e3a8a', fontWeight: '600', marginLeft: 10 }}>
            {getLocalizedVal(ride, 'date')}
          </Text>
        </View>

        {/* Close Button */}
        <TouchableOpacity
          onPress={() => setSelectedRide(null)}
          activeOpacity={0.8}
          style={{
            backgroundColor: '#0056d2',
            borderRadius: 16,
            paddingVertical: 16,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize: 15, fontWeight: '800', color: '#ffffff' }}>
            {language === 'english' ? 'Close' : 'बंद करें'}
          </Text>
        </TouchableOpacity>
      </View>
    );

    if (Platform.OS === 'ios') {
      return <View style={{ flex: 1, backgroundColor: '#ffffff' }}>{content}</View>;
    }

    return (
      <Pressable
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          justifyContent: 'flex-end',
        }}
        onPress={() => setSelectedRide(null)}>
        <Pressable
          onPress={() => {}}
          style={{
            width: '100%',
            backgroundColor: '#ffffff',
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
          }}>
          {content}
        </Pressable>
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f6f8fb' }}>
      {/* Fixed Rides Header Banner */}
      <View
        style={{
          backgroundColor: '#0056d2',
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
          paddingTop: insets.top + 16,
          paddingBottom: 40,
          paddingHorizontal: 24,
        }}>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 24, fontWeight: '800', color: '#ffffff' }}>
            {t.dashboard.ridesHeader}
          </Text>
          <LanguageToggleButton />
        </View>
      </View>

      {/* Fixed Filter Segmented Control */}
      <View style={{ paddingHorizontal: 24, marginTop: 20, marginBottom: 8 }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#ffffff',
            borderRadius: 12,
            padding: 4,
            borderWidth: 1,
            borderColor: '#e2e8f0',
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.02,
            shadowRadius: 6,
            elevation: 2,
          }}>
          {['all', 'completed', 'cancelled'].map((filter) => {
            const isActive = rideFilter === filter;
            let label = '';
            if (filter === 'all') label = t.dashboard.filterAll;
            else if (filter === 'completed') label = t.dashboard.filterCompleted;
            else label = t.dashboard.filterCancelled;

            return (
              <TouchableOpacity
                key={filter}
                onPress={() => setRideFilter(filter)}
                activeOpacity={0.8}
                style={{
                  flex: 1,
                  backgroundColor: isActive ? '#0056d2' : 'transparent',
                  borderRadius: 8,
                  paddingVertical: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: '700',
                    color: isActive ? '#ffffff' : '#64748b',
                  }}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Scrollable FlatList of Rides */}
      <FlatList
        data={filteredRides}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 110, paddingTop: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedRide(item)}
            activeOpacity={0.8}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              borderRadius: 16,
              padding: 16,
              marginBottom: 12,
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.03,
              shadowRadius: 8,
              elevation: 2,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 18,
                  backgroundColor: item.status === 'completed' ? '#eff6ff' : '#fef2f2',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Feather
                  name={item.status === 'completed' ? 'check' : 'x'}
                  size={16}
                  color={item.status === 'completed' ? '#3b82f6' : '#ef4444'}
                />
              </View>
              <View style={{ marginLeft: 12, flex: 1, paddingRight: 8 }}>
                <Text style={{ fontSize: 14, fontWeight: '700', color: '#1e293b' }}>
                  Ride {item.id}
                </Text>
                <Text style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>
                  {getLocalizedVal(item, 'date')}
                </Text>
                {getLocalizedVal(item, 'origin') && getLocalizedVal(item, 'destination') && (
                  <Text
                    style={{ fontSize: 11, color: '#475569', marginTop: 4, fontWeight: '500' }}
                    numberOfLines={1}>
                    📍 {getLocalizedVal(item, 'origin')} → {getLocalizedVal(item, 'destination')}
                  </Text>
                )}
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 15, fontWeight: '800', color: '#0f172a' }}>
                {item.amount}
              </Text>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '600',
                  color: item.status === 'completed' ? '#22c55e' : '#ef4444',
                  marginTop: 2,
                  textTransform: 'capitalize',
                }}>
                {item.status === 'completed'
                  ? t.dashboard.filterCompleted
                  : t.dashboard.filterCancelled}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 60 }}>
            <Feather name="calendar" size={48} color="#cbd5e1" />
            <Text style={{ fontSize: 14, color: '#94a3b8', marginTop: 12, fontWeight: '600' }}>
              {language === 'english' ? 'No Rides Found' : 'कोई यात्रा नहीं मिली'}
            </Text>
          </View>
        }
      />

      {/* Native-feeling Ride Info Modal Drawer */}
      <Modal
        visible={selectedRide !== null}
        transparent={Platform.OS !== 'ios'}
        animationType="slide"
        statusBarTranslucent={true}
        {...(Platform.OS === 'ios' ? { presentationStyle: 'pageSheet' } : {})}
        onRequestClose={() => setSelectedRide(null)}>
        {renderDrawerContent()}
      </Modal>
    </View>
  );
}
