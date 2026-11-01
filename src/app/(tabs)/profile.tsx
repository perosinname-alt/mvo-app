import { useRouter } from "expo-router";
import { ReactNode, useState } from "react";
import { Alert, Pressable, ScrollView, Switch, Text, View } from "react-native";

import { useAuth } from "@/context/AuthContext";
import { useAppTheme } from "@/context/ThemeContext";

function SettingRow({
  emoji,
  label,
  right,
  onPress,
  isLast,
}: {
  emoji: string;
  label: string;
  right?: ReactNode;
  onPress?: () => void;
  isLast?: boolean;
}) {
  const { colors } = useAppTheme();
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 15,
        paddingHorizontal: 16,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: colors.border,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            backgroundColor: colors.primarySoft,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 17 }}>{emoji}</Text>
        </View>
        <Text style={{ fontSize: 15, fontWeight: "600", color: colors.text }}>
          {label}
        </Text>
      </View>
      {right ?? <Text style={{ fontSize: 16, color: colors.subtext }}>›</Text>}
    </Pressable>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const { isDark, colors, toggleTheme } = useAppTheme();
  const { user, signOut } = useAuth();
  const [notificationsOn, setNotificationsOn] = useState(true);

  function handleLogout() {
    Alert.alert("Ka bax", "Ma hubtaa inaad ka baxayso?", [
      { text: "Maya", style: "cancel" },
      { text: "Haa, ka bax", style: "destructive", onPress: () => signOut() },
    ]);
  }

  function comingSoon(title: string) {
    Alert.alert(title, "Tan dhawaan ayaa la diyaarin doonaa.");
  }

  const cardStyle = {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginBottom: 22,
    overflow: "hidden" as const,
  };

  const sectionTitle = {
    fontSize: 12.5,
    fontWeight: "700" as const,
    color: colors.subtext,
    marginBottom: 8,
    marginLeft: 4,
    textTransform: "uppercase" as const,
    letterSpacing: 0.5,
  };

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
        Profile
      </Text>

      {/* Profile card */}
      <View
        style={{
          backgroundColor: colors.card,
          borderRadius: 18,
          padding: 18,
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 26,
        }}
      >
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: colors.primarySoft,
            borderWidth: 2,
            borderColor: colors.accent,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 14,
          }}
        >
          <Text style={{ fontSize: 26 }}>👤</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: "800", color: colors.text }}>
            {user?.name ?? "Customer"}
          </Text>
          <Text style={{ fontSize: 13, color: colors.subtext, marginTop: 2 }}>
            {user?.email ?? ""}
          </Text>
        </View>
      </View>

      {/* Business */}
      <Text style={sectionTitle}>Ganacsiga</Text>
      <View style={cardStyle}>
        <SettingRow
          emoji="🏪"
          label="Shirkadahayga"
          onPress={() => router.push("/my-companies")}
        />
        <SettingRow
          emoji="➕"
          label="Ganacsigaaga ku bilow"
          onPress={() => router.push("/create-company")}
          isLast
        />
      </View>

      {/* Appearance */}
      <Text style={sectionTitle}>Muuqaalka</Text>
      <View style={cardStyle}>
        <SettingRow
          emoji="🌙"
          label="Dark Mode"
          isLast
          right={
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: "#D1D5DB", true: colors.primary }}
              thumbColor="white"
            />
          }
        />
      </View>

      {/* Notifications */}
      <Text style={sectionTitle}>Ogeysiisyada</Text>
      <View style={cardStyle}>
        <SettingRow
          emoji="🔔"
          label="Ogeysiisyada"
          isLast
          right={
            <Switch
              value={notificationsOn}
              onValueChange={setNotificationsOn}
              trackColor={{ false: "#D1D5DB", true: colors.primary }}
              thumbColor="white"
            />
          }
        />
      </View>

      {/* General */}
      <Text style={sectionTitle}>Guud</Text>
      <View style={cardStyle}>
        <SettingRow
          emoji="🌐"
          label="Luuqadda"
          onPress={() => comingSoon("Luuqadda")}
        />
        <SettingRow
          emoji="❓"
          label="Caawimaad"
          onPress={() => comingSoon("Caawimaad")}
          isLast
        />
      </View>

      {/* Logout */}
      <Pressable
        onPress={handleLogout}
        style={({ pressed }) => ({
          backgroundColor: pressed ? "#C0392B" : "#E74C3C",
          borderRadius: 14,
          paddingVertical: 15,
          alignItems: "center",
          marginTop: 4,
        })}
      >
        <Text style={{ color: "white", fontSize: 15, fontWeight: "700" }}>
          Ka bax
        </Text>
      </Pressable>

      <Text
        style={{
          textAlign: "center",
          fontSize: 12,
          color: colors.subtext,
          marginTop: 22,
        }}
      >
        MVO v1.0.0
      </Text>
    </ScrollView>
  );
}
