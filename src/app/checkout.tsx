import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { useCart } from '@/context/CartContext';
import { useAppTheme } from '@/context/ThemeContext';

const PAYMENT_METHODS = [
  { id: 'evc', name: 'EVC Plus', emoji: '📱' },
  { id: 'edahab', name: 'eDahab', emoji: '💳' },
  { id: 'golis', name: 'Golis Sahal', emoji: '💰' },
];

export default function CheckoutScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const { items, totalPrice, clearCart } = useCart();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('evc');

  function handleConfirm() {
    if (!name.trim() || !phone.trim()) {
      Alert.alert('Fadlan buuxi', 'Fadlan geli magacaaga iyo lambarka telefoonkaaga.');
      return;
    }

    Alert.alert(
      'Order waa la xaqiijiyay! ✅',
      `Mahadsanid ${name}. Order-kaaga oo qiimihiisu yahay $${totalPrice} ayaa la diyaarinayaa.`,
      [
        {
          text: 'OK',
          onPress: () => {
            clearCart();
            router.push('/(tabs)');
          },
        },
      ]
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ paddingTop: 60, paddingHorizontal: 16, paddingBottom: 40 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', color: colors.accent, marginBottom: 20 }}>
        Checkout
      </Text>

      {/* Order Summary */}
      <View style={{ backgroundColor: colors.card, borderRadius: 14, padding: 16, marginBottom: 20 }}>
        <Text style={{ fontSize: 15, fontWeight: '700', marginBottom: 10, color: colors.text }}>Alaabta order-ka</Text>
        {items.map((item) => (
          <View key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
            <Text style={{ fontSize: 14, color: colors.text }}>{item.name} x{item.quantity}</Text>
            <Text style={{ fontSize: 14, color: colors.text }}>${item.price * item.quantity}</Text>
          </View>
        ))}
        <View style={{ borderTopWidth: 1, borderTopColor: colors.border, marginTop: 8, paddingTop: 8, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 16, fontWeight: '800', color: colors.text }}>Wadarta guud</Text>
          <Text style={{ fontSize: 16, fontWeight: '800', color: colors.accent }}>${totalPrice}</Text>
        </View>
      </View>

      {/* Contact Info */}
      <Text style={{ fontSize: 15, fontWeight: '700', marginBottom: 10, color: colors.text }}>Macluumaadkaaga</Text>
      <TextInput
        placeholder="Magacaaga"
        placeholderTextColor={colors.subtext}
        value={name}
        onChangeText={setName}
        style={{ backgroundColor: colors.card, borderRadius: 12, padding: 14, marginBottom: 12, fontSize: 15, color: colors.text }}
      />
      <TextInput
        placeholder="Lambarka Telefoonka"
        placeholderTextColor={colors.subtext}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={{ backgroundColor: colors.card, borderRadius: 12, padding: 14, marginBottom: 20, fontSize: 15, color: colors.text }}
      />

      {/* Payment Method */}
      <Text style={{ fontSize: 15, fontWeight: '700', marginBottom: 10, color: colors.text }}>Habka Lacag Bixinta</Text>
      {PAYMENT_METHODS.map((method) => (
        <Pressable
          key={method.id}
          onPress={() => setSelectedPayment(method.id)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.card,
            borderRadius: 12,
            padding: 14,
            marginBottom: 10,
            borderWidth: 2,
            borderColor: selectedPayment === method.id ? colors.primary : 'transparent',
          }}
        >
          <Text style={{ fontSize: 20, marginRight: 12 }}>{method.emoji}</Text>
          <Text style={{ fontSize: 15, fontWeight: '600', flex: 1, color: colors.text }}>{method.name}</Text>
          {selectedPayment === method.id && <Text style={{ fontSize: 16, color: colors.accent }}>✓</Text>}
        </Pressable>
      ))}

      <Pressable
        onPress={handleConfirm}
        style={{
          backgroundColor: colors.primary,
          paddingVertical: 16,
          borderRadius: 12,
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        <Text style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>Xaqiiji Order-ka</Text>
      </Pressable>
    </ScrollView>
  );
}