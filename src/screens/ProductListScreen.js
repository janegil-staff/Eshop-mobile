import { useEffect, useMemo } from 'react';
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
import { useTheme } from '../theme/ThemeProvider';
import { type as ty } from '../theme/typography';
import { getAvailability } from '../utils/availability';

function tintFor(theme, item, index) {
  return item.category?.color || theme.tints[index % theme.tints.length];
}

function ProductCard({ product, index, onPress, t, styles, theme }) {
  const avail = getAvailability(product, t);
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View
        style={[styles.imageWrap, { backgroundColor: tintFor(theme, product, index) }]}
      >
        {!!product.image && (
          <Image
            source={{ uri: product.image }}
            style={styles.cardImage}
            resizeMode="cover"
          />
        )}
      </View>
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
          <Text
            style={[styles.stock, !avail.available && styles.stockOut]}
            numberOfLines={1}
          >
            {avail.label}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function ProductListScreen({ navigation }) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const hydrate = useAuthStore((s) => s.hydrate);
  const { data: products, isLoading, isError, refetch, isRefetching } =
    useProducts();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.primary} />
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
      ListEmptyComponent={<Text style={styles.muted}>{t('products.empty')}</Text>}
      renderItem={({ item, index }) => (
        <ProductCard
          product={item}
          index={index}
          t={t}
          styles={styles}
          theme={theme}
          onPress={() =>
            navigation.navigate('ProductDetail', { id: item.id || item._id })
          }
        />
      )}
    />
  );
}

const makeStyles = (theme) =>
  StyleSheet.create({
    centered: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.background,
      padding: 24,
    },
    list: { padding: 8, backgroundColor: theme.background, flexGrow: 1 },
    row: { justifyContent: 'space-between' },
    card: {
      flex: 1,
      margin: 6,
      backgroundColor: theme.surface,
      borderRadius: 14,
      overflow: 'hidden',
      borderWidth: 0.5,
      borderColor: theme.border,
    },
    imageWrap: { width: '100%', height: 130 },
    cardImage: { width: '100%', height: '100%' },
    cardBody: { padding: 11 },
    cardName: { ...ty.title, color: theme.text },
    cardBrand: { ...ty.label, color: theme.textMuted, marginTop: 2 },
    cardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
    },
    cardPrice: { ...ty.price, color: theme.price },
    stock: { ...ty.label, fontSize: 11, color: theme.inStock, flexShrink: 1, textAlign: 'right' },
    stockOut: { color: theme.outStock },
    muted: { ...ty.body, color: theme.textMuted, marginTop: 12, textAlign: 'center' },
    errorText: { ...ty.h2, color: theme.danger, marginBottom: 16 },
    retryBtn: {
      backgroundColor: theme.primary,
      paddingHorizontal: 24,
      paddingVertical: 10,
      borderRadius: 8,
    },
    retryText: { ...ty.title, color: theme.primaryText },
  });