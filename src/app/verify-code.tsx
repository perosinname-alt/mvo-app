import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

export default function VerifyCodeScreen() {
  const router = useRouter();
  const { email, mode } = useLocalSearchParams<{ email: string; mode: string }>();
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = [useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null)];

  function handleChange(text: string, index: number) {
    const newCode = [...code];
    newCode[index] = text.slice(-1);
    setCode(newCode);

    if (text && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  }

  function handleKeyPress(e: any, index: number) {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  }

  function handleVerify() {
    router.push({ pathname: '/set-password', params: { email, mode } });
  }

  function handleResend() {
    // Marxaladan waa UI kaliya — xiriirka backend-ka dhabta ah waa la sameyn doonaa mar dambe
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#0B0F0D' }}
      contentContainerStyle={{ flexGrow: 1, paddingTop: 90, paddingHorizontal: 24, paddingBottom: 40 }}
    >
      <View style={{ alignItems: 'center', marginBottom: 24 }}>
        <View
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            backgroundColor: '#151B18',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 28 }}>📩</Text>
        </View>
        <Text style={{ fontSize: 24, fontWeight: '800', color: 'white', marginBottom: 8, textAlign: 'center' }}>
          Hubi Email-kaaga
        </Text>
        <Text style={{ fontSize: 13.5, color: '#9CA3AF', textAlign: 'center', lineHeight: 19, paddingHorizontal: 10 }}>
          Waxaan u dirnay code 4-lambar ah{'\n'}
          <Text style={{ color: 'white', fontWeight: '600' }}>{email || 'email-kaaga'}</Text>
        </Text>
      </View>

      {/* OTP boxes */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 12, marginBottom: 30 }}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={inputRefs[index]}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            style={{
              width: 56,
              height: 60,
              borderRadius: 14,
              backgroundColor: '#151B18',
              borderWidth: 1.5,
              borderColor: digit ? '#0F4C33' : '#232A27',
              color: 'white',
              fontSize: 24,
              fontWeight: '700',
              textAlign: 'center',
            }}
          />
        ))}
      </View>

      {/* Verify button */}
      <Pressable
        onPress={handleVerify}
        style={{
          backgroundColor: '#0F4C33',
          borderRadius: 16,
          paddingVertical: 16,
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <Text style={{ color: 'white', fontSize: 15, fontWeight: '700' }}>Xaqiiji</Text>
      </Pressable>

      {/* Resend */}
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={{ fontSize: 12.5, color: '#6B7280' }}>Code-ka ma heshay? </Text>
        <Pressable onPress={handleResend}>
          <Text style={{ fontSize: 12.5, color: '#2ECC71', fontWeight: '700' }}>Dib u dir</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}