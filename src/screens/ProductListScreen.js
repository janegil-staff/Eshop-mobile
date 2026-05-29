import { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useProducts } from '../hooks/useProducts';
import { useAuthStore } from '../store/authStore';
import { colors } from '../theme/colors';

function ProductCard({ product, onPress, t }) {
  const soldOut = product.countInStock <= 0;
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image
        source={{ uri: product.image || undefined }}
        style={styles.cardImage}
        resizeMode="cover"
      />
      <View style={styles.cardBody}>
        <Text style={styles.cardName} numberOfLines={1}>
          {product.name}
        </Text>
        {!!product.brand && (
          <Text style={styles.cardBrand} numberOfLines={1}>
            {product.brand}
          </Text>
        )}
        <View style={styles.cardFooter}>
          <Text style={styles.cardPrice}>{product.price} kr</Text>
          <Text style={[styles.stock, soldOut && styles.stockOut]}>
            {soldOut ? t('products.outOfStock') : t('products.inStock')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function ProductListScreen({ navigation }) {
  const { t } = useTranslation();
  const hydrate = useAuthStore((s) => s.hydrate);
  const { data: products, isLoading, isError, refetch, isRefetching } =
    useProducts();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.muted}>{t('products.loading')}</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{t('products.error')}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={() => refetch()}>
          <Text style={styles.retryText}>{t('products.retry')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id || item._id}
      contentContainerStyle={styles.list}
      numColumns={2}
      columnWrapperStyle={styles.row}
      onRefresh={refetch}
      refreshing={isRefetching}
      ListEmptyComponent={
        <Text style={styles.muted}>{t('products.empty')}</Text>
      }
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          t={t}
          onPress={() =>
            navigation.navigate('ProductDetail', { id: item.id || item._id })
          }
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: 24,
  },
  list: { padding: 8, backgroundColor: colors.background },
  row: { justifyContent: 'space-between' },
  card: {
    flex: 1,
    margin: 6,
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardImage: { width: '100%', height: 140, backgroundColor: colors.border },
  cardBody: { padding: 10 },
  cardName: { fontSize: 14, fontWeight: '600', color: colors.text },
  cardBrand: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  cardPrice: { fontSize: 15, fontWeight: '700', color: colors.price },
  stock: { fontSize: 11, color: colors.price },
  stockOut: { color: colors.danger },
  muted: { color: colors.textMuted, marginTop: 12, textAlign: 'center' },
  errorText: { color: colors.danger, fontSize: 16, marginBottom: 16 },
  retryBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: { color: '#fff', fontWeight: '600' },
});