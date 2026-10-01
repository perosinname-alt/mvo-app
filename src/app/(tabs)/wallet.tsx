import { useState } from "react";
import { Alert, Pressable, ScrollView, Share, Text, View } from "react-native";

import { useAppTheme } from "@/context/ThemeContext";

const WALLET_BALANCE = 25;
const WALLET_ACTIONS = [
  { id: "topup", label: "Ku shub", emoji: "➕" },
  { id: "send", label: "Dir", emoji: "📤" },
  { id: "history", label: "Taariikh", emoji: "🕘" },
];

const TRANSACTIONS = [
  {
    id: "1",
    label: "Dalab — Xalwo Kismaayo",
    amount: -14,
    date: "Maanta, 10:02 AM",
  },
  { id: "2", label: "Ku shub Wallet-ka", amount: 20, date: "Shalay, 4:30 PM" },
  {
    id: "3",
    label: "Abaalmarin Referral",
    amount: 2,
    date: "2 maalmood ka hor",
  },
];

const REFERRAL_CODE = "MVO-7K2X9";
const REFERRAL_REWARD = 2;

export default function WalletScreen() {
  const { colors } = useAppTheme();
  const [showBalance, setShowBalance] = useState(true);

  function handleWalletAction(label: string) {
    Alert.alert(label, "Tan dhawaan ayaa la diyaarin doonaa.");
  }

  async function handleShareReferral() {
    try {
      await Share.share({
        message: `Kusoo biir MVO oo dalab si fudud! Isticmaal koodhkayga ${REFERRAL_CODE} si aan labadeenaba u helno $${REFERRAL_REWARD} marka aad dalabkaaga ugu horreeya samayso.`,
      });
    } catch (e) {
      Alert.alert(
        "Cilad",
        "Wadaagista ma suurtagalin. Fadlan mar kale isku day.",
      );
    }
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{
        paddingTop: 60,
        paddingHorizontal: 20,
        paddingBottom: 40,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "800",
          color: colors.accent,
          marginBottom: 20,
        }}
      >
        Wallet
      </Text>

      {/* Balance card */}
      <View
        style={{
          backgroundColor: "#0F4C33",
          borderRadius: 20,
          padding: 20,
          marginBottom: 24,
          shadowColor: "#000",
          shadowOpacity: 0.12,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 4,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <Text style={{ color: "#BFE3D2", fontSize: 13, fontWeight: "600" }}>
            Haraaga guud
          </Text>
          <Pressable onPress={() => setShowBalance(!showBalance)} hitSlop={8}>
            <Text style={{ fontSize: 18 }}>{showBalance ? "👁" : "🙈"}</Text>
          </Pressable>
        </View>

        <Text
          style={{
            color: "white",
            fontSize: 34,
            fontWeight: "800",
            marginBottom: 18,
          }}
        >
          {showBalance ? `$${WALLET_BALANCE.toFixed(2)}` : "••••••"}
        </Text>

        <View style={{ flexDirection: "row", gap: 10 }}>
          {WALLET_ACTIONS.map((action) => (
            <Pressable
              key={action.id}
              onPress={() => handleWalletAction(action.label)}
              style={({ pressed }) => ({
                flex: 1,
                backgroundColor: pressed
                  ? "rgba(255,255,255,0.25)"
                  : "rgba(255,255,255,0.14)",
                borderRadius: 12,
                paddingVertical: 10,
                alignItems: "center",
              })}
            >
              <Text style={{ fontSize: 16, marginBottom: 2 }}>
                {action.emoji}
              </Text>
              <Text style={{ color: "white", fontSize: 12, fontWeight: "600" }}>
                {action.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Referral */}
      <View
        style={{
          backgroundColor: colors.card,
          borderRadius: 18,
          padding: 18,
          marginBottom: 24,
          borderWidth: 1.5,
          borderColor: colors.accent,
          borderStyle: "dashed",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <Text style={{ fontSize: 22, marginRight: 8 }}>🎁</Text>
          <Text
            style={{ fontSize: 16, fontWeight: "800", color: colors.accent }}
          >
            Ku casuun saaxiibkaa
          </Text>
        </View>
        <Text
          style={{
            fontSize: 13,
            color: colors.subtext,
            lineHeight: 19,
            marginBottom: 14,
          }}
        >
          Marka saaxiibkaa isticmaalo koodhkaaga oo uu dalabkiisa ugu horreeya
          sameeyo, labadiinaba wuxuu heli doontaan ${REFERRAL_REWARD}.
        </Text>

        <View
          style={{
            backgroundColor: colors.primarySoft,
            borderRadius: 12,
            paddingVertical: 12,
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <Text
            style={{ fontSize: 11, color: colors.subtext, marginBottom: 2 }}
          >
            Koodhkaaga
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "800",
              color: colors.accent,
              letterSpacing: 2,
            }}
          >
            {REFERRAL_CODE}
          </Text>
        </View>

        <Pressable
          onPress={handleShareReferral}
          style={({ pressed }) => ({
            backgroundColor: pressed ? "#0B3D28" : colors.primary,
            borderRadius: 12,
            paddingVertical: 13,
            alignItems: "center",
          })}
        >
          <Text style={{ color: "white", fontSize: 14, fontWeight: "700" }}>
            📤 La wadaag
          </Text>
        </Pressable>
      </View>

      {/* Transaction history */}
      <Text
        style={{
          fontSize: 16,
          fontWeight: "700",
          color: colors.text,
          marginBottom: 12,
        }}
      >
        Taariikhda
      </Text>
      {TRANSACTIONS.map((tx) => (
        <View
          key={tx.id}
          style={{
            backgroundColor: colors.card,
            borderRadius: 14,
            padding: 14,
            marginBottom: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1, marginRight: 10 }}>
            <Text
              style={{ fontSize: 14, fontWeight: "600", color: colors.text }}
            >
              {tx.label}
            </Text>
            <Text
              style={{ fontSize: 11.5, color: colors.subtext, marginTop: 2 }}
            >
              {tx.date}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "800",
              color: tx.amount > 0 ? "#2ECC71" : "#E74C3C",
            }}
          >
            {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount)}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
