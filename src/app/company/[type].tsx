import {
  Stack,
  useFocusEffect,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";

import { getJson } from "@/constants/api";
import { useAppTheme } from "@/context/ThemeContext";

type Company = {
  _id: string;
  name: string;
  companyType: string;
  city?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
};

export default function CompanyListScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();
  const router = useRouter();
  const { colors } = useAppTheme();
  const screenWidth = Dimensions.get("window").width;

  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasLoaded = useRef(false);

  const loadCompanies = useCallback(async () => {
    // Spinner-ka tus kaliya markii ugu horreysay
    if (!hasLoaded.current) setLoading(true);
    setError(null);
    const res = await getJson<Company[]>("/companies");
    if (res.ok) {
      const all = Array.isArray(res.data) ? res.data : [];
      setCompanies(all.filter((c) => c.companyType === type));
      hasLoaded.current = true;
    } else {
      setError(res.error);
    }
    setLoading(false);
  }, [type]);

  // Mar kasta oo shaashaddan la soo galo (ama laga soo laabto), dib u akhri
  useFocusEffect(
    useCallback(() => {
      loadCompanies();
    }, [loadCompanies]),
  );

  // Kaliya companies-ka leh lat/long ayaa map-ka ku muuqda
  const mapCompanies = companies.filter(
    (c) => typeof c.latitude === "number" && typeof c.longitude === "number",
  );

  const addCompanyButton = (
    <Pressable
      onPress={() =>
        router.push({ pathname: "/create-company", params: { type } })
      }
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
        + Ganacsigaaga ku dar
      </Text>
    </Pressable>
  );

  return (
    <View
      style={{ flex: 1, backgroundColor: colors.background, paddingTop: 60 }}
    >
      <Stack.Screen options={{ title: type }} />

      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          color: colors.accent,
          marginBottom: 12,
          paddingHorizontal: 16,
        }}
      >
        {type}
      </Text>

      {!loading && addCompanyButton}

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
            onPress={loadCompanies}
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
          Weli companies lagama darin qaybtan.
        </Text>
      ) : (
        <>
          {mapCompanies.length > 0 && (
            <MapView
              style={{ width: screenWidth, height: 220, marginBottom: 16 }}
              initialRegion={{
                latitude: mapCompanies[0].latitude as number,
                longitude: mapCompanies[0].longitude as number,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}
            >
              {mapCompanies.map((company) => (
                <Marker
                  key={company._id}
                  coordinate={{
                    latitude: company.latitude as number,
                    longitude: company.longitude as number,
                  }}
                  title={company.name}
                  description={company.city}
                />
              ))}
            </MapView>
          )}

          <FlatList
            data={companies}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() =>
                  router.push({
                    pathname: "/company/products/[companyId]",
                    params: { companyId: item._id },
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
                  style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: colors.text,
                  }}
                >
                  {item.name}
                </Text>
                <Text style={{ fontSize: 14, color: colors.subtext }}>
                  {item.city}
                </Text>
              </Pressable>
            )}
          />
        </>
      )}
    </View>
  );
}
