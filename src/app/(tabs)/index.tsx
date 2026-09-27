import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

const QUICK_CATEGORIES = [
  { id: 'retail', name: 'Supermarket', emoji: '🛒' },
  { id: 'telecom', name: 'Electronics', emoji: '📱' },
  { id: 'restruent', name: 'Restaurant', emoji: '🍝' },
  { id: 'mechanic', name: 'Oil change', emoji: '🔧' },
];

const NEARBY = [
  { id: '6ab0ca39fc3ba127b7ac2e16', name: 'Xalwo Kismaayo', city: 'Bosaso', type: 'retail', distance: '1.2 km' },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F7F8FA' }} contentContainerStyle={{ paddingTop: 60, paddingBottom: 24 }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('@/assets/images/mvo-logo.png')}
            style={{ width: 44, height: 44, marginRight: 12, borderRadius: 12 }}
            contentFit="contain"
          />
          <View>
            <Text style={{ fontSize: 13, color: '#888' }}>Ku soo dhawoow</Text>
            <Text style={{ fontSize: 20, fontWeight: '800', color: '#0F4C33' }}>MVO</Text>
          </View>
        </View>
        <Pressable
          onPress={() => router.push('/login')}
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Text style={{ fontSize: 18 }}>👤</Text>
        </Pressable>
      </View>

      {/* TEMP: PIN login preview button — remove after testing */}
      <View style={{ paddingHorizontal: 20, marginBottom: 16 }}>
        <Pressable
          onPress={() => router.push('/pin-login')}
          style={{
            backgroundColor: '#FDECEA',
            borderRadius: 10,
            paddingVertical: 10,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 12, color: '#C0392B', fontWeight: '700' }}>
            🧪 TEST: View PIN Login Screen
          </Text>
        </Pressable>
      </View>

      {/* Search Bar */}
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 14,
            paddingHorizontal: 16,
            paddingVertical: 14,
            flexDirection: 'row',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 2 },
            elevation: 2,
          }}
        >
          <Text style={{ fontSize: 16, marginRight: 8 }}>🔍</Text>
          <TextInput
            placeholder="Search"
            placeholderTextColor="#999"
            style={{ fontSize: 15, flex: 1 }}
          />
        </View>
      </View>

      {/* Promo Banner */}
      <View style={{ paddingHorizontal: 20, marginBottom: 28 }}>
        <View
          style={{
            backgroundColor: '#0F4C33',
            borderRadius: 18,
            padding: 22,
            overflow: 'hidden',
          }}
        >
          <Text style={{ color: 'white', fontSize: 19, fontWeight: '800', marginBottom: 6 }}>
            WELCOME TO MVO COMPANY 📦
          </Text>
          <Text style={{ color: '#BFE3D2', fontSize: 13.5, lineHeight: 19 }}>
            MULTI VENDOR ORDER MANY COMPANIES IN THE WORLD 
          </Text>
        </View>
      </View>

      {/* Quick Categories */}
      <View style={{ marginBottom: 28 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 12 }}>
          <Text style={{ fontSize: 17, fontWeight: '700', color: '#1A1A1A' }}>
            Recent used
          </Text>
          <Pressable onPress={() => router.push('/explore')}>
            <Text style={{ fontSize: 13, color: '#0F4C33', fontWeight: '600' }}>All →</Text>
          </Pressable>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}>
          {QUICK_CATEGORIES.map((cat) => (
            <Pressable
              key={cat.id}
              onPress={() => router.push({ pathname: '/company/[type]', params: { type: cat.id } })}
              style={{
                backgroundColor: 'white',
                borderRadius: 16,
                padding: 16,
                alignItems: 'center',
                width: 88,
                shadowColor: '#000',
                shadowOpacity: 0.05,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 2 },
                elevation: 2,
              }}
            >
              <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#F0F7F3', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                <Text style={{ fontSize: 22 }}>{cat.emoji}</Text>
              </View>
              <Text style={{ fontSize: 11.5, fontWeight: '600', textAlign: 'center', color: '#333' }}>{cat.name}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Nearby Companies */}
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <Text style={{ fontSize: 17, fontWeight: '700', color: '#1A1A1A', marginBottom: 12 }}>
          Nearby Companies
        </Text>
        {NEARBY.map((company) => (
          <Pressable
            key={company.id}
            onPress={() => router.push({ pathname: '/company/[type]', params: { type: company.type } })}
            style={{
              backgroundColor: 'white',
              borderRadius: 16,
              padding: 16,
              marginBottom: 12,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOpacity: 0.05,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 2 },
              elevation: 2,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 46, height: 46, borderRadius: 12, backgroundColor: '#F0F7F3', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                <Text style={{ fontSize: 20 }}>🛒</Text>
              </View>
              <View>
                <Text style={{ fontSize: 15.5, fontWeight: '700', color: '#1A1A1A' }}>{company.name}</Text>
                <Text style={{ fontSize: 12.5, color: '#888', marginTop: 2 }}>📍 {company.city} · {company.distance}</Text>
              </View>
            </View>
            <Text style={{ fontSize: 18, color: '#0F4C33' }}>→</Text>
          </Pressable>
        ))}
      </View>

      {/* Footer branding */}
      <View style={{ alignItems: 'center', marginTop: 12 }}>
        <Text style={{ fontSize: 12, color: '#AAA' }}>Powered by Mohamed Nour</Text>
      </View>
    </ScrollView>
  );
}