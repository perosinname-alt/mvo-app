import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

import { postJson } from "@/constants/api";
import { useAuth } from "@/context/AuthContext";
import { useAppTheme } from "@/context/ThemeContext";

// ids waa inay la mid yihiin companyType-ka backend-ka
const TYPES = [
  { id: "retail", name: "Supermarket" },
  { id: "telecom", name: "Electronics" },
  { id: "university", name: "University" },
  { id: "mechanic", name: "Oil change" },
  { id: "solar", name: "Solar system" },
  { id: "restruent", name: "Restaurant" },
  { id: "Constructions", name: "Constructions" },
  { id: "others", name: "Others" },
];

export default function CreateCompanyScreen() {
  const { type } = useLocalSearchParams<{ type?: string }>();
  const router = useRouter();
  const { colors } = useAppTheme();
  const { token } = useAuth();

  const [name, setName] = useState("");
  const [companyType, setCompanyType] = useState(
    TYPES.some((t) => t.id === type) ? (type as string) : "",
  );
  const [city, setCity] = useState("Bosaso");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit() {
    setError(null);
    if (!name.trim()) return setError("Fadlan geli magaca shirkadda.");
    if (!companyType) return setError("Fadlan dooro nooca shirkadda.");
    if (!city.trim()) return setError("Fadlan geli magaalada.");

    setSaving(true);
    const res = await postJson(
      "/companies",
      {
        name: name.trim(),
        companyType,
        city: city.trim(),
        address: address.trim() || undefined,
        phone: phone.trim() || undefined,
      },
      token,
    );
    setSaving(false);

    if (!res.ok) {
      setError(res.error);
      return;
    }

    Alert.alert("Waa la sameeyay", "Shirkaddaada waa la abuuray.", [
      {
        text: "Hagaag",
        onPress: () =>
          router.replace({
            pathname: "/company/[type]",
            params: { type: companyType },
          }),
      },
    ]);
  }

  const inputStyle = {
    backgroundColor: colors.card,
    color: colors.text,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(128,128,128,0.3)",
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  } as const;

  const labelStyle = {
    fontSize: 13,
    fontWeight: "700",
    color: colors.subtext,
    marginBottom: 6,
    marginTop: 14,
  } as const;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Stack.Screen options={{ title: "Ganacsigaaga ku bilow" }} />
      <ScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={{ fontSize: 22, fontWeight: "800", color: colors.accent }}>
          Shirkad cusub
        </Text>
        <Text style={{ fontSize: 14, color: colors.subtext, marginTop: 4 }}>
          Buuxi macluumaadka. Adigu ayaa noqonaya admin-ka shirkaddan.
        </Text>

        <Text style={labelStyle}>Magaca shirkadda</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Tusaale: Supermarket-ka Nasiib"
          placeholderTextColor={colors.subtext}
          style={inputStyle}
        />

        <Text style={labelStyle}>Nooca</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {TYPES.map((t) => {
            const active = companyType === t.id;
            return (
              <Pressable
                key={t.id}
                onPress={() => setCompanyType(t.id)}
                style={{
                  backgroundColor: active ? colors.primary : colors.card,
                  borderRadius: 999,
                  paddingHorizontal: 14,
                  paddingVertical: 10,
                  borderWidth: 1,
                  borderColor: active
                    ? colors.primary
                    : "rgba(128,128,128,0.3)",
                }}
              >
                <Text
                  style={{
                    color: active ? "white" : colors.text,
                    fontWeight: "600",
                    fontSize: 13,
                  }}
                >
                  {t.name}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={labelStyle}>Magaalada</Text>
        <TextInput
          value={city}
          onChangeText={setCity}
          placeholder="Bosaso"
          placeholderTextColor={colors.subtext}
          style={inputStyle}
        />

        <Text style={labelStyle}>Ciwaanka (ikhtiyaari)</Text>
        <TextInput
          value={address}
          onChangeText={setAddress}
          placeholder="Tusaale: Suuqa Bosaso"
          placeholderTextColor={colors.subtext}
          style={inputStyle}
        />

        <Text style={labelStyle}>Taleefanka (ikhtiyaari)</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder="090xxxxxxx"
          placeholderTextColor={colors.subtext}
          keyboardType="phone-pad"
          style={inputStyle}
        />

        {!!error && (
          <Text style={{ color: "#D32F2F", fontSize: 14, marginTop: 16 }}>
            {error}
          </Text>
        )}

        <Pressable
          onPress={submit}
          disabled={saving}
          style={{
            backgroundColor: colors.primary,
            borderRadius: 14,
            paddingVertical: 15,
            alignItems: "center",
            marginTop: 22,
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>
              Shirkadda samee
            </Text>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
