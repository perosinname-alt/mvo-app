import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import { useAppTheme } from "@/context/ThemeContext";

const LAST_ORDER = {
  company: "Xalwo Kismaayo",
  items: "Halwo (500g) x1, Halwo (1kg) x1",
  total: 14,
  stepIndex: 1, // 0 = Diyaarsan, 1 = Socda, 2 = La geeyay
  active: true,
};
const ORDER_STEPS = ["Diyaarsan", "Socda", "La geeyay"];

const PAST_ORDERS = [
  {
    id: "o1",
    company: "Xalwo Kismaayo",
    items: "Sonkor (1kg) x2",
    total: 4,
    date: "3 maalmood ka hor",
    status: "La geeyay",
  },
  {
    id: "o2",
    company: "Garowe Market",
    items: "Halwo (500g) x3",
    total: 15,
    date: "1 toddobaad ka hor",
    status: "La geeyay",
  },
];

export default function OrdersScreen() {
  const router = useRouter();
  const { colors } = useAppTheme();

  const cardShadow = {
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
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
        Dalabyadaada
      </Text>

      {/* Active order */}
      {LAST_ORDER.active && (
        <>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "700",
              color: colors.text,
              marginBottom: 10,
            }}
          >
            Hadda socota
          </Text>
          <Pressable
            onPress={() => router.push("/order-tracking")}
            style={{
              backgroundColor: colors.card,
              borderRadius: 16,
              padding: 16,
              marginBottom: 26,
              ...cardShadow,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 14,
              }}
            >
              <View style={{ flex: 1, marginRight: 12 }}>
                <Text
                  style={{
                    fontSize: 15.5,
                    fontWeight: "700",
                    color: colors.text,
                  }}
                >
                  {LAST_ORDER.company}
                </Text>
                <Text
                  style={{
                    fontSize: 12.5,
                    color: colors.subtext,
                    marginTop: 3,
                  }}
                >
                  {LAST_ORDER.items}
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "800",
                  color: colors.accent,
                }}
              >
                ${LAST_ORDER.total}
              </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {ORDER_STEPS.map((step, index) => {
                const done = index <= LAST_ORDER.stepIndex;
                return (
                  <View
                    key={step}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      flex: index < ORDER_STEPS.length - 1 ? 1 : 0,
                    }}
                  >
                    <View style={{ alignItems: "center" }}>
                      <View
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: 11,
                          backgroundColor: done
                            ? colors.primary
                            : colors.border,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {done && (
                          <Text
                            style={{
                              color: "white",
                              fontSize: 11,
                              fontWeight: "800",
                            }}
                          >
                            ✓
                          </Text>
                        )}
                      </View>
                      <Text
                        style={{
                          fontSize: 10.5,
                          marginTop: 4,
                          fontWeight:
                            index === LAST_ORDER.stepIndex ? "700" : "500",
                          color: done ? colors.accent : colors.subtext,
                        }}
                      >
                        {step}
                      </Text>
                    </View>
                    {index < ORDER_STEPS.length - 1 && (
                      <View
                        style={{
                          flex: 1,
                          height: 3,
                          marginHorizontal: 6,
                          marginBottom: 16,
                          borderRadius: 2,
                          backgroundColor:
                            index < LAST_ORDER.stepIndex
                              ? colors.primary
                              : colors.border,
                        }}
                      />
                    )}
                  </View>
                );
              })}
            </View>
          </Pressable>
        </>
      )}

      {/* Order history */}
      <Text
        style={{
          fontSize: 15,
          fontWeight: "700",
          color: colors.text,
          marginBottom: 10,
        }}
      >
        Taariikhda dalabyada
      </Text>
      {PAST_ORDERS.map((order) => (
        <View
          key={order.id}
          style={{
            backgroundColor: colors.card,
            borderRadius: 14,
            padding: 16,
            marginBottom: 12,
            ...cardShadow,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 4,
            }}
          >
            <Text
              style={{ fontSize: 14.5, fontWeight: "700", color: colors.text }}
            >
              {order.company}
            </Text>
            <Text
              style={{
                fontSize: 14.5,
                fontWeight: "800",
                color: colors.accent,
              }}
            >
              ${order.total}
            </Text>
          </View>
          <Text
            style={{ fontSize: 12.5, color: colors.subtext, marginBottom: 6 }}
          >
            {order.items}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 11.5, color: colors.subtext }}>
              {order.date}
            </Text>
            <View
              style={{
                backgroundColor: colors.primarySoft,
                borderRadius: 10,
                paddingHorizontal: 10,
                paddingVertical: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 11,
                  color: colors.accent,
                  fontWeight: "700",
                }}
              >
                {order.status}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
