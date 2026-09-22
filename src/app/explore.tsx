import { FlatList, Pressable, Text, View } from 'react-native';

const CATEGORIES = [
  { id: 'retail', name: 'Supermarket', emoji: '🛒' },
  { id: 'telecom', name: 'Credit-mobile', emoji: '📱' },
  { id: 'university', name: 'university', emoji: '🎓' },
  { id: 'mechanic', name: 'Mechanic', emoji: '🔧' },
  { id: 'solar', name: 'Solar', emoji: '☀️' },
];

export default function CategoriesScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5', paddingTop: 60 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#0F4C33',
          textAlign: 'center',
          marginBottom: 20,
        }}
      >
        Categories
      </Text>

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <Pressable
            style={{
              backgroundColor: 'white',
              borderRadius: 12,
              padding: 16,
              marginBottom: 12,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text style={{ fontSize: 28, marginRight: 12 }}>{item.emoji}</Text>
            <Text style={{ fontSize: 18, fontWeight: '600', color: '#222' }}>
              {item.name}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}