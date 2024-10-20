/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux'; // Import Provider
import {store} from './src/redux/store';

// Register the main app component
const MainApp = () => (
  <Provider store={store}>
    {/* Wrap App with Provider */}
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => MainApp);
