import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { postJson } from "@/constants/api";

export default function RegisterScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSendCode() {
    if (!fullName.trim() || !phone.trim() || !email.trim() || !password) {
      Alert.alert("Fadlan buuxi", "Fadlan buuxi dhammaan meelaha.");
      return;
    }
    if (password.length < 6) {
      Alert.alert(
        "Password aad u gaaban",
        "Fadlan dooro password ugu yaraan 6 xaraf ah.",
      );
      return;
    }

    setLoading(true);
    const result = await postJson("/users/register", {
      name: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      password,
    });
    setLoading(false);

    if (!result.ok) {
      Alert.alert("Cilad", result.error);
      return;
    }

    router.push({
      pathname: "/verify-code",
      params: { email: email.trim().toLowerCase(), mode: "register" },
    });
  }

  const inputStyle = {
    backgroundColor: "#151B18",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 14,
    marginBottom: 16,
    color: "white",
  } as const;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0B0F0D" }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: 70,
        paddingHorizontal: 24,
        paddingBottom: 40,
      }}
      keyboardShouldPersistTaps="handled"
    >
      {/* Logo */}
      <View style={{ alignItems: "center", marginBottom: 24 }}>
        <Image
          source={require("@/assets/images/mvo-logo.png")}
          style={{ width: 64, height: 64, borderRadius: 18, marginBottom: 10 }}
          contentFit="contain"
        />
        <Text style={{ fontSize: 22, fontWeight: "800", color: "#2ECC71" }}>
          MVO
        </Text>
      </View>

      <Text
        style={{
          fontSize: 26,
          fontWeight: "800",
          color: "white",
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        Samee Akoonkaaga
      </Text>
      <Text
        style={{
          fontSize: 13.5,
          color: "#9CA3AF",
          textAlign: "center",
          marginBottom: 30,
          lineHeight: 19,
        }}
      >
        Diiwaan gali si aad u bilowdo isticmaalka MVO.
      </Text>

      <Text style={{ fontSize: 13, color: "#D1D5DB", marginBottom: 8 }}>
        Magaca oo dhan
      </Text>
      <TextInput
        placeholder="Tusaale: Ahmed Abdi Ali"
        placeholderTextColor="#6B7280"
        value={fullName}
        onChangeText={setFullName}
        style={inputStyle}
      />

      <Text style={{ fontSize: 13, color: "#D1D5DB", marginBottom: 8 }}>
        Lambarka Telefoonka
      </Text>
      <TextInput
        placeholder="61 234 5678"
        placeholderTextColor="#6B7280"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        style={inputStyle}
      />

      <Text style={{ fontSize: 13, color: "#D1D5DB", marginBottom: 8 }}>
        Email
      </Text>
      <TextInput
        placeholder="tusaale@gmail.com"
        placeholderTextColor="#6B7280"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ ...inputStyle, marginBottom: 8 }}
      />
      <Text style={{ fontSize: 11.5, color: "#6B7280", marginBottom: 16 }}>
        Waxaan kuu dirnaa code xaqiijin ah email-kan.
      </Text>

      <Text style={{ fontSize: 13, color: "#D1D5DB", marginBottom: 8 }}>
        Furaha sirta
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#151B18",
          borderRadius: 14,
          paddingHorizontal: 16,
          marginBottom: 24,
        }}
      >
        <TextInput
          placeholder="Ugu yaraan 6 xaraf"
          placeholderTextColor="#6B7280"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          style={{ flex: 1, paddingVertical: 15, fontSize: 14, color: "white" }}
        />
        <Pressable onPress={() => setShowPassword(!showPassword)}>
          <Text style={{ fontSize: 12, color: "#9CA3AF" }}>
            {showPassword ? "Qari" : "Tus"}
          </Text>
        </Pressable>
      </View>

      <Pressable
        onPress={handleSendCode}
        disabled={loading}
        style={{
          backgroundColor: "#0F4C33",
          borderRadius: 16,
          paddingVertical: 16,
          alignItems: "center",
          marginBottom: 20,
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{ color: "white", fontSize: 15, fontWeight: "700" }}>
            Dir Code-ka
          </Text>
        )}
      </Pressable>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text style={{ fontSize: 12, color: "#6B7280" }}>
          Horay ma u lahayd account?{" "}
        </Text>
        <Pressable onPress={() => router.push("/login")}>
          <Text style={{ fontSize: 12, color: "#2ECC71", fontWeight: "700" }}>
            Gal
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
