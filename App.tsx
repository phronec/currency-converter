import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ConversionScreen from './screens/ConversionScreen';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar barStyle="dark-content" />
        <AppContent />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  return <ConversionScreen />;
}

export default App;
