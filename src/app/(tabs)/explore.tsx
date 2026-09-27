import { useRouter } from 'expo-router';
import { FlatList, Pressable, Text, View } from 'react-native';

const CATEGORIES = [
  { id: 'retail', name: 'Supermarket', emoji: '🛒', color: '#E8F4EA' },
  { id: 'Electronics', name: 'Electronics', emoji: '📱', color: '#E8EEF9' },
  { id: 'university', name: 'University', emoji: '🎓', color: '#F3E9F9' },
  { id: 'mechanic', name: 'Oil change', emoji: '🔧', color: '#FDF0E3' },
  { id: 'solar', name: 'Solar system', emoji: '☀️', color: '#FEF6E0' },
  { id: 'restruent', name: 'Restaurant', emoji: '🍝', color: '#FBE9E7' },
  { id: 'Constructions', name: 'Constructions', emoji: '🏗️', color: '#EAF1F8' },
  { id: 'others', name: 'Others', emoji: '📦', color: '#F0F0F0' },
];

export default function CategoriesScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F8FA', paddingTop: 60 }}>
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: '800', color: '#0F4C33' }}>
          Categories
        </Text>
        <Text style={{ fontSize: 14, color: '#888', marginTop: 4 }}>
          Choose Any  Department 
        </Text>
      </View>

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        columnWrapperStyle={{ gap: 14 }}
        ItemSeparatorComponent={() => <View style={{ height: 14 }} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push({ pathname: '/company/[type]', params: { type: item.id } })}
            style={{
              flex: 1,
              backgroundColor: 'white',
              borderRadius: 18,
              padding: 18,
              alignItems: 'flex-start',
              shadowColor: '#000',
              shadowOpacity: 0.05,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 2 },
              elevation: 2,
            }}
          >
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                backgroundColor: item.color,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12,
              }}
            >
              <Text style={{ fontSize: 26 }}>{item.emoji}</Text>
            </View>
            <Text style={{ fontSize: 15, fontWeight: '700', color: '#1A1A1A' }}>
              {item.name}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}