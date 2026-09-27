import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

export default function RegisterScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  function handleSendCode() {
    router.push({ pathname: '/verify-code', params: { email, mode: 'register' } });
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#0B0F0D' }}
      contentContainerStyle={{ flexGrow: 1, paddingTop: 70, paddingHorizontal: 24, paddingBottom: 40 }}
    >
      {/* Logo */}
      <View style={{ alignItems: 'center', marginBottom: 24 }}>
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            backgroundColor: '#0F4C33',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 10,
          }}
        >
          <Text style={{ color: 'white', fontSize: 20, fontWeight: '700' }}>MVO</Text>
        </View>
      </View>

      <Text style={{ fontSize: 26, fontWeight: '800', color: 'white', textAlign: 'center', marginBottom: 8 }}>
        Samee Akoonkaaga
      </Text>
      <Text style={{ fontSize: 13.5, color: '#9CA3AF', textAlign: 'center', marginBottom: 30, lineHeight: 19 }}>
        Diiwaan gali si aad u bilowdo isticmaalka MVO.
      </Text>

      {/* Full Name */}
      <Text style={{ fontSize: 13, color: '#D1D5DB', marginBottom: 8 }}>Magaca oo dhan</Text>
      <TextInput
        placeholder="Tusaale: Ahmed Abdi Ali"
        placeholderTextColor="#6B7280"
        value={fullName}
        onChangeText={setFullName}
        style={{
          backgroundColor: '#151B18',
          borderRadius: 14,
          paddingHorizontal: 16,
          paddingVertical: 15,
          fontSize: 14,
          marginBottom: 16,
          color: 'white',
        }}
      />

      {/* Phone */}
      <Text style={{ fontSize: 13, color: '#D1D5DB', marginBottom: 8 }}>Lambarka Telefoonka</Text>
      <TextInput
        placeholder="61 234 5678"
        placeholderTextColor="#6B7280"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={{
          backgroundColor: '#151B18',
          borderRadius: 14,
          paddingHorizontal: 16,
          paddingVertical: 15,
          fontSize: 14,
          marginBottom: 16,
          color: 'white',
        }}
      />

      {/* Email */}
      <Text style={{ fontSize: 13, color: '#D1D5DB', marginBottom: 8 }}>Email</Text>
      <TextInput
        placeholder="tusaale@gmail.com"
        placeholderTextColor="#6B7280"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          backgroundColor: '#151B18',
          borderRadius: 14,
          paddingHorizontal: 16,
          paddingVertical: 15,
          fontSize: 14,
          marginBottom: 8,
          color: 'white',
        }}
      />
      <Text style={{ fontSize: 11.5, color: '#6B7280', marginBottom: 24 }}>
        Waxaan kuu dirnaa code xaqiijin ah email-kan.
      </Text>

      {/* Send code button */}
      <Pressable
        onPress={handleSendCode}
        style={{
          backgroundColor: '#0F4C33',
          borderRadius: 16,
          paddingVertical: 16,
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Text style={{ color: 'white', fontSize: 15, fontWeight: '700' }}>Dir Code-ka</Text>
      </Pressable>

      {/* Back to login */}
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={{ fontSize: 12, color: '#6B7280' }}>Horay ma u lahayd account? </Text>
        <Pressable onPress={() => router.push('/login')}>
          <Text style={{ fontSize: 12, color: '#2ECC71', fontWeight: '700' }}>Gal</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}