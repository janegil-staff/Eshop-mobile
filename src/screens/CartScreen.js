import { useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useCartStore } from '../store/cartStore';
import { useTheme } from '../theme/ThemeProvider';
import { type as ty } from '../theme/typography';

function QtyButton({ label, onPress, styles }) {
  return (
    <TouchableOpacity style={styles.qtyBtn} onPress={onPress} hitSlop={8}>
      <Text style={styles.qtyBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function CartScreen({ navigation }) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const total = useCartStore((s) => s.total());

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>{t('cart.empty')}</Text>
        <TouchableOpacity
          style={styles.shopBtn}
          onPress={() => navigation.navigate('HomeTab')}
        >
          <Text style={styles.shopBtnText}>{t('cart.startShopping')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderItem = ({ item }) => {
    const id = item.product.id || item.product._id;
    const tint = item.product.category?.color || theme.surfaceAlt;
    return (
      <View style={styles.row}>
        <View style={[styles.thumb, { backgroundColor: tint }]}>
          {!!item.product.image && (
            <Image source={{ uri: item.product.image }} style={styles.thumbImg} />
          )}
        </View>
        <View style={styles.rowBody}>
          <Text style={styles.name} numberOfLines={1}>{item.product.name}</Text>
          <Text style={styles.price}>{item.product.price} kr</Text>
          <View style={styles.qtyRow}>
            <QtyButton label="−" styles={styles} onPress={() => setQuantity(id, item.quantity - 1)} />
            <Text style={styles.qtyValue}>{item.quantity}</Text>
            <QtyButton label="+" styles={styles} onPress={() => setQuantity(id, item.quantity + 1)} />
            <TouchableOpacity onPress={() => removeItem(id)} style={styles.remove}>
              <Text style={styles.removeText}>{t('cart.remove')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.lineTotal}>{item.product.price * item.quantity} kr</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(i) => i.product.id || i.product._id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 14 }}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
      />
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>{t('cart.total')}</Text>
          <Text style={styles.totalValue}>{total} kr</Text>
        </View>
        <Text style={styles.shippingNote}>{t('cart.freeShipping')}</Text>
        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => navigation.navigate('Checkout')}
        >
          <Text style={styles.checkoutText}>{t('cart.checkout')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const makeStyles = (theme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    empty: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.background, padding: 24 },
    emptyText: { ...ty.h2, color: theme.textMuted, marginBottom: 20 },
    shopBtn: { backgroundColor: theme.primary, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 8 },
    shopBtnText: { ...ty.title, color: theme.primaryText },
    row: { flexDirection: 'row', alignItems: 'center' },
    thumb: { width: 64, height: 64, borderRadius: 10, overflow: 'hidden' },
    thumbImg: { width: '100%', height: '100%' },
    rowBody: { flex: 1, marginLeft: 12 },
    name: { ...ty.title, color: theme.text },
    price: { ...ty.price, color: theme.textMuted, fontSize: 13, marginTop: 2 },
    qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
    qtyBtn: {
      width: 28, height: 28, borderRadius: 6, borderWidth: 0.5, borderColor: theme.border,
      alignItems: 'center', justifyContent: 'center', backgroundColor: theme.surface,
    },
    qtyBtnText: { ...ty.title, fontSize: 16, color: theme.text },
    qtyValue: { ...ty.price, color: theme.text, marginHorizontal: 14, minWidth: 18, textAlign: 'center' },
    remove: { marginLeft: 'auto' },
    removeText: { ...ty.label, color: theme.danger },
    lineTotal: { ...ty.price, color: theme.text, marginLeft: 10 },
    sep: { height: 14 },
    footer: { borderTopWidth: 0.5, borderTopColor: theme.border, padding: 16, backgroundColor: theme.surface },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    totalLabel: { ...ty.h2, color: theme.text },
    totalValue: { ...ty.priceLarge, color: theme.text },
    shippingNote: { ...ty.label, color: theme.inStock, marginTop: 4 },
    checkoutBtn: { backgroundColor: theme.primary, paddingVertical: 15, borderRadius: 10, alignItems: 'center', marginTop: 14 },
    checkoutText: { ...ty.title, fontSize: 16, color: theme.primaryText },
  });