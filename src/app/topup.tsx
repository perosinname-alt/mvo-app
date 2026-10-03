import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

import { useAppTheme } from "@/context/ThemeContext";
import { useWallet } from "@/context/WalletContext";

const METHODS = [
  { id: "golis", name: "Golis Sahal", emoji: "💰" },
  { id: "evc", name: "EVC Plus", emoji: "📱" },
  { id: "edahab", name: "eDahab", emoji: "💳" },
];

const QUICK_AMOUNTS = [5, 10, 20, 50];

export default function TopUpScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const { topUp } = useWallet();
  const [selectedMethod, setSelectedMethod] = useState("golis");
  const [amount, setAmount] = useState("");

  function handleTopUp() {
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) {
      Alert.alert("Lacag qalad ah", "Fadlan geli lacag sax ah.");
      return;
    }
    const methodName = METHODS.find((m) => m.id === selectedMethod)?.name || "";
    topUp(numAmount, methodName);
    Alert.alert(
      "Waa la kordhiyay! ✅",
      `$${numAmount} ayaa lagu daray wallet-kaaga adoo isticmaalaya ${methodName}.`,
      [{ text: "OK", onPress: () => router.back() }],
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    >
      <Text
        style={{
          fontSize: 15,
          fontWeight: "700",
          color: colors.text,
          marginBottom: 10,
        }}
      >
        Habka lacag bixinta
      </Text>
      {METHODS.map((method) => (
        <Pressable
          key={method.id}
          onPress={() => setSelectedMethod(method.id)}
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.card,
            borderRadius: 12,
            padding: 14,
            marginBottom: 10,
            borderWidth: 2,
            borderColor:
              selectedMethod === method.id ? colors.primary : "transparent",
          }}
        >
          <Text style={{ fontSize: 20, marginRight: 12 }}>{method.emoji}</Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "600",
              flex: 1,
              color: colors.text,
            }}
          >
            {method.name}
          </Text>
          {selectedMethod === method.id && (
            <Text style={{ fontSize: 16, color: colors.accent }}>✓</Text>
          )}
        </Pressable>
      ))}

      <Text
        style={{
          fontSize: 15,
          fontWeight: "700",
          color: colors.text,
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        Lacagta
      </Text>
      <TextInput
        placeholder="$0.00"
        placeholderTextColor={colors.subtext}
        value={amount}
        onChangeText={setAmount}
        keyboardType="decimal-pad"
        style={{
          backgroundColor: colors.card,
          borderRadius: 14,
          padding: 16,
          fontSize: 24,
          fontWeight: "800",
          color: colors.text,
          marginBottom: 14,
          textAlign: "center",
        }}
      />

      <View style={{ flexDirection: "row", gap: 10, marginBottom: 24 }}>
        {QUICK_AMOUNTS.map((amt) => (
          <Pressable
            key={amt}
            onPress={() => setAmount(amt.toString())}
            style={{
              flex: 1,
              backgroundColor: colors.primarySoft,
              borderRadius: 10,
              paddingVertical: 10,
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 13, fontWeight: "700", color: colors.accent }}
            >
              ${amt}
            </Text>
          </Pressable>
        ))}
      </View>

      <Pressable
        onPress={handleTopUp}
        style={{
          backgroundColor: colors.primary,
          borderRadius: 14,
          paddingVertical: 16,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 15, fontWeight: "700" }}>
          Ku shub Wallet-ka
        </Text>
      </Pressable>
    </ScrollView>
  );
}
