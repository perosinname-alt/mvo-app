import { useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { useAppTheme } from '@/context/ThemeContext';

// Test data
const ORDER = {
  id: 'MVO-10293',
  company: 'Xalwo Kismaayo',
  items: [
    { name: 'Halwo (500g)', quantity: 1, price: 5 },
    { name: 'Halwo (1kg)', quantity: 1, price: 9 },
  ],
  total: 14,
  address: 'Bosaso, Suuqa Kismaayo',
  driverName: 'Cabdi Yare',
  driverPhone: '0907712233',
};

const STEPS = [
  { key: 'placed', label: 'Dalabka waa la aqbalay', emoji: '📝', time: '10:02 AM' },
  { key: 'preparing', label: 'Diyaarsan', emoji: '📦', time: '10:08 AM' },
  { key: 'onway', label: 'Socda', emoji: '🚚', time: '10:20 AM' },
  { key: 'delivered', label: 'La geeyay', emoji: '✅', time: '' },
];

const CURRENT_STEP_INDEX = 2; // 0=placed, 1=preparing, 2=onway, 3=delivered

export default function OrderTrackingScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ paddingTop: 60, paddingHorizontal: 20, paddingBottom: 40 }}>
      <Text style={{ fontSize: 22, fontWeight: '800', color: colors.accent, marginBottom: 4 }}>
        Raadraaca Dalabka
      </Text>
      <Text style={{ fontSize: 13.5, color: colors.subtext, marginBottom: 24 }}>
        Dalab #{ORDER.id} · {ORDER.company}
      </Text>

      {/* Timeline */}
      <View
        style={{
          backgroundColor: colors.card,
          borderRadius: 18,
          padding: 20,
          marginBottom: 20,
        }}
      >
        {STEPS.map((step, index) => {
          const done = index <= CURRENT_STEP_INDEX;
          const isLast = index === STEPS.length - 1;
          const isCurrent = index === CURRENT_STEP_INDEX;
          return (
            <View key={step.key} style={{ flexDirection: 'row' }}>
              {/* Icon + line */}
              <View style={{ alignItems: 'center', marginRight: 14 }}>
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: done ? colors.primary : colors.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: 16 }}>{step.emoji}</Text>
                </View>
                {!isLast && (
                  <View
                    style={{
                      width: 3,
                      flex: 1,
                      minHeight: 32,
                      backgroundColor: index < CURRENT_STEP_INDEX ? colors.primary : colors.border,
                      marginVertical: 2,
                    }}
                  />
                )}
              </View>

              {/* Label */}
              <View style={{ flex: 1, paddingBottom: isLast ? 0 : 24 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: isCurrent ? '800' : '600',
                    color: done ? colors.text : colors.subtext,
                  }}
                >
                  {step.label}
                </Text>
                {done && step.time ? (
                  <Text style={{ fontSize: 12, color: colors.subtext, marginTop: 2 }}>{step.time}</Text>
                ) : null}
                {isCurrent && (
                  <Text style={{ fontSize: 12, color: colors.accent, fontWeight: '600', marginTop: 2 }}>
                    Hadda socota…
                  </Text>
                )}
              </View>
            </View>
          );
        })}
      </View>

      {/* Driver info */}
      <View
        style={{
          backgroundColor: colors.card,
          borderRadius: 16,
          padding: 16,
          marginBottom: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: 46,
            height: 46,
            borderRadius: 23,
            backgroundColor: colors.primarySoft,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
          }}
        >
          <Text style={{ fontSize: 20 }}>🚴</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14.5, fontWeight: '700', color: colors.text }}>{ORDER.driverName}</Text>
          <Text style={{ fontSize: 12.5, color: colors.subtext, marginTop: 2 }}>Wadaha gaarsiinta</Text>
        </View>
        <Text style={{ fontSize: 13, color: colors.accent, fontWeight: '700' }}>📞 Wac</Text>
      </View>

      {/* Order summary */}
      <View style={{ backgroundColor: colors.card, borderRadius: 16, padding: 16, marginBottom: 20 }}>
        <Text style={{ fontSize: 15, fontWeight: '700', color: colors.text, marginBottom: 10 }}>
          Alaabta dalabka
        </Text>
        {ORDER.items.map((item, index) => (
          <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
            <Text style={{ fontSize: 13.5, color: colors.text }}>{item.name} x{item.quantity}</Text>
            <Text style={{ fontSize: 13.5, color: colors.text }}>${item.price * item.quantity}</Text>
          </View>
        ))}
        <View style={{ borderTopWidth: 1, borderTopColor: colors.border, marginTop: 8, paddingTop: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 15, fontWeight: '800', color: colors.text }}>Wadarta guud</Text>
          <Text style={{ fontSize: 15, fontWeight: '800', color: colors.accent }}>${ORDER.total}</Text>
        </View>
        <Text style={{ fontSize: 12.5, color: colors.subtext, marginTop: 10 }}>📍 {ORDER.address}</Text>
      </View>
    </ScrollView>
  );
}