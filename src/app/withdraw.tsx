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

export default function WithdrawScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const { balance, withdraw } = useWallet();
  const [selectedMethod, setSelectedMethod] = useState("golis");
  const [amount, setAmount] = useState("");

  function handleWithdraw() {
    const numAmount = parseFloat(amount);
    if (!numAmount || numAmount <= 0) {
      Alert.alert("Lacag qalad ah", "Fadlan geli lacag sax ah.");
      return;
    }
    const methodName = METHODS.find((m) => m.id === selectedMethod)?.name || "";
    const success = withdraw(numAmount, methodName);

    if (!success) {
      Alert.alert(
        "Lacag kuguma filna",
        `Haraagaagu waa $${balance.toFixed(2)}, mana ku filna $${numAmount}.`,
      );
      return;
    }

    Alert.alert(
      "Waa la bixiyay! ✅",
      `$${numAmount} ayaa laga saaray wallet-kaaga loogu diray ${methodName}.`,
      [{ text: "OK", onPress: () => router.back() }],
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    >
      <View
        style={{
          backgroundColor: colors.primarySoft,
          borderRadius: 14,
          padding: 16,
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 12, color: colors.subtext, marginBottom: 4 }}>
          Haraaga hadda
        </Text>
        <Text style={{ fontSize: 22, fontWeight: "800", color: colors.accent }}>
          ${balance.toFixed(2)}
        </Text>
      </View>

      <Text
        style={{
          fontSize: 15,
          fontWeight: "700",
          color: colors.text,
          marginBottom: 10,
        }}
      >
        Habka loo diro
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
        Lacagta aad rabto inaad ka bixiso
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
          marginBottom: 24,
          textAlign: "center",
        }}
      />

      <Pressable
        onPress={handleWithdraw}
        style={{
          backgroundColor: colors.primary,
          borderRadius: 14,
          paddingVertical: 16,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 15, fontWeight: "700" }}>
          Ka bixi Wallet-ka
        </Text>
      </Pressable>
    </ScrollView>
  );
}
