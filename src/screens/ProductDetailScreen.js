import { useMemo } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import * as Haptics from 'expo-haptics';
import { useProduct } from '../hooks/useProducts';
import { useCartStore } from '../store/cartStore';
import { useTheme } from '../theme/ThemeProvider';
import { type as ty } from '../theme/typography';
import { getAvailability } from '../utils/availability';

export default function ProductDetailScreen({ route }) {
  const { id } = route.params;
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const addItem = useCartStore((s) => s.addItem);
  const { data: product, isLoading, isError } = useProduct(id);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }
  if (isError || !product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{t('products.error')}</Text>
      </View>
    );
  }

  const avail = getAvailability(product, t);
  const soldOut = !avail.available;
  const tint = product.category?.color || theme.surfaceAlt;

  const onAdd = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    addItem(product, 1);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.imageWrap, { backgroundColor: tint }]}>
        {!!product.image && (
          <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
        )}
      </View>
      <View style={styles.body}>
        <Text style={styles.name}>{product.name}</Text>
        {!!product.brand && (
          <Text style={styles.brand}>
            {t('products.brand')}: {product.brand}
          </Text>
        )}
        <Text style={styles.price}>{product.price} kr</Text>
        <Text style={[styles.stock, soldOut && styles.stockOut]}>
          {avail.label}
        </Text>

        {!!product.description && (
          <>
            <Text style={styles.sectionTitle}>{t('products.description')}</Text>
            <Text style={styles.description}>{product.description}</Text>
          </>
        )}

        <TouchableOpacity
          style={[styles.cartBtn, soldOut && styles.cartBtnDisabled]}
          disabled={soldOut}
          onPress={onAdd}
          activeOpacity={0.85}
        >
          <Text style={styles.cartBtnText}>{t('products.addToCart')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const makeStyles = (theme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    centered: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.background,
    },
    imageWrap: { width: '100%', height: 320 },
    image: { width: '100%', height: '100%' },
    body: { padding: 16 },
    name: { ...ty.h1, color: theme.text },
    brand: { ...ty.body, color: theme.textMuted, marginTop: 4 },
    price: { ...ty.priceLarge, color: theme.price, marginTop: 12 },
    stock: { ...ty.body, fontSize: 14, color: theme.inStock, marginTop: 6 },
    stockOut: { color: theme.outStock },
    sectionTitle: { ...ty.h2, color: theme.text, marginTop: 20, marginBottom: 6 },
    description: { ...ty.body, color: theme.text },
    cartBtn: {
      backgroundColor: theme.primary,
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 28,
    },
    cartBtnDisabled: { backgroundColor: theme.border },
    cartBtnText: { ...ty.title, fontSize: 16, color: theme.primaryText },
  });