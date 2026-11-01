import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system/legacy";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";

import { useAppTheme } from "@/context/ThemeContext";
import { useWallet } from "@/context/WalletContext";

export default function TransactionsScreen() {
  const { colors } = useAppTheme();
  const { transactions, balance } = useWallet();

  async function handlePrint() {
    const rows = transactions
      .map(
        (tx) => `
        <tr>
          <td style="padding:8px;border-bottom:1px solid #eee;">${tx.date}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;">${tx.label}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;color:${tx.amount > 0 ? "#2ECC71" : "#E74C3C"};">
            ${tx.amount > 0 ? "+" : ""}$${Math.abs(tx.amount)}
          </td>
        </tr>`,
      )
      .join("");

    const html = `
      <html>
        <body style="font-family: -apple-system, sans-serif; padding: 20px;">
          <h2 style="color:#0F4C33;">MVO — Taariikhda Lacagta</h2>
          <p style="color:#666;">Haraaga hadda: <strong>$${balance.toFixed(2)}</strong></p>
          <table style="width:100%;border-collapse:collapse;margin-top:16px;">
            <thead>
              <tr style="background:#F0F7F3;">
                <th style="padding:8px;text-align:left;">Taariikhda</th>
                <th style="padding:8px;text-align:left;">Sharraxaad</th>
                <th style="padding:8px;text-align:right;">Lacagta</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
        </body>
      </html>
    `;

    try {
      await Print.printAsync({ html });
    } catch (e) {
      Alert.alert("Cilad", "Print-ku ma shaqeynin. Fadlan mar kale isku day.");
    }
  }

  async function handleExportExcel() {
    try {
      const header = "Taariikhda,Sharraxaad,Lacagta\n";
      const rows = transactions
        .map((tx) => `"${tx.date}","${tx.label}",${tx.amount}`)
        .join("\n");
      const csvContent = header + rows;

      const fileUri = FileSystem.cacheDirectory + "MVO_Taariikhda.csv";
      await FileSystem.writeAsStringAsync(fileUri, csvContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert("Cilad", "Wadaagista faylka lama taageerin telefoonkan.");
        return;
      }

      await Sharing.shareAsync(fileUri, {
        mimeType: "text/csv",
        dialogTitle: "La wadaag Taariikhda (CSV)",
      });
    } catch (e) {
      Alert.alert(
        "Cilad",
        "Excel export-ku ma shaqeynin. Fadlan mar kale isku day.",
      );
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Export buttons */}
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          padding: 20,
          paddingBottom: 10,
        }}
      >
        <Pressable
          onPress={handlePrint}
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            backgroundColor: colors.card,
            borderRadius: 12,
            paddingVertical: 13,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Ionicons name="print-outline" size={18} color={colors.text} />
          <Text style={{ fontSize: 14, fontWeight: "700", color: colors.text }}>
            Print
          </Text>
        </Pressable>
        <Pressable
          onPress={handleExportExcel}
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            backgroundColor: colors.primary,
            borderRadius: 12,
            paddingVertical: 13,
          }}
        >
          <Ionicons name="grid-outline" size={18} color="white" />
          <Text style={{ fontSize: 14, fontWeight: "700", color: "white" }}>
            Excel
          </Text>
        </Pressable>
      </View>

      {/* List */}
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 10 }}>
        {transactions.map((tx) => (
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
    </View>
  );
}
