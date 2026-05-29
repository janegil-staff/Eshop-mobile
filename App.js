import { useCallback } from "react";
import { View } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";

import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_700Bold,
} from "@expo-google-fonts/space-grotesk";
import { JetBrainsMono_500Medium } from "@expo-google-fonts/jetbrains-mono";
import { ThemeProvider, useTheme } from "./src/theme/ThemeProvider";
import RootNavigator from "./src/navigation/RootNavigator";
import { ENV } from "./src/config/env";
import "./src/i18n";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 60000 } },
});

function ThemedApp() {
  const { theme, effectiveMode, hydrated } = useTheme();
  if (!hydrated) {
    return <View style={{ flex: 1, backgroundColor: theme.background }} />;
  }
  return (
    <>
      <StatusBar style={effectiveMode === "dark" ? "light" : "dark"} />
      <RootNavigator />
    </>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_700Bold,
    JetBrainsMono_500Medium,
  });

  const onReady = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <View style={{ flex: 1 }} onLayout={onReady}>
          <ThemedApp />
        </View>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
