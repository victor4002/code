import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json'; // Ensure app.json is in the same directory

AppRegistry.registerComponent(appName, () => App);