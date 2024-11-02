import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import CustomDrawerContent from './CustomDrawerContent';
import EventScreen from '../../screens/Home/EventScreen';
import Dashboard from '../../screens/Dashboard/Dashboard';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const navigation = useNavigation();

  return (
    <Drawer.Navigator
      initialRouteName="EventScreen"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        swipeEnabled: false, // Disable swipe gestures for drawer
      }}>
      <Drawer.Screen
        name="Event Screen"
        component={EventScreen}
        options={{drawerItemStyle: {display: 'none'}}}
      />
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          drawerItemStyle: {display: 'none'},
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
