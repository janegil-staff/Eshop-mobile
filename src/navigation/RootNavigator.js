import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './HomeStack';

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
}