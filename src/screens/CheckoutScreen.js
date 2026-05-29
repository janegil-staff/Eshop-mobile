import { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useCheckout } from '../hooks/useCheckout';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useTheme } from '../theme/ThemeProvider';
import { type as ty } from '../theme/typography';

function Field({ label, value, onChangeText, styles, ...props }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={styles._muted.color}
        {...props}
      />
    </View>
  );
}

export default function CheckoutScreen({ navigation }) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);
  const { pay, loading } = useCheckout();
  const total = useCartStore((s) => s.total());
  const user = useAuthStore((s) => s.user);

  const [form, setForm] = useState({
    shippingAddress1: '',
    shippingAddress2: '',
    city: user?.city || '',
    zip: user?.zip || '',
    country: user?.country || '',
    phone: user?.phone || '',
  });

  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const onPay = async () => {
    const required = ['shippingAddress1', 'city', 'zip', 'country', 'phone'];
    const missing = required.filter((k) => !form[k]?.trim());
    if (missing.length) {
      Alert.alert(t('checkout.missingTitle'), t('checkout.missingBody'));
      return;
    }

    const res = await pay({ ...form, user: user?.id });
    if (res.order) {
      navigation.replace('OrderConfirmation', { order: res.order });
    } else if (res.error) {
      Alert.alert(t('checkout.failedTitle'), res.error);
    }
    // canceled => stay on screen
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.section}>{t('checkout.shipping')}</Text>

      <Field label={t('checkout.address1')} value={form.shippingAddress1} onChangeText={set('shippingAddress1')} styles={styles} />
      <Field label={t('checkout.address2')} value={form.shippingAddress2} onChangeText={set('shippingAddress2')} styles={styles} />
      <View style={styles.rowFields}>
        <View style={{ flex: 1, marginRight: 8 }}>
          <Field label={t('checkout.zip')} value={form.zip} onChangeText={set('zip')} keyboardType="numbers-and-punctuation" styles={styles} />
        </View>
        <View style={{ flex: 2 }}>
          <Field label={t('checkout.city')} value={form.city} onChangeText={set('city')} styles={styles} />
        </View>
      </View>
      <Field label={t('checkout.country')} value={form.country} onChangeText={set('country')} styles={styles} />
      <Field label={t('checkout.phone')} value={form.phone} onChangeText={set('phone')} keyboardType="phone-pad" styles={styles} />

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>{t('cart.total')}</Text>
          <Text style={styles.summaryValue}>{total} kr</Text>
        </View>
        <Text style={styles.freeShip}>{t('cart.freeShipping')}</Text>
      </View>

      <TouchableOpacity style={styles.payBtn} onPress={onPay} disabled={loading}>
        {loading ? (
          <ActivityIndicator color={theme.primaryText} />
        ) : (
          <Text style={styles.payText}>{t('checkout.payNow', { total })}</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.secure}>{t('checkout.secureNote')}</Text>
    </ScrollView>
  );
}

const makeStyles = (theme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background },
    section: { ...ty.h2, color: theme.text, marginBottom: 14 },
    field: { marginBottom: 14 },
    label: { ...ty.label, color: theme.textMuted, marginBottom: 6 },
    input: {
      backgroundColor: theme.surface, borderWidth: 0.5, borderColor: theme.border,
      borderRadius: 8, paddingHorizontal: 12, paddingVertical: 11, ...ty.body, color: theme.text,
    },
    _muted: { color: theme.textMuted },
    rowFields: { flexDirection: 'row' },
    summary: {
      backgroundColor: theme.surface, borderWidth: 0.5, borderColor: theme.border,
      borderRadius: 10, padding: 16, marginTop: 6, marginBottom: 18,
    },
    summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    summaryLabel: { ...ty.h2, color: theme.text },
    summaryValue: { ...ty.priceLarge, color: theme.text },
    freeShip: { ...ty.label, color: theme.inStock, marginTop: 4 },
    payBtn: { backgroundColor: theme.primary, paddingVertical: 16, borderRadius: 10, alignItems: 'center' },
    payText: { ...ty.title, fontSize: 16, color: theme.primaryText },
    secure: { ...ty.label, color: theme.textMuted, textAlign: 'center', marginTop: 12 },
  });