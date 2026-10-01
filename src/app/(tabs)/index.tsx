import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { useAppTheme } from "@/context/ThemeContext";

const QUICK_CATEGORIES = [
  { id: "retail", name: "Supermarket", emoji: "🛒" },
  { id: "telecom", name: "Electronics", emoji: "📱" },
  { id: "restruent", name: "Restaurant", emoji: "🍝" },
  { id: "mechanic", name: "Oil change", emoji: "🔧" },
];

const CITIES = ["All", "Bosaso", "Garowe", "Muqdisho"];

const NEARBY = [
  {
    id: "6ab0ca39fc3ba127b7ac2e16",
    name: "Xalwo Kismaayo",
    city: "Bosaso",
    type: "retail",
    distance: "1.2 km",
    rating: 4.8,
    reviews: 120,
  },
  {
    id: "test-garowe-1",
    name: "Garowe Market (test)",
    city: "Garowe",
    type: "retail",
    distance: "3.4 km",
    rating: 4.2,
    reviews: 48,
  },
  {
    id: "test-muqdisho-1",
    name: "Muqdisho Mart (test)",
    city: "Muqdisho",
    type: "retail",
    distance: "5.0 km",
    rating: 4.5,
    reviews: 76,
  },
];

const PROMOS = [
  {
    id: "1",
    title: "WELCOME TO MVO COMPANY 📦",
    subtitle: "MULTI VENDOR ORDER MANY COMPANIES IN THE WORLD",
    color: "#0F4C33",
  },
  {
    id: "2",
    title: "DALABKA UGU DEGDEGGA AH 🚀",
    subtitle: "HELI ALAABTAADA SAACADAHA UGU DHAKHSAHA BADAN",
    color: "#1E5A45",
  },
  {
    id: "3",
    title: "CUSBOONEYSI SHIRKADDO CUSUB 🏪",
    subtitle: "SHIRKADO CUSUB AYAA ISKU DAY MAALIN KASTA",
    color: "#0B3D28",
  },
];

const NOTIFICATIONS = [
  "📦 Dalabkaagii waa la diyaariyay",
  "🎉 Shirkad cusub ayaa ku soo biirtay MVO",
  "🚀 Dalab degdeg ah: gaarsiin bilaash ah maanta",
];

const SCREEN_WIDTH = Dimensions.get("window").width;
const BANNER_WIDTH = SCREEN_WIDTH - 40;
const GAP = 12;
const INTERVAL = BANNER_WIDTH + GAP;

function Stars({ rating }: { rating: number }) {
  const { colors } = useAppTheme();
  const full = Math.round(rating);
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Text
          key={n}
          style={{ fontSize: 13, color: n <= full ? "#F5A623" : colors.border }}
        >
          ★
        </Text>
      ))}
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCity, setSelectedCity] = useState("All");
  const [unreadCount, setUnreadCount] = useState(NOTIFICATIONS.length);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([
    "6ab0ca39fc3ba127b7ac2e16",
  ]);
  const indexRef = useRef(0);
  const carouselRef = useRef<FlatList>(null);

  const filteredCompanies =
    selectedCity === "All"
      ? NEARBY
      : NEARBY.filter((c) => c.city === selectedCity);

  const favoriteCompanies = NEARBY.filter((c) => favoriteIds.includes(c.id));

  const cardShadow = {
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  };

  function toggleFavorite(id: string) {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function handleBellPress() {
    Alert.alert("Ogeysiisyada", NOTIFICATIONS.join("\n\n"));
    setUnreadCount(0);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const next = (indexRef.current + 1) % PROMOS.length;
      indexRef.current = next;
      setActiveIndex(next);
      carouselRef.current?.scrollToOffset({
        offset: next * INTERVAL,
        animated: true,
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingTop: 60, paddingBottom: 24 }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          marginBottom: 20,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("@/assets/images/mvo-logo.png")}
            style={{ width: 44, height: 44, marginRight: 12, borderRadius: 12 }}
            contentFit="contain"
          />
          <View>
            <Text style={{ fontSize: 13, color: colors.subtext }}>
              Ku soo dhawoow
            </Text>
            <Text
              style={{ fontSize: 20, fontWeight: "800", color: colors.accent }}
            >
              MVO
            </Text>
          </View>
        </View>

        {/* Notifications bell */}
        <Pressable
          onPress={handleBellPress}
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            backgroundColor: colors.card,
            alignItems: "center",
            justifyContent: "center",
            ...cardShadow,
          }}
        >
          <Text style={{ fontSize: 18 }}>🔔</Text>
          {unreadCount > 0 && (
            <View
              style={{
                position: "absolute",
                top: -2,
                right: -2,
                minWidth: 18,
                height: 18,
                borderRadius: 9,
                backgroundColor: "#E74C3C",
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 4,
                borderWidth: 1.5,
                borderColor: colors.background,
              }}
            >
              <Text style={{ color: "white", fontSize: 10, fontWeight: "800" }}>
                {unreadCount}
              </Text>
            </View>
          )}
        </Pressable>
      </View>

      {/* Search Bar */}
      <View style={{ paddingHorizontal: 20, marginBottom: 14 }}>
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: 14,
            paddingHorizontal: 16,
            paddingVertical: 14,
            flexDirection: "row",
            alignItems: "center",
            ...cardShadow,
          }}
        >
          <Text style={{ fontSize: 16, marginRight: 8 }}>🔍</Text>
          <TextInput
            placeholder="Search"
            placeholderTextColor={colors.subtext}
            style={{ fontSize: 15, flex: 1, color: colors.text }}
          />
        </View>
      </View>

      {/* City filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
        style={{ marginBottom: 20 }}
      >
        {CITIES.map((city) => {
          const active = selectedCity === city;
          return (
            <Pressable
              key={city}
              onPress={() => setSelectedCity(city)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                paddingHorizontal: 16,
                paddingVertical: 9,
                borderRadius: 20,
                backgroundColor: active ? colors.primary : colors.card,
                borderWidth: 1,
                borderColor: active ? colors.primary : colors.border,
              }}
            >
              {city !== "All" && <Text style={{ fontSize: 12 }}>📍</Text>}
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "600",
                  color: active ? "white" : colors.text,
                }}
              >
                {city === "All" ? "Dhammaan" : city}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Promo Banner Carousel */}
      <View style={{ marginBottom: 16 }}>
        <FlatList
          ref={carouselRef}
          data={PROMOS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          snapToInterval={INTERVAL}
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: 20 }}
          ItemSeparatorComponent={() => <View style={{ width: GAP }} />}
          onMomentumScrollEnd={(e) => {
            const index = Math.round(e.nativeEvent.contentOffset.x / INTERVAL);
            indexRef.current = index;
            setActiveIndex(index);
          }}
          renderItem={({ item }) => (
            <View
              style={{
                width: BANNER_WIDTH,
                backgroundColor: item.color,
                borderRadius: 18,
                padding: 22,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 19,
                  fontWeight: "800",
                  marginBottom: 6,
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{ color: "#BFE3D2", fontSize: 13.5, lineHeight: 19 }}
              >
                {item.subtitle}
              </Text>
            </View>
          )}
        />
        {/* Dots */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 6,
            marginTop: 12,
          }}
        >
          {PROMOS.map((_, index) => (
            <View
              key={index}
              style={{
                width: activeIndex === index ? 18 : 6,
                height: 6,
                borderRadius: 3,
                backgroundColor:
                  activeIndex === index ? colors.accent : colors.border,
              }}
            />
          ))}
        </View>
      </View>

      {/* Quick Categories */}
      <View style={{ marginBottom: 28, marginTop: 8 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            marginBottom: 12,
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "700", color: colors.text }}>
            Recent used
          </Text>
          <Pressable onPress={() => router.push("/explore")}>
            <Text
              style={{ fontSize: 13, color: colors.accent, fontWeight: "600" }}
            >
              All →
            </Text>
          </Pressable>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
        >
          {QUICK_CATEGORIES.map((cat) => (
            <Pressable
              key={cat.id}
              onPress={() =>
                router.push({
                  pathname: "/company/[type]",
                  params: { type: cat.id },
                })
              }
              style={{
                backgroundColor: colors.card,
                borderRadius: 16,
                padding: 16,
                alignItems: "center",
                width: 88,
                ...cardShadow,
              }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: colors.primarySoft,
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 8,
                }}
              >
                <Text style={{ fontSize: 22 }}>{cat.emoji}</Text>
              </View>
              <Text
                style={{
                  fontSize: 11.5,
                  fontWeight: "600",
                  textAlign: "center",
                  color: colors.text,
                }}
              >
                {cat.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Favorite Companies */}
      <View style={{ marginBottom: 28 }}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "700",
            color: colors.text,
            paddingHorizontal: 20,
            marginBottom: 12,
          }}
        >
          Shirkadaha aan jeclahay ❤️
        </Text>

        {favoriteCompanies.length === 0 ? (
          <Text
            style={{
              fontSize: 13.5,
              color: colors.subtext,
              paddingHorizontal: 20,
            }}
          >
            Weli ma haysatid shirkado la jecel yahay. Taabo ♡ si aad ugu darto.
          </Text>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
          >
            {favoriteCompanies.map((company) => (
              <Pressable
                key={company.id}
                onPress={() =>
                  router.push({
                    pathname: "/company/[type]",
                    params: { type: company.type },
                  })
                }
                style={{
                  backgroundColor: colors.card,
                  borderRadius: 16,
                  padding: 14,
                  width: 150,
                  ...cardShadow,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 10,
                  }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      backgroundColor: colors.primarySoft,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontSize: 18 }}>🛒</Text>
                  </View>
                  <Pressable
                    onPress={() => toggleFavorite(company.id)}
                    hitSlop={8}
                  >
                    <Text style={{ fontSize: 18, color: "#E74C3C" }}>♥</Text>
                  </Pressable>
                </View>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 14,
                    fontWeight: "700",
                    color: colors.text,
                  }}
                >
                  {company.name}
                </Text>
                <Text
                  style={{
                    fontSize: 11.5,
                    color: colors.subtext,
                    marginTop: 2,
                  }}
                >
                  📍 {company.city}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4,
                    marginTop: 6,
                  }}
                >
                  <Text style={{ fontSize: 12, color: "#F5A623" }}>★</Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.subtext,
                      fontWeight: "600",
                    }}
                  >
                    {company.rating.toFixed(1)}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        )}
      </View>

      {/* Nearby Companies */}
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <Text
          style={{
            fontSize: 17,
            fontWeight: "700",
            color: colors.text,
            marginBottom: 12,
          }}
        >
          Nearby Companies
        </Text>

        {filteredCompanies.length === 0 && (
          <Text style={{ fontSize: 14, color: colors.subtext }}>
            Weli shirkado lagama helin magaaladan.
          </Text>
        )}

        {filteredCompanies.map((company) => {
          const isFavorite = favoriteIds.includes(company.id);
          return (
            <Pressable
              key={company.id}
              onPress={() =>
                router.push({
                  pathname: "/company/[type]",
                  params: { type: company.type },
                })
              }
              style={{
                backgroundColor: colors.card,
                borderRadius: 16,
                padding: 16,
                marginBottom: 12,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                ...cardShadow,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
              >
                <View
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 12,
                    backgroundColor: colors.primarySoft,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                  }}
                >
                  <Text style={{ fontSize: 20 }}>🛒</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 15.5,
                      fontWeight: "700",
                      color: colors.text,
                    }}
                  >
                    {company.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 12.5,
                      color: colors.subtext,
                      marginTop: 2,
                    }}
                  >
                    📍 {company.city} · {company.distance}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 4,
                      gap: 6,
                    }}
                  >
                    <Stars rating={company.rating} />
                    <Text
                      style={{
                        fontSize: 12,
                        color: colors.text,
                        fontWeight: "600",
                      }}
                    >
                      {company.rating.toFixed(1)}
                    </Text>
                    <Text style={{ fontSize: 12, color: colors.subtext }}>
                      ({company.reviews})
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              >
                <Pressable
                  onPress={() => toggleFavorite(company.id)}
                  hitSlop={8}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      color: isFavorite ? "#E74C3C" : colors.subtext,
                    }}
                  >
                    {isFavorite ? "♥" : "♡"}
                  </Text>
                </Pressable>
                <Text style={{ fontSize: 18, color: colors.accent }}>→</Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      {/* Footer branding */}
      <View style={{ alignItems: "center", marginTop: 12 }}>
        <Text style={{ fontSize: 12, color: colors.subtext }}>
          Powered by Mohamed Nour
        </Text>
      </View>
    </ScrollView>
  );
}
