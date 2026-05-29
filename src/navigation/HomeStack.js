import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import ProductListScreen from "../screens/ProductListScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import ThemeToggle from "../components/ThemeToggle";
import { useTheme } from "../theme/ThemeProvider";
import { fonts } from "../theme/typography";
import CheckoutScreen from "../screens/CheckoutScreen";
import OrderConfirmationScreen from "../screens/OrderConfirmationScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.surface },
        headerTintColor: theme.text,
        headerTitleStyle: { fontFamily: fonts.sansMedium },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: theme.background },
        headerRight: () => <ThemeToggle />,
      }}
    >
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ title: t("products.title") }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ title: t("checkout.title") }}
      />
      <Stack.Screen
        name="OrderConfirmation"
        component={OrderConfirmationScreen}
        options={{ title: "", headerBackVisible: false, gestureEnabled: false }}
      />
    </Stack.Navigator>
  );
}
