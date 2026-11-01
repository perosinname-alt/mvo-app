import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { View } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import {
  ThemeProvider as AppThemeProvider,
  useAppTheme,
} from "@/context/ThemeContext";
import { WalletProvider } from "@/context/WalletContext";

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { isDark } = useAppTheme();
  const { token, loading } = useAuth();
  const isLoggedIn = !!token;

  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <CartProvider>
        <WalletProvider>
          <AnimatedSplashOverlay />
          {loading ? (
            <View style={{ flex: 1, backgroundColor: "#0B0F0D" }} />
          ) : (
            <Stack screenOptions={{ headerShown: false }}>
              {/* Screens only a logged-in user can open */}
              <Stack.Protected guard={isLoggedIn}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen
                  name="company/[type]"
                  options={{ headerShown: true }}
                />
                <Stack.Screen
                  name="create-company"
                  options={{
                    headerShown: true,
                    title: "Ganacsigaaga ku bilow",
                  }}
                />
                <Stack.Screen
                  name="my-companies"
                  options={{ headerShown: true, title: "Shirkadahayga" }}
                />
                <Stack.Screen
                  name="manage-products"
                  options={{ headerShown: true, title: "Alaabtayda" }}
                />
                <Stack.Screen
                  name="cart"
                  options={{ headerShown: true, title: "Cart-kaaga" }}
                />
                <Stack.Screen
                  name="checkout"
                  options={{ headerShown: true, title: "Checkout" }}
                />
                <Stack.Screen
                  name="settings"
                  options={{ headerShown: true, title: "Settings" }}
                />
                <Stack.Screen
                  name="order-tracking"
                  options={{ headerShown: true, title: "Raadraaca Dalabka" }}
                />
                <Stack.Screen
                  name="topup"
                  options={{ headerShown: true, title: "Ku shub" }}
                />
                <Stack.Screen
                  name="withdraw"
                  options={{ headerShown: true, title: "Ka bixi" }}
                />
                <Stack.Screen
                  name="manage-card"
                  options={{ headerShown: true, title: "Maamul Kaarka" }}
                />
                <Stack.Screen
                  name="transactions"
                  options={{ headerShown: true, title: "Taariikhda" }}
                />
              </Stack.Protected>

              {/* Screens for logged-out users */}
              <Stack.Protected guard={!isLoggedIn}>
                <Stack.Screen name="login" />
                <Stack.Screen name="register" />
                <Stack.Screen name="verify-code" />
                <Stack.Screen name="set-password" />
                <Stack.Screen name="success" />
                <Stack.Screen name="forgot-password" />
                <Stack.Screen name="pin-login" />
              </Stack.Protected>
            </Stack>
          )}
        </WalletProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </AppThemeProvider>
  );
}
