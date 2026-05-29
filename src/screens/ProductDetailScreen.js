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
import { useProduct } from '../hooks/useProducts';
import { colors } from '../theme/colors';

export default function ProductDetailScreen({ route }) {
  const { id } = route.params;
  const { t } = useTranslation();
  const { data: product, isLoading, isError } = useProduct(id);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
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

  const soldOut = product.countInStock <= 0;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: product.image || undefined }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.body}>
        <Text style={styles.name}>{product.name}</Text>
        {!!product.brand && (
          <Text style={styles.brand}>
            {t('products.brand')}: {product.brand}
          </Text>
        )}
        <Text style={styles.price}>{product.price} kr</Text>

        <Text style={[styles.stock, soldOut && styles.stockOut]}>
          {soldOut ? t('products.outOfStock') : t('products.inStock')}
        </Text>

        {!!product.description && (
          <>
            <Text style={styles.sectionTitle}>
              {t('products.description')}
            </Text>
            <Text style={styles.description}>{product.description}</Text>
          </>
        )}

        <TouchableOpacity
          style={[styles.cartBtn, soldOut && styles.cartBtnDisabled]}
          disabled={soldOut}
        >
          <Text style={styles.cartBtnText}>{t('products.addToCart')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.surface },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: 320, backgroundColor: colors.border },
  body: { padding: 16 },
  name: { fontSize: 22, fontWeight: '700', color: colors.text },
  brand: { fontSize: 14, color: colors.textMuted, marginTop: 4 },
  price: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.price,
    marginTop: 12,
  },
  stock: { fontSize: 14, color: colors.price, marginTop: 6 },
  stockOut: { color: colors.danger },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginTop: 20,
    marginBottom: 6,
  },
  description: { fontSize: 15, lineHeight: 22, color: colors.text },
  cartBtn: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 28,
  },
  cartBtnDisabled: { backgroundColor: colors.border },
  cartBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});