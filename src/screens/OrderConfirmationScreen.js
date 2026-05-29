import { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/ThemeProvider';
import { type as ty } from '../theme/typography';

export default function OrderConfirmationScreen({ route, navigation }) {
  const { order } = route.params || {};
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const orderId = order ? String(order.id || order._id).slice(-6) : '';

  return (
    <View style={styles.container}>
      <View style={styles.check}>
        <Text style={styles.checkMark}>✓</Text>
      </View>
      <Text style={styles.title}>{t('confirmation.title')}</Text>
      <Text style={styles.body}>{t('confirmation.body')}</Text>
      {!!orderId && (
        <Text style={styles.orderNo}>
          {t('confirmation.orderNumber')} <Text style={styles.orderNoMono}>#{orderId}</Text>
        </Text>
      )}
      <Text style={styles.shipNote}>{t('confirmation.shipping')}</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('HomeTab')}
      >
        <Text style={styles.btnText}>{t('confirmation.continue')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const makeStyles = (theme) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.background, alignItems: 'center', justifyContent: 'center', padding: 28 },
    check: {
      width: 76, height: 76, borderRadius: 38, backgroundColor: theme.inStock,
      alignItems: 'center', justifyContent: 'center', marginBottom: 22,
    },
    checkMark: { color: '#fff', fontSize: 40, fontWeight: '700' },
    title: { ...ty.h1, color: theme.text, textAlign: 'center' },
    body: { ...ty.body, color: theme.textMuted, textAlign: 'center', marginTop: 10 },
    orderNo: { ...ty.body, color: theme.text, marginTop: 18 },
    orderNoMono: { ...ty.price, color: theme.primary },
    shipNote: { ...ty.label, color: theme.textMuted, textAlign: 'center', marginTop: 8 },
    btn: { backgroundColor: theme.primary, paddingHorizontal: 32, paddingVertical: 14, borderRadius: 10, marginTop: 32 },
    btnText: { ...ty.title, fontSize: 16, color: theme.primaryText },
  });