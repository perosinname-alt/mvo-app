import { Image } from 'expo-image';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        source={require('@/assets/images/mvo-logo.png')}
        style={{ width: 120, height: 120, marginBottom: 16 }}
        contentFit="contain"
      />
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#0F4C33' }}>
        
      </Text>
      <Text style={{ fontSize: 18 }}>
        
      </Text>
    </View>
  );
}