import { Stack, useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    Text,
    View,
} from "react-native";

import { getJson } from "@/constants/api";
import { useAuth } from "@/context/AuthContext";
import { useAppTheme } from "@/context/ThemeContext";

type Company = {
  _id: string;
  name: string;
  companyType: string;
  city?: string;
};

export default function MyCompaniesScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const { token } = useAuth();

  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await getJson<Company[]>("/companies/mine", token);
    if (res.ok) {
      setCompanies(Array.isArray(res.data) ? res.data : []);
    } else {
      setError(res.error);
    }
    setLoading(false);
  }, [token]);

  // Mar kasta oo shaashaddan la soo galo, dib u akhri
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  return (
    <View
      style={{ flex: 1, backgroundColor: colors.background, paddingTop: 16 }}
    >
      <Stack.Screen options={{ title: "Shirkadahayga" }} />

      <Pressable
        onPress={() => router.push("/create-company")}
        style={{
          backgroundColor: colors.primary,
          borderRadius: 12,
          paddingVertical: 12,
          alignItems: "center",
          marginHorizontal: 16,
          marginBottom: 16,
        }}
      >
        <Text style={{ color: "white", fontWeight: "700", fontSize: 15 }}>
          + Shirkad cusub
        </Text>
      </Pressable>

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
            onPress={load}
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
      ) : companies.length === 0 ? (
        <Text
          style={{ fontSize: 16, color: colors.subtext, paddingHorizontal: 16 }}
        >
          Weli shirkad ma lihid. Riix "+ Shirkad cusub".
        </Text>
      ) : (
        <FlatList
          data={companies}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/manage-products",
                  params: { companyId: item._id, name: item.name },
                })
              }
              style={{
                backgroundColor: colors.card,
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
              }}
            >
              <Text
                style={{ fontSize: 18, fontWeight: "600", color: colors.text }}
              >
                {item.name}
              </Text>
              <Text
                style={{ fontSize: 14, color: colors.subtext, marginTop: 2 }}
              >
                {item.companyType} · {item.city}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: colors.accent,
                  marginTop: 8,
                  fontWeight: "700",
                }}
              >
                Maamul alaabta ›
              </Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}
