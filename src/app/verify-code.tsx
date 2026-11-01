import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
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

const CODE_LENGTH = 6;
const RESEND_SECONDS = 30;

export default function VerifyCodeScreen() {
  const router = useRouter();
  const { email, mode } = useLocalSearchParams<{
    email: string;
    mode: string;
  }>();
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_SECONDS);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  // Resend countdown
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  function handleChange(text: string, index: number) {
    setError("");
    const digits = text.replace(/\D/g, "");

    if (!digits) {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
      return;
    }

    // Typing over a filled box: keep the newest digit
    if (digits.length === 2 && code[index] !== "") {
      const newCode = [...code];
      newCode[index] = digits.slice(-1);
      setCode(newCode);
      if (index < CODE_LENGTH - 1) inputRefs.current[index + 1]?.focus();
      return;
    }

    // Paste (or single digit): fill from this box onward
    const newCode = [...code];
    let i = index;
    for (const d of digits) {
      if (i > CODE_LENGTH - 1) break;
      newCode[i] = d;
      i++;
    }
    setCode(newCode);
    inputRefs.current[Math.min(i, CODE_LENGTH - 1)]?.focus();
  }

  function handleKeyPress(e: any, index: number) {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      inputRefs.current[index - 1]?.focus();
    }
  }

  async function handleVerify() {
    const fullCode = code.join("");
    if (fullCode.length < CODE_LENGTH) {
      setError(`Fadlan geli ${CODE_LENGTH}-ka lambar oo dhan.`);
      return;
    }

    // Forgot-password flow: backend reset endpoint is not built yet
    if (mode !== "register") {
      router.push({ pathname: "/set-password", params: { email, mode } });
      return;
    }

    setLoading(true);
    const result = await postJson("/users/verify-code", {
      email,
      code: fullCode,
    });
    setLoading(false);

    if (!result.ok) {
      setError(result.error);
      setCode(Array(CODE_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
      return;
    }

    router.replace({ pathname: "/success", params: { mode: "register" } });
  }

  async function handleResend() {
    if (cooldown > 0) return;

    if (mode !== "register") {
      Alert.alert(
        "Dhawaan",
        "Dib u dirista code-ka password-ka dhawaan ayaa la diyaarin doonaa.",
      );
      return;
    }

    const result = await postJson("/users/resend-code", { email });
    if (!result.ok) {
      Alert.alert("Cilad", result.error);
      return;
    }
    setCode(Array(CODE_LENGTH).fill(""));
    setError("");
    setCooldown(RESEND_SECONDS);
    inputRefs.current[0]?.focus();
    Alert.alert("Waa la diray", "Code cusub ayaa laguu diray email-kaaga.");
  }

  const filled = code.join("").length === CODE_LENGTH;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#0B0F0D" }}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: 90,
        paddingHorizontal: 24,
        paddingBottom: 40,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <View style={{ alignItems: "center", marginBottom: 24 }}>
        <View
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            backgroundColor: "#151B18",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 28 }}>📩</Text>
        </View>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "800",
            color: "white",
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          Hubi Email-kaaga
        </Text>
        <Text
          style={{
            fontSize: 13.5,
            color: "#9CA3AF",
            textAlign: "center",
            lineHeight: 19,
            paddingHorizontal: 10,
          }}
        >
          Waxaan u dirnay code {CODE_LENGTH}-lambar ah{"\n"}
          <Text style={{ color: "white", fontWeight: "600" }}>
            {email || "email-kaaga"}
          </Text>
        </Text>
      </View>

      {/* OTP boxes */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 8,
          marginBottom: error ? 12 : 30,
        }}
      >
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            style={{
              flex: 1,
              maxWidth: 52,
              height: 58,
              borderRadius: 14,
              backgroundColor: "#151B18",
              borderWidth: 1.5,
              borderColor: error ? "#E74C3C" : digit ? "#0F4C33" : "#232A27",
              color: "white",
              fontSize: 22,
              fontWeight: "700",
              textAlign: "center",
            }}
          />
        ))}
      </View>

      {error ? (
        <Text
          style={{
            color: "#E74C3C",
            fontSize: 13,
            textAlign: "center",
            marginBottom: 22,
            fontWeight: "600",
          }}
        >
          {error}
        </Text>
      ) : null}

      <Pressable
        onPress={handleVerify}
        disabled={loading}
        style={{
          backgroundColor: "#0F4C33",
          borderRadius: 16,
          paddingVertical: 16,
          alignItems: "center",
          marginBottom: 20,
          opacity: loading || !filled ? 0.6 : 1,
        }}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{ color: "white", fontSize: 15, fontWeight: "700" }}>
            Xaqiiji
          </Text>
        )}
      </Pressable>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text style={{ fontSize: 12.5, color: "#6B7280" }}>
          Code-ka ma heshay?{" "}
        </Text>
        <Pressable onPress={handleResend} disabled={cooldown > 0}>
          <Text
            style={{
              fontSize: 12.5,
              color: cooldown > 0 ? "#6B7280" : "#2ECC71",
              fontWeight: "700",
            }}
          >
            {cooldown > 0 ? `Dib u dir (${cooldown}s)` : "Dib u dir"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
