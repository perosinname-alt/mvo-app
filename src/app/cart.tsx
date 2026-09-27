import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { useCart } from '@/context/CartContext';

export default function CartScreen() {
  const router = useRouter();
  const { items, increaseQuantity, decreaseQuantity, removeFromCart, totalPrice } = useCart();

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F8FA', paddingTop: 60 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#0F4C33', marginBottom: 16, paddingHorizontal: 16 }}>
        Cart-kaaga
      </Text>

      {items.length === 0 ? (
        <Text style={{ fontSize: 16, color: '#666', paddingHorizontal: 16 }}>
          Cart-ku waa faaruq. Ku noqo dukaanka oo alaab ku dar.
        </Text>
      ) : (
        <>
          <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}>
            {items.map((item) => (
              <View
                key={item.id}
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
                  <Text style={{ fontSize: 14, color: '#0F4C33', fontWeight: '600', marginTop: 4 }}>
                    ${item.price} x {item.quantity} = ${item.price * item.quantity}
                  </Text>
                  <Pressable onPress={() => removeFromCart(item.id)} style={{ marginTop: 6 }}>
                    <Text style={{ fontSize: 12, color: '#C0392B' }}>Ka saar</Text>
                  </Pressable>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Pressable
                    onPress={() => decreaseQuantity(item.id)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      backgroundColor: '#F0F7F3',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: '700', color: '#0F4C33' }}>−</Text>
                  </Pressable>
                  <Text style={{ fontSize: 16, fontWeight: '700', marginHorizontal: 12 }}>{item.quantity}</Text>
                  <Pressable
                    onPress={() => increaseQuantity(item.id)}
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      backgroundColor: '#F0F7F3',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ fontSize: 18, fontWeight: '700', color: '#0F4C33' }}>+</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </ScrollView>

          <View
            style={{
              padding: 16,
              borderTopWidth: 1,
              borderTopColor: '#E5E5E5',
              backgroundColor: 'white',
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: '600' }}>Wadarta guud</Text>
              <Text style={{ fontSize: 18, fontWeight: '800', color: '#0F4C33' }}>${totalPrice}</Text>
            </View>
            <Pressable
              onPress={() => router.push('/checkout')}
              style={{
                backgroundColor: '#0F4C33',
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