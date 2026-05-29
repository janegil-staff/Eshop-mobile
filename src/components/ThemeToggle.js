import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export default function ThemeToggle() {
  const { theme, effectiveMode, toggleTheme } = useTheme();
  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={[styles.btn, { backgroundColor: theme.surfaceAlt }]}
      hitSlop={8}
    >
      <Text style={[styles.icon, { color: theme.text }]}>
        {effectiveMode === 'dark' ? '☀︎' : '☾'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 16 },
});