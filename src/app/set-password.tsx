import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

function getStrength(password: string): { label: string; color: string; width: string } {
  if (password.length === 0) return { label: '', color: '#232A27', width: '0%' };
  if (password.length < 6) return { label: 'Daciif', color: '#E74C3C', width: '33%' };
  if (password.length < 10) return { label: 'Dhexdhexaad', color: '#F39C12', width: '66%' };
  return { label: 'Xoog badan', color: '#2ECC71', width: '100%' };
}

export default function SetPasswordScreen() {
  const router = useRouter();
  const { email, mode } = useLocalSearchParams<{ email: string; mode: string }>();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const strength = getStrength(password);

  function handleSubmit() {
    if (password.length < 6) {
      Alert.alert('Password aad u gaaban', 'Fadlan dooro password ugu yaraan 6 xaraf ah.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password iskuma mid ahayn', 'Labada password ee aad gelisay iskuma mid ahayn.');
      return;
    }
    router.push({ pathname: '/success', params: { mode } });
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#0B0F0D' }}
      contentContainerStyle={{ flexGrow: 1, paddingTop: 90, paddingHorizontal: 24, paddingBottom: 40 }}
    >
      <Text style={{ fontSize: 24, fontWeight: '800', color: 'white', marginBottom: 8 }}>
        Samee Password Cusub
      </Text>
      <Text style={{ fontSize: 13.5, color: '#9CA3AF', marginBottom: 30, lineHeight: 19 }}>
        Dooro password xoog leh oo aad xasuusan karto.
      </Text>

      {/* New password */}
      <Text style={{ fontSize: 13, color: '#D1D5DB', marginBottom: 8 }}>Password Cusub</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#151B18',
          borderRadius: 14,
          paddingHorizontal: 16,
          marginBottom: 10,
        }}
      >
        <TextInput
          placeholder="Furaha sirta cusub"
          placeholderTextColor="#6B7280"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={{ flex: 1, paddingVertical: 15, fontSize: 14, color: 'white' }}
        />
        <Pressable onPress={() => setShowPassword(!showPassword)}>
          <Text style={{ fontSize: 12, color: '#9CA3AF' }}>{showPassword ? 'Qari' : 'Tus'}</Text>
        </Pressable>
      </View>

      {/* Strength meter */}
      {password.length > 0 && (
        <View style={{ marginBottom: 20 }}>
          <View style={{ height: 5, backgroundColor: '#232A27', borderRadius: 3, overflow: 'hidden', marginBottom: 6 }}>
            <View style={{ height: '100%', width: strength.width as any, backgroundColor: strength.color, borderRadius: 3 }} />
          </View>
          <Text style={{ fontSize: 11.5, color: strength.color, fontWeight: '600' }}>{strength.label}</Text>
        </View>
      )}

      {/* Confirm password */}
      <Text style={{ fontSize: 13, color: '#D1D5DB', marginBottom: 8 }}>Xaqiiji Password-ka</Text>
      <TextInput
        placeholder="Mar kale geli password-ka"
        placeholderTextColor="#6B7280"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
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

      {/* Submit */}
      <Pressable
        onPress={handleSubmit}
        style={{
          backgroundColor: '#0F4C33',
          borderRadius: 16,
          paddingVertical: 16,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 15, fontWeight: '700' }}>Kaydi Password-ka</Text>
      </Pressable>
    </ScrollView>
  );
}