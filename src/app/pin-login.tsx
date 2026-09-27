import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';

const CUSTOMER_NAME = 'Customer';

export default function PinLoginScreen() {
  const router = useRouter();
  const [pin, setPin] = useState('');

  function handleKeyPress(digit: string) {
    if (pin.length < 4) {
      setPin(pin + digit);
    }
  }

  function handleBackspace() {
    setPin(pin.slice(0, -1));
  }

  function handleBiometricPress() {
    Alert.alert('Weli lama diyaarin', 'Biometric login wuu iman doonaa mar dambe.');
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Green banner */}
      <View
        style={{
          backgroundColor: '#0F4C33',
          paddingTop: 70,
          paddingBottom: 60,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 24, fontWeight: '800', marginBottom: 4 }}>MVO</Text>
        <Text style={{ color: '#BFE3D2', fontSize: 13 }}>Multi Vendor Order</Text>
      </View>

      {/* Avatar overlapping the banner */}
      <View style={{ alignItems: 'center', marginTop: -50 }}>
        <View
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: '#F0F7F3',
            borderWidth: 3,
            borderColor: '#0F4C33',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 40 }}>👤</Text>
        </View>
      </View>

      <Text style={{ fontSize: 18, fontWeight: '700', color: '#111827', textAlign: 'center', marginTop: 16 }}>
        Ku soo dhawoow, {CUSTOMER_NAME}
      </Text>

      {/* PIN dots */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16, marginTop: 30, marginBottom: 30 }}>
        {[0, 1, 2, 3].map((i) => (
          <View
            key={i}
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              borderWidth: 1.5,
              borderColor: '#0F4C33',
              backgroundColor: pin.length > i ? '#0F4C33' : 'white',
            }}
          />
        ))}
      </View>

      {/* Number pad */}
      <View style={{ paddingHorizontal: 40 }}>
        {[['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['', '0', '⌫']].map((row, rowIndex) => (
          <View key={rowIndex} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
            {row.map((key, colIndex) => (
              <Pressable
                key={colIndex}
                onPress={() => {
                  if (key === '⌫') handleBackspace();
                  else if (key !== '') handleKeyPress(key);
                }}
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: key ? '#F7F8FA' : 'transparent',
                }}
              >
                <Text style={{ fontSize: 22, fontWeight: '600', color: '#111827' }}>{key}</Text>
              </Pressable>
            ))}
          </View>
        ))}
      </View>

      {/* Links */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 40, marginTop: 10 }}>
        <Pressable onPress={() => router.push('/login')}>
          <Text style={{ fontSize: 13, color: '#0F4C33', fontWeight: '600' }}>User ID Login</Text>
        </Pressable>
        <Pressable>
          <Text style={{ fontSize: 13, color: '#0F4C33', fontWeight: '600' }}>Forgot Credentials?</Text>
        </Pressable>
      </View>

      {/* Biometric button */}
      <View style={{ paddingHorizontal: 24, marginTop: 24 }}>
        <Pressable
          onPress={handleBiometricPress}
          style={{
            backgroundColor: '#0F4C33',
            borderRadius: 16,
            paddingVertical: 16,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          <Text style={{ fontSize: 20 }}>🔒</Text>
          <Text style={{ color: 'white', fontSize: 15, fontWeight: '700' }}>Login with Biometrics</Text>
        </Pressable>
      </View>
    </View>
  );
}