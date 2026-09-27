import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { FlatList, Pressable, Text, View } from 'react-native';

const PRODUCTS: Record<string, { id: string; name: string; description: string; price: number }[]> = {
  '6ab0ca39fc3ba127b7ac2e16': [
    { id: 'p1', name: 'Halwo (500g)', description: 'Halwo dabacsan oo dhadhan macaan leh', price: 5 },
    { id: 'p2', name: 'Halwo (1kg)', description: 'Halwo dabacsan oo dhadhan macaan leh', price: 9 },
    { id: 'p3', name: 'Sonkor (1kg)', description: 'Sonkor cad oo saafi ah', price: 2 },
  ],
};

export default function ProductListScreen() {
  const { companyId } = useLocalSearchParams<{ companyId: string }>();
  const router = useRouter();
  const products = PRODUCTS[companyId] || [];

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F8FA', paddingTop: 60 }}>
      <Stack.Screen options={{ title: 'Alaabta' }} />

      <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#0F4C33', marginBottom: 16, paddingHorizontal: 16 }}>
        Alaabta
      </Text>

      {products.length === 0 ? (
        <Text style={{ fontSize: 16, color: '#666', paddingHorizontal: 16 }}>
          Weli alaab lagama darin shirkadan.
        </Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 14,
                padding: 16,
                marginBottom: 12,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOpacity: 0.05,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              <View style={{ flex: 1, marginRight: 12 }}>
                <Text style={{ fontSize: 16, fontWeight: '700' }}>{item.name}</Text>
                <Text style={{ fontSize: 13, color: '#666', marginTop: 2 }}>{item.description}</Text>
                <Text style={{ fontSize: 15, fontWeight: '700', color: '#0F4C33', marginTop: 6 }}>${item.price}</Text>
              </View>
              <Pressable
                style={{
                  backgroundColor: '#0F4C33',
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: 'white', fontWeight: '600', fontSize: 13 }}>Ku dar</Text>
              </Pressable>
            </View>
          )}
        />
      )}
    </View>
  );
}