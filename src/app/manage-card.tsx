import { Image } from "expo-image";
import { useState } from "react";
import { Alert, Pressable, ScrollView, Switch, Text, View } from "react-native";

import { useAppTheme } from "@/context/ThemeContext";

const CARD_NUMBER = "4521 88•• •••• 3092";
const CARD_HOLDER = "MOHAMED NOUR";
const CARD_EXPIRY = "09/29";

function MastercardLogo() {
  return (
    <View style={{ flexDirection: "row", width: 40, height: 24 }}>
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: "#EB001B",
        }}
      />
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: "#F79E1B",
          marginLeft: -10,
          opacity: 0.9,
        }}
      />
    </View>
  );
}

export default function ManageCardScreen() {
  const { colors } = useAppTheme();
  const [frozen, setFrozen] = useState(false);

  function handleAction(title: string) {
    Alert.alert(title, "Tan dhawaan ayaa la diyaarin doonaa.");
  }

  function handleReportLost() {
    Alert.alert(
      "Kaarka waa la luminay?",
      "Kaarkan hadda wuu joogsan doonaa, waxaana laguu diri doonaa kaar cusub.",
      [
        { text: "Maya", style: "cancel" },
        {
          text: "Haa, dir",
          style: "destructive",
          onPress: () => handleAction("Kaarka waa la soo sheegay"),
        },
      ],
    );
  }

  const rowStyle = {
    backgroundColor: colors.card,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row" as const,
    justifyContent: "space-between" as const,
    alignItems: "center" as const,
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    >
      {/* Mini card preview */}
      <View
        style={{
          backgroundColor: "#0B3D28",
          borderRadius: 18,
          padding: 20,
          marginBottom: 24,
          height: 170,
          justifyContent: "space-between",
          overflow: "hidden",
          opacity: frozen ? 0.5 : 1,
        }}
      >
        <Image
          source={require("@/assets/images/mvo-logo.png")}
          style={{
            position: "absolute",
            right: -30,
            top: -30,
            width: 150,
            height: 150,
            opacity: 0.12,
          }}
          contentFit="contain"
        />
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Image
            source={require("@/assets/images/mvo-logo.png")}
            style={{ width: 24, height: 24, borderRadius: 6 }}
            contentFit="contain"
          />
          <Text style={{ color: "white", fontSize: 16, fontWeight: "800" }}>
            MVO
          </Text>
        </View>
        <Text
          style={{
            color: "white",
            fontSize: 17,
            fontWeight: "700",
            letterSpacing: 2,
          }}
        >
          {CARD_NUMBER}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <View>
            <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 9 }}>
              CARD HOLDER
            </Text>
            <Text style={{ color: "white", fontSize: 12.5, fontWeight: "700" }}>
              {CARD_HOLDER}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={{ color: "rgba(255,255,255,0.6)", fontSize: 9 }}>
              EXPIRES
            </Text>
            <Text style={{ color: "white", fontSize: 12.5, fontWeight: "700" }}>
              {CARD_EXPIRY}
            </Text>
          </View>
          <MastercardLogo />
        </View>
      </View>

      {frozen && (
        <View
          style={{
            backgroundColor: "#FDECEA",
            borderRadius: 12,
            padding: 12,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: "#C0392B",
              fontSize: 13,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            🔒 Kaarkan hadda waa la isargeeyay (frozen) — lama isticmaali karo.
          </Text>
        </View>
      )}

      {/* Freeze toggle */}
      <View style={rowStyle}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Text style={{ fontSize: 20 }}>🧊</Text>
          <View>
            <Text
              style={{ fontSize: 15, fontWeight: "700", color: colors.text }}
            >
              Isargay Kaarka
            </Text>
            <Text
              style={{ fontSize: 11.5, color: colors.subtext, marginTop: 2 }}
            >
              Ku joojin ku meel gaar ah
            </Text>
          </View>
        </View>
        <Switch
          value={frozen}
          onValueChange={setFrozen}
          trackColor={{ false: "#D1D5DB", true: colors.primary }}
          thumbColor="white"
        />
      </View>

      {/* Other actions */}
      <Pressable onPress={() => handleAction("Beddel PIN-ka")} style={rowStyle}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Text style={{ fontSize: 20 }}>🔢</Text>
          <Text style={{ fontSize: 15, fontWeight: "700", color: colors.text }}>
            Beddel PIN-ka Kaarka
          </Text>
        </View>
        <Text style={{ fontSize: 16, color: colors.subtext }}>›</Text>
      </Pressable>

      <Pressable
        onPress={() => handleAction("Xaddiga Kaarka")}
        style={rowStyle}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <Text style={{ fontSize: 20 }}>📊</Text>
          <Text style={{ fontSize: 15, fontWeight: "700", color: colors.text }}>
            Xaddiga Isticmaalka
          </Text>
        </View>
        <Text style={{ fontSize: 16, color: colors.subtext }}>›</Text>
      </Pressable>

      <Pressable
        onPress={handleReportLost}
        style={{
          backgroundColor: "#FDECEA",
          borderRadius: 14,
          padding: 16,
          marginTop: 16,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#C0392B", fontSize: 15, fontWeight: "700" }}>
          Kaarka waa la luminay / la xaday
        </Text>
      </Pressable>
    </ScrollView>
  );
}
