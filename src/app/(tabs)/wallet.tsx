import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import { useAppTheme } from "@/context/ThemeContext";
import { useWallet } from "@/context/WalletContext";

const CARD_NUMBER = "4521 88•• •••• 3092";
const CARD_HOLDER = "MOHAMED NOUR";
const CARD_EXPIRY = "09/29";

const HUB_ACTIONS = [
  { id: "topup", label: "Top Up", icon: "add-circle-outline", route: "/topup" },
  {
    id: "withdraw",
    label: "Withdraw",
    icon: "arrow-up-circle-outline",
    route: "/withdraw",
  },
  {
    id: "manage",
    label: "Manage Card",
    icon: "card-outline",
    route: "/manage-card",
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: "receipt-outline",
    route: "/transactions",
  },
] as const;

function MastercardLogo() {
  return (
    <View style={{ flexDirection: "row", width: 46, height: 28 }}>
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: "#EB001B",
        }}
      />
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 14,
          backgroundColor: "#F79E1B",
          marginLeft: -12,
          opacity: 0.9,
        }}
      />
    </View>
  );
}

export default function WalletScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();
  const { balance } = useWallet();
  const [showBalance, setShowBalance] = useState(true);
  const [showCardNumber, setShowCardNumber] = useState(false);

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
          marginBottom: 16,
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
            <Ionicons
              name={showBalance ? "eye-outline" : "eye-off-outline"}
              size={18}
              color="white"
            />
          </Pressable>
        </View>

        <Text style={{ color: "white", fontSize: 34, fontWeight: "800" }}>
          {showBalance ? `$${balance.toFixed(2)}` : "••••••"}
        </Text>
      </View>

      {/* Hub actions: Top Up / Withdraw / Manage Card / Transactions */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10,
          marginBottom: 24,
        }}
      >
        {HUB_ACTIONS.map((action) => (
          <Pressable
            key={action.id}
            onPress={() => router.push(action.route as any)}
            style={{
              width: "48%",
              backgroundColor: colors.card,
              borderRadius: 14,
              paddingVertical: 16,
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 2 },
              elevation: 2,
            }}
          >
            <Ionicons
              name={action.icon as any}
              size={24}
              color={colors.accent}
              style={{ marginBottom: 6 }}
            />
            <Text
              style={{ fontSize: 13, fontWeight: "700", color: colors.text }}
            >
              {action.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* MVO Mastercard */}
      <Text
        style={{
          fontSize: 15,
          fontWeight: "700",
          color: colors.text,
          marginBottom: 10,
        }}
      >
        Kaarkaaga
      </Text>
      <Pressable onPress={() => router.push("/manage-card")}>
        <View
          style={{
            backgroundColor: "#1C1C1E",
            borderRadius: 18,
            padding: 20,
            marginBottom: 10,
            height: 180,
            justifyContent: "space-between",
            overflow: "hidden",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <View
              style={{
                width: 34,
                height: 26,
                borderRadius: 5,
                backgroundColor: "#D4AF37",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Ionicons
                name="hardware-chip-outline"
                size={16}
                color="#4A3B0A"
              />
            </View>
            <Text
              style={{
                color: "white",
                fontSize: 15,
                fontWeight: "800",
                letterSpacing: 1,
              }}
            >
              MVO
            </Text>
          </View>

          <Pressable onPress={() => setShowCardNumber(!showCardNumber)}>
            <Text
              style={{
                color: "white",
                fontSize: 17,
                fontWeight: "700",
                letterSpacing: 2,
              }}
            >
              {showCardNumber ? "4521 8842 1190 3092" : CARD_NUMBER}
            </Text>
          </Pressable>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <View>
              <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 9 }}>
                CARD HOLDER
              </Text>
              <Text
                style={{ color: "white", fontSize: 12.5, fontWeight: "700" }}
              >
                {CARD_HOLDER}
              </Text>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <Text style={{ color: "rgba(255,255,255,0.5)", fontSize: 9 }}>
                EXPIRES
              </Text>
              <Text
                style={{ color: "white", fontSize: 12.5, fontWeight: "700" }}
              >
                {CARD_EXPIRY}
              </Text>
            </View>
            <MastercardLogo />
          </View>
        </View>
      </Pressable>
    </ScrollView>
  );
}
