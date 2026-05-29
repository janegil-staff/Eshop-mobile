import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from './src/navigation/RootNavigator';
import './src/i18n';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 60000 } },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="light" />
      <RootNavigator />
    </QueryClientProvider>
  );
}