import { useLocalSearchParams, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function SuccessScreen() {
  const router = useRouter();
  const { mode } = useLocalSearchParams<{ mode: string }>();

  const isRegister = mode === 'register';

  function handleContinue() {
    router.replace('/login');
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#0B0F0D', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 }}>
      {/* Success circle */}
      <View
        style={{
          width: 110,
          height: 110,
          borderRadius: 55,
          backgroundColor: '#0F4C33',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 32,
        }}
      >
        <Text style={{ fontSize: 50, color: 'white' }}>✓</Text>
      </View>

      <Text style={{ fontSize: 24, fontWeight: '800', color: 'white', textAlign: 'center', marginBottom: 12 }}>
        {isRegister ? 'Akoonkaaga waa la sameeyay!' : 'Password-ka waa la beddelay!'}
      </Text>
      <Text style={{ fontSize: 14, color: '#9CA3AF', textAlign: 'center', lineHeight: 20, marginBottom: 40 }}>
        {isRegister
          ? 'Hadda waad geli kartaa MVO oo isticmaal kartaa dalabkaaga.'
          : 'Hadda waxaad ku gali kartaa password-kaaga cusub.'}
      </Text>

      <Pressable
        onPress={handleContinue}
        style={{
          backgroundColor: '#0F4C33',
          borderRadius: 16,
          paddingVertical: 16,
          paddingHorizontal: 40,
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Text style={{ color: 'white', fontSize: 15, fontWeight: '700' }}>Ku noqo Login-ka</Text>
      </Pressable>
    </View>
  );
}