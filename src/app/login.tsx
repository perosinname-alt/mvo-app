import { Ionicons } from "@expo/vector-icons";
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
import Svg, { Path } from "react-native-svg";

import { postJson } from "@/constants/api";
import { useAuth } from "@/context/AuthContext";

function GoogleIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 48 48">
      <Path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <Path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.9-2.26 5.36-4.78 7.01l7.73 6c4.51-4.18 7.09-10.36 7.09-17.48z"
      />
      <Path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <Path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </Svg>
  );
}

const TEXT = {
  so: {
    login: "Gal",
    register: "Isdiiwaangeli",
    title: "Kusoo Dhawoow",
    subtitle: "Sii wado dalabkaaga si casri ah oo fudud.",
    emailLabel: "Email",
    passwordLabel: "Furaha sirta",
    passwordPlaceholder: "Furaha sirta",
    show: "Tus",
    hide: "Qari",
    forgot: "Furaha sirta ma ilowday?",
    loginButton: "Gal",
    fillAll: "Fadlan geli email-kaaga iyo furaha sirta.",
    or: "ama",
    google: "Google",
    apple: "Apple",
    helpLine1: "Haddii aad cilad la kulanto ama caawimaad u baahan tahay,",
    helpLine2: "nala soo xiriir",
    notReady: "Weli lama diyaarin",
    googleAlert: "Google Sign-In wuu iman doonaa mar dambe.",
    appleAlert: "Apple Sign-In wuu iman doonaa mar dambe.",
  },
  en: {
    login: "Login",
    register: "Register",
    title: "Welcome Back",
    subtitle: "Continue your order quickly and easily.",
    emailLabel: "Email",
    passwordLabel: "Password",
    passwordPlaceholder: "Password",
    show: "Show",
    hide: "Hide",
    forgot: "Forgot password?",
    loginButton: "Login",
    fillAll: "Please enter your email and password.",
    or: "or",
    google: "Google",
    apple: "Apple",
    helpLine1: "If you run into an issue or need help,",
    helpLine2: "contact us",
    notReady: "Not ready yet",
    googleAlert: "Google Sign-In is coming soon.",
    appleAlert: "Apple Sign-In is coming soon.",
  },
};

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [lang, setLang] = useState<"so" | "en">("so");
  const t = TEXT[lang];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    if (!email.trim() || !password) {
      setError(t.fillAll);
      return;
    }

    setError("");
    setLoading(true);
    const result = await postJson("/users/login", {
      email: email.trim().toLowerCase(),
      password,
    });

    if (!result.ok) {
      setLoading(false);
      setError(result.error);
      return;
    }

    // Saves the token on the phone. The app then opens Home automatically.
    await signIn(result.data.token, result.data.user);
    setLoading(false);
  }

  function handleGooglePress() {
    Alert.alert(t.notReady, t.googleAlert);
  }

  function handleApplePress() {
    Alert.alert(t.notReady, t.appleAlert);
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0B0F0D" }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: 60,
        paddingHorizontal: 24,
        paddingBottom: 40,
      }}
      keyboardShouldPersistTaps="handled"
    >
      {/* Language switcher */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: 14,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#151B18",
            borderRadius: 20,
            padding: 3,
          }}
        >
          <Pressable
            onPress={() => setLang("so")}
            style={{
              paddingHorizontal: 14,
              paddingVertical: 6,
              borderRadius: 16,
              backgroundColor: lang === "so" ? "#0F4C33" : "transparent",
            }}
          >
            <Text
              style={{
                color: lang === "so" ? "white" : "#9CA3AF",
                fontSize: 12,
                fontWeight: "700",
              }}
            >
              SO
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setLang("en")}
            style={{
              paddingHorizontal: 14,
              paddingVertical: 6,
              borderRadius: 16,
              backgroundColor: lang === "en" ? "#0F4C33" : "transparent",
            }}
          >
            <Text
              style={{
                color: lang === "en" ? "white" : "#9CA3AF",
                fontSize: 12,
                fontWeight: "700",
              }}
            >
              EN
            </Text>
          </Pressable>
        </View>
      </View>

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

      {/* Tabs */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#151B18",
          borderRadius: 30,
          padding: 4,
          marginBottom: 28,
        }}
      >
        <View
          style={{
            flex: 1,
            paddingVertical: 12,
            borderRadius: 26,
            alignItems: "center",
            backgroundColor: "#0F4C33",
          }}
        >
          <Text style={{ color: "white", fontWeight: "700", fontSize: 14 }}>
            {t.login}
          </Text>
        </View>
        <Pressable
          onPress={() => router.push("/register")}
          style={{
            flex: 1,
            paddingVertical: 12,
            borderRadius: 26,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#9CA3AF", fontWeight: "700", fontSize: 14 }}>
            {t.register}
          </Text>
        </Pressable>
      </View>

      {/* Title */}
      <Text
        style={{
          fontSize: 26,
          fontWeight: "800",
          color: "white",
          textAlign: "center",
          marginBottom: 8,
        }}
      >
        {t.title}
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
        {t.subtitle}
      </Text>

      {/* Email */}
      <Text style={{ fontSize: 13, color: "#D1D5DB", marginBottom: 8 }}>
        {t.emailLabel}
      </Text>
      <TextInput
        placeholder="tusaale@gmail.com"
        placeholderTextColor="#6B7280"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setError("");
        }}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{
          backgroundColor: "#151B18",
          borderRadius: 14,
          paddingHorizontal: 16,
          paddingVertical: 15,
          fontSize: 14,
          marginBottom: 16,
          color: "white",
        }}
      />

      {/* Password */}
      <Text style={{ fontSize: 13, color: "#D1D5DB", marginBottom: 8 }}>
        {t.passwordLabel}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#151B18",
          borderRadius: 14,
          paddingHorizontal: 16,
          marginBottom: 10,
          borderWidth: error ? 1.5 : 0,
          borderColor: "#E74C3C",
        }}
      >
        <TextInput
          placeholder={t.passwordPlaceholder}
          placeholderTextColor="#6B7280"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError("");
          }}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          style={{ flex: 1, paddingVertical: 15, fontSize: 14, color: "white" }}
        />
        <Pressable onPress={() => setShowPassword(!showPassword)}>
          <Text style={{ fontSize: 12, color: "#9CA3AF" }}>
            {showPassword ? t.hide : t.show}
          </Text>
        </Pressable>
      </View>

      {/* Error message */}
      {error ? (
        <Text
          style={{
            color: "#E74C3C",
            fontSize: 13,
            fontWeight: "600",
            marginBottom: 10,
          }}
        >
          {error}
        </Text>
      ) : null}

      {/* Forgot password */}
      <Pressable
        onPress={() => router.push("/forgot-password")}
        style={{ alignSelf: "flex-end", marginBottom: 24 }}
      >
        <Text style={{ fontSize: 12.5, color: "#2ECC71", fontWeight: "600" }}>
          {t.forgot}
        </Text>
      </Pressable>

      {/* Login button */}
      <Pressable
        onPress={handleLogin}
        disabled={loading}
        style={{
          backgroundColor: "#0F4C33",
          borderRadius: 16,
          paddingVertical: 16,
          alignItems: "center",
          marginBottom: 22,
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{ color: "white", fontSize: 15, fontWeight: "700" }}>
            {t.loginButton}
          </Text>
        )}
      </Pressable>

      {/* Divider */}
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 22 }}
      >
        <View style={{ flex: 1, height: 1, backgroundColor: "#232A27" }} />
        <Text style={{ fontSize: 12, color: "#6B7280", marginHorizontal: 12 }}>
          {t.or}
        </Text>
        <View style={{ flex: 1, height: 1, backgroundColor: "#232A27" }} />
      </View>

      {/* Google + Apple side by side */}
      <View style={{ flexDirection: "row", gap: 12, marginBottom: 26 }}>
        <Pressable
          onPress={handleGooglePress}
          style={({ pressed }) => ({
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            backgroundColor: pressed ? "#1A211E" : "#151B18",
            borderRadius: 14,
            paddingVertical: 15,
          })}
        >
          <GoogleIcon />
          <Text style={{ fontSize: 13.5, color: "white", fontWeight: "600" }}>
            {t.google}
          </Text>
        </Pressable>
        <Pressable
          onPress={handleApplePress}
          style={({ pressed }) => ({
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            backgroundColor: pressed ? "#1A211E" : "#151B18",
            borderRadius: 14,
            paddingVertical: 15,
          })}
        >
          <Ionicons name="logo-apple" size={19} color="white" />
          <Text style={{ fontSize: 13.5, color: "white", fontWeight: "600" }}>
            {t.apple}
          </Text>
        </Pressable>
      </View>

      {/* Help line */}
      <Text style={{ fontSize: 12, color: "#6B7280", textAlign: "center" }}>
        {t.helpLine1}
        {"\n"}
        <Text style={{ color: "#2ECC71", fontWeight: "600" }}>
          {t.helpLine2}
        </Text>
      </Text>
    </ScrollView>
  );
}
