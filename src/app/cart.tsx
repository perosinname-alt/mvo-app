import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { useCart } from '@/context/CartContext';
import { useAppTheme } from '@/context/ThemeContext';

export default function CartScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const { items, increaseQuantity, decreaseQuantity, removeFromCart, totalPrice } = useCart();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, paddingTop: 60 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', color: colors.accent, marginBottom: 16, paddingHorizontal: 16 }}>
        Cart-kaaga
      </Text>

      {items.length === 0 ? (
        <Text style={{ fontSize: 16, color: colors.subtext, paddingHorizontal: 16 }}>
          Cart-ku waa faaruq. Ku noqo dukaanka oo alaab ku dar.
        </Text>
      ) : (
        <>
          <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}>
            {items.map((item) => (
              <View
                key={item.id}
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
                  <Text style={{ fontSize: 14, color: colors.accent, fontWeight: '600', marginTop: 4 }}>
                    ${item.price} x {item.quantity} = ${item.price * item.quantity}
                  </Text>
                  <Pressable onPress={() => removeFromCart(item.id)} style={{ marginTop: 6 }}>
                    <Text style={{ fontSize: 12, color: '#E74C3C' }}>Ka saar</Text>
                  </Pressable>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Pressable
                    onPress={() => decreaseQuantity(item.id)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      backgroundColor: colors.primarySoft,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: '700', color: colors.accent }}>−</Text>
                  </Pressable>
                  <Text style={{ fontSize: 16, fontWeight: '700', marginHorizontal: 12, color: colors.text }}>{item.quantity}</Text>
                  <Pressable
                    onPress={() => increaseQuantity(item.id)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      backgroundColor: colors.primarySoft,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: '700', color: colors.accent }}>+</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </ScrollView>

          <View
            style={{
              padding: 16,
              borderTopWidth: 1,
              borderTopColor: colors.border,
              backgroundColor: colors.card,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text }}>Wadarta guud</Text>
              <Text style={{ fontSize: 18, fontWeight: '800', color: colors.accent }}>${totalPrice}</Text>
            </View>
            <Pressable
              onPress={() => router.push('/checkout')}
              style={{
                backgroundColor: colors.primary,
                paddingVertical: 14,
                borderRadius: 12,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: 'white', fontWeight: '700', fontSize: 15 }}>Checkout</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}