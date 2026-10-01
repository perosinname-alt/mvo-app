import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { FlatList, Pressable, Text, View } from 'react-native';

import { useCart } from '@/context/CartContext';
import { useAppTheme } from '@/context/ThemeContext';

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
  const { colors } = useAppTheme();
  const { addToCart, totalItems } = useCart();
  const products = PRODUCTS[companyId] || [];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, paddingTop: 60 }}>
      <Stack.Screen options={{ title: 'Alaabta' }} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 16 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: colors.accent }}>
          Alaabta
        </Text>
        {totalItems > 0 && (
          <Pressable
            onPress={() => router.push('/cart')}
            style={{
              backgroundColor: colors.primary,
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: 'white', fontWeight: '700', fontSize: 13 }}>
              🛒 {totalItems}
            </Text>
          </Pressable>
        )}
      </View>

      {products.length === 0 ? (
        <Text style={{ fontSize: 16, color: colors.subtext, paddingHorizontal: 16 }}>
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
                backgroundColor: colors.card,
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
                <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text }}>{item.name}</Text>
                <Text style={{ fontSize: 13, color: colors.subtext, marginTop: 2 }}>{item.description}</Text>
                <Text style={{ fontSize: 15, fontWeight: '700', color: colors.accent, marginTop: 6 }}>${item.price}</Text>
              </View>
              <Pressable
                onPress={() => addToCart({ id: item.id, name: item.name, price: item.price })}
                style={{
                  backgroundColor: colors.primary,
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