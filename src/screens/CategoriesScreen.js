import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/ThemeProvider';
import { type as ty } from '../theme/typography';

export default function CategoriesScreen() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  return (
    <View style={[styles.c, { backgroundColor: theme.background }]}>
      <Text style={[ty.h2, { color: theme.textMuted }]}>{t('tabs.categories')}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  c: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});