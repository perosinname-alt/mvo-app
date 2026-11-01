import { Stack, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";

import { deleteJson, getJson, postJson, putJson } from "@/constants/api";
import { useAuth } from "@/context/AuthContext";
import { useAppTheme } from "@/context/ThemeContext";

type Product = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  available?: boolean;
};

export default function ManageProductsScreen() {
  const { companyId, name: companyName } = useLocalSearchParams<{
    companyId: string;
    name?: string;
  }>();
  const { colors } = useAppTheme();
  const { token } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [pName, setPName] = useState("");
  const [pDescription, setPDescription] = useState("");
  const [pPrice, setPPrice] = useState("");
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await getJson<Product[]>(`/products/company/${companyId}`);
    if (res.ok) {
      setProducts(Array.isArray(res.data) ? res.data : []);
    } else {
      setError(res.error);
    }
    setLoading(false);
  }, [companyId]);

  useEffect(() => {
    load();
  }, [load]);

  function resetForm() {
    setEditingId(null);
    setPName("");
    setPDescription("");
    setPPrice("");
    setFormError(null);
  }

  function startEdit(p: Product) {
    setEditingId(p._id);
    setPName(p.name);
    setPDescription(p.description ?? "");
    setPPrice(String(p.price));
    setFormError(null);
  }

  async function save() {
    setFormError(null);
    if (!pName.trim()) return setFormError("Fadlan geli magaca alaabta.");
    const price = Number(pPrice);
    if (pPrice.trim() === "" || Number.isNaN(price) || price < 0) {
      return setFormError("Qiimaha waa inuu noqdaa lambar sax ah.");
    }

    setSaving(true);
    const fields = {
      name: pName.trim(),
      description: pDescription.trim(),
      price,
    };
    const res = editingId
      ? await putJson(`/products/${editingId}`, fields, token)
      : await postJson("/products", { ...fields, company: companyId }, token);
    setSaving(false);

    if (!res.ok) {
      setFormError(res.error);
      return;
    }
    resetForm();
    load();
  }

  async function toggleAvailable(p: Product) {
    const nowAvailable = p.available !== false;
    const res = await putJson(
      `/products/${p._id}`,
      { available: !nowAvailable },
      token,
    );
    if (!res.ok) {
      Alert.alert("Khalad", res.error);
      return;
    }
    load();
  }

  function confirmDelete(p: Product) {
    Alert.alert("Tirtir alaabta", `Ma hubtaa inaad tirtirto "${p.name}"?`, [
      { text: "Maya", style: "cancel" },
      {
        text: "Haa, tirtir",
        style: "destructive",
        onPress: async () => {
          const res = await deleteJson(`/products/${p._id}`, token);
          if (!res.ok) {
            Alert.alert("Khalad", res.error);
            return;
          }
          if (editingId === p._id) resetForm();
          load();
        },
      },
    ]);
  }

  const inputStyle = {
    backgroundColor: colors.card,
    color: colors.text,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(128,128,128,0.3)",
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    marginBottom: 10,
  } as const;

  const form = (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: 16,
        marginBottom: 18,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: "800",
          color: colors.text,
          marginBottom: 12,
        }}
      >
        {editingId ? "Beddel alaabta" : "Ku dar alaab cusub"}
      </Text>
      <TextInput
        value={pName}
        onChangeText={setPName}
        placeholder="Magaca alaabta"
        placeholderTextColor={colors.subtext}
        style={inputStyle}
      />
      <TextInput
        value={pDescription}
        onChangeText={setPDescription}
        placeholder="Sharaxaad (ikhtiyaari)"
        placeholderTextColor={colors.subtext}
        style={inputStyle}
      />
      <TextInput
        value={pPrice}
        onChangeText={setPPrice}
        placeholder="Qiimaha ($)"
        placeholderTextColor={colors.subtext}
        keyboardType="decimal-pad"
        style={inputStyle}
      />
      {!!formError && (
        <Text style={{ color: "#D32F2F", fontSize: 14, marginBottom: 10 }}>
          {formError}
        </Text>
      )}
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Pressable
          onPress={save}
          disabled={saving}
          style={{
            flex: 1,
            backgroundColor: colors.primary,
            borderRadius: 12,
            paddingVertical: 13,
            alignItems: "center",
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={{ color: "white", fontWeight: "700", fontSize: 15 }}>
              {editingId ? "Keydi isbeddelka" : "Ku dar"}
            </Text>
          )}
        </Pressable>
        {editingId && (
          <Pressable
            onPress={resetForm}
            style={{
              borderRadius: 12,
              paddingVertical: 13,
              paddingHorizontal: 18,
              alignItems: "center",
              borderWidth: 1,
              borderColor: "rgba(128,128,128,0.4)",
            }}
          >
            <Text
              style={{ color: colors.text, fontWeight: "600", fontSize: 15 }}
            >
              Jooji
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Stack.Screen
        options={{ title: companyName ? String(companyName) : "Alaabtayda" }}
      />

      {loading ? (
        <View style={{ marginTop: 40, alignItems: "center" }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : error ? (
        <View style={{ padding: 16, alignItems: "flex-start" }}>
          <Text style={{ fontSize: 16, color: "#D32F2F", marginBottom: 12 }}>
            {error}
          </Text>
          <Pressable
            onPress={load}
            style={{
              backgroundColor: colors.primary,
              paddingHorizontal: 18,
              paddingVertical: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>
              Isku day mar kale
            </Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ padding: 16, paddingBottom: 60 }}
          ListHeaderComponent={form}
          ListEmptyComponent={
            <Text style={{ fontSize: 15, color: colors.subtext }}>
              Weli alaab ma jirto. Kor ku dar tii ugu horreysay.
            </Text>
          }
          renderItem={({ item }) => {
            const available = item.available !== false;
            return (
              <View
                style={{
                  backgroundColor: colors.card,
                  borderRadius: 14,
                  padding: 14,
                  marginBottom: 12,
                  opacity: available ? 1 : 0.6,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flex: 1, marginRight: 10 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "700",
                        color: colors.text,
                      }}
                    >
                      {item.name}
                    </Text>
                    {!!item.description && (
                      <Text
                        style={{
                          fontSize: 13,
                          color: colors.subtext,
                          marginTop: 2,
                        }}
                      >
                        {item.description}
                      </Text>
                    )}
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "800",
                      color: colors.accent,
                    }}
                  >
                    ${item.price}
                  </Text>
                </View>

                {!available && (
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.subtext,
                      marginTop: 6,
                    }}
                  >
                    Waa qarsan yahay (macaamiisha ma arkaan)
                  </Text>
                )}

                <View style={{ flexDirection: "row", gap: 16, marginTop: 12 }}>
                  <Pressable onPress={() => startEdit(item)}>
                    <Text
                      style={{
                        color: colors.primary,
                        fontWeight: "700",
                        fontSize: 14,
                      }}
                    >
                      Beddel
                    </Text>
                  </Pressable>
                  <Pressable onPress={() => toggleAvailable(item)}>
                    <Text
                      style={{
                        color: colors.primary,
                        fontWeight: "700",
                        fontSize: 14,
                      }}
                    >
                      {available ? "Qari" : "Muuji"}
                    </Text>
                  </Pressable>
                  <Pressable onPress={() => confirmDelete(item)}>
                    <Text
                      style={{
                        color: "#D32F2F",
                        fontWeight: "700",
                        fontSize: 14,
                      }}
                    >
                      Tirtir
                    </Text>
                  </Pressable>
                </View>
              </View>
            );
          }}
        />
      )}
    </KeyboardAvoidingView>
  );
}
