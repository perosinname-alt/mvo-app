import {
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

import { getJson } from "@/constants/api";
import { useCart } from "@/context/CartContext";
import { useAppTheme } from "@/context/ThemeContext";

type Product = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  available?: boolean;
};

export default function ProductListScreen() {
  const { companyId } = useLocalSearchParams<{ companyId: string }>();
  const router = useRouter();
  const { colors } = useAppTheme();
  const { addToCart, startNewCart, totalItems } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasLoaded = useRef(false);

  const loadProducts = useCallback(async () => {
    if (!hasLoaded.current) setLoading(true);
    setError(null);
    const res = await getJson<Product[]>(`/products/company/${companyId}`);
    if (res.ok) {
      const list = Array.isArray(res.data) ? res.data : [];
      setProducts(list.filter((p) => p.available !== false));
      hasLoaded.current = true;
    } else {
      setError(res.error);
    }
    setLoading(false);
  }, [companyId]);

  // Mar kasta oo shaashaddan la soo galo, dib u akhri
  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [loadProducts]),
  );

  function handleAdd(item: Product) {
    const product = {
      id: item._id,
      name: item.name,
      price: item.price,
      companyId: String(companyId),
    };
    const added = addToCart(product);
    if (!added) {
      Alert.alert(
        "Cart-kaaga wuxuu leeyahay alaab shirkad kale",
        "Dalab kasta waa shirkad keliya. Ma rabtaa inaad cart-ka tirtirto oo aad ku bilowdo alaabtan?",
        [
          { text: "Maya", style: "cancel" },
          {
            text: "Haa, bilow cusub",
            style: "destructive",
            onPress: () => startNewCart(product),
          },
        ],
      );
    }
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: colors.background, paddingTop: 60 }}
    >
      <Stack.Screen options={{ title: "Alaabta" }} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 16,
          marginBottom: 16,
        }}
      >
        <Text
          style={{ fontSize: 22, fontWeight: "bold", color: colors.accent }}
        >
          Alaabta
        </Text>
        {totalItems > 0 && (
          <Pressable
            onPress={() => router.push("/cart")}
            style={{
              backgroundColor: colors.primary,
              paddingHorizontal: 14,
              paddingVertical: 8,
              borderRadius: 20,
            }}
          >
            <Text style={{ color: "white", fontWeight: "700", fontSize: 13 }}>
              🛒 {totalItems}
            </Text>
          </Pressable>
        )}
      </View>

      {loading ? (
        <View style={{ marginTop: 40, alignItems: "center" }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : error ? (
        <View style={{ paddingHorizontal: 16, alignItems: "flex-start" }}>
          <Text style={{ fontSize: 16, color: "#D32F2F", marginBottom: 12 }}>
            {error}
          </Text>
          <Pressable
            onPress={loadProducts}
            style={{
              backgroundColor: colors.primary,
              paddingHorizontal: 18,
              paddingVertical: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>
              Isku day mar kale
            </Text>
          </Pressable>
        </View>
      ) : products.length === 0 ? (
        <Text
          style={{ fontSize: 16, color: colors.subtext, paddingHorizontal: 16 }}
        >
          Weli alaab lagama darin shirkadan.
        </Text>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: colors.card,
                borderRadius: 14,
                padding: 16,
                marginBottom: 12,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              <View style={{ flex: 1, marginRight: 12 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: colors.text,
                  }}
                >
                  {item.name}
                </Text>
                {!!item.description && (
                  <Text
                    style={{
                      fontSize: 13,
                      color: colors.subtext,
                      marginTop: 2,
                    }}
                  >
                    {item.description}
                  </Text>
                )}
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "700",
                    color: colors.accent,
                    marginTop: 6,
                  }}
                >
                  ${item.price}
                </Text>
              </View>
              <Pressable
                onPress={() => handleAdd(item)}
                style={{
                  backgroundColor: colors.primary,
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "600", fontSize: 13 }}
                >
                  Ku dar
                </Text>
              </Pressable>
            </View>
          )}
        />
      )}
    </View>
  );
}
