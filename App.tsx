import App from './src';

import { LogBox } from 'react-native';
import ignoreWarnings from 'ignore-warnings';

console.disableYellowBox = true;
LogBox.ignoreAllLogs();


ignoreWarnings('warn',['ViewPropTypes','[react-native-gesture-handler]'])

// LogBox.ignoreLogs([
// 	'ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from \'deprecated-react-native-prop-types\'.',
// 	'NativeBase: The contrast ratio of',
// 	"[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
// ])

export default App;
