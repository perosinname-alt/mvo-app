import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { AnimatedSplashOverlay } from "@/components/animated-icon";
import { CartProvider } from "@/context/CartContext";
import {
  ThemeProvider as AppThemeProvider,
  useAppTheme,
} from "@/context/ThemeContext";
import { WalletProvider } from "@/context/WalletContext";

SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const { isDark } = useAppTheme();
  return (
    <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
      <CartProvider>
        <WalletProvider>
          <AnimatedSplashOverlay />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen
              name="company/[type]"
              options={{ headerShown: true }}
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
            <Stack.Screen name="pin-login" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen name="verify-code" options={{ headerShown: false }} />
            <Stack.Screen
              name="set-password"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="success" options={{ headerShown: false }} />
            <Stack.Screen
              name="forgot-password"
              options={{ headerShown: false }}
            />
          </Stack>
        </WalletProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <RootNavigator />
    </AppThemeProvider>
  );
}
