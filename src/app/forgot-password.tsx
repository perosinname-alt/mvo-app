import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  function handleSendCode() {
    if (!email.trim()) {
      Alert.alert('Fadlan geli email', 'Waxaad u baahan tahay inaad gelisid email-kaaga.');
      return;
    }
    router.push({ pathname: '/verify-code', params: { email, mode: 'reset' } });
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#0B0F0D' }}
      contentContainerStyle={{ flexGrow: 1, paddingTop: 90, paddingHorizontal: 24, paddingBottom: 40 }}
    >
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: '#151B18',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
        }}
      >
        <Text style={{ fontSize: 28 }}>🔑</Text>
      </View>

      <Text style={{ fontSize: 24, fontWeight: '800', color: 'white', marginBottom: 8 }}>
        Furaha Sirta Ma Ilowday?
      </Text>
      <Text style={{ fontSize: 13.5, color: '#9CA3AF', marginBottom: 30, lineHeight: 19 }}>
        Geli email-kaaga, waxaan kuu dirnaa code aad ku beddeli karto password-kaaga.
      </Text>

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
          marginBottom: 30,
          color: 'white',
        }}
      />

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

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Pressable onPress={() => router.push('/login')}>
          <Text style={{ fontSize: 12.5, color: '#2ECC71', fontWeight: '700' }}>Ku noqo Login-ka</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}