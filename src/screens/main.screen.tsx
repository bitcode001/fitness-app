/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {View, StyleSheet, Animated, Dimensions} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import HomeScreen from './Home/home.screen';
import ProfileScreen from './Profile/profile.screen';
import PerformanceScreen from './Performance/performance.screen';

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

const GenIcon = (focused: boolean, name: string) => (
  <View className="d-flex flex-col h-full absolute top-1/2">
    <MaterialIcon
      name={name}
      size={30}
      color={focused ? '#e32f45' : '#748c94'}
    />
  </View>
);

const getWidth = () => {
  let width = Dimensions.get('window').width;

  width = width - 40;

  return width / 3;
};

export default function MainScreen(): JSX.Element {
  const tabOffsetValue = React.useRef(new Animated.Value(getWidth())).current;
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: 40,
            left: 20,
            right: 20,
            height: 70,
            borderRadius: 15,
            ...styles.shadow,
          },
        }}>
        <Tab.Screen
          name="Performance"
          component={PerformanceScreen}
          options={{
            tabBarIcon: ({focused}) => GenIcon(focused, 'poll'),
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused}) => GenIcon(focused, 'home'),
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({focused}) => GenIcon(focused, 'account'),
          }}
          listeners={({navigation, route}) => ({
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
      </Tab.Navigator>
      <Animated.View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          position: 'absolute',
          bottom: 40,
          left: 40,
          height: 2,
          width: getWidth() - 40,
          backgroundColor: 'red',
          transform: [
            {
              translateX: tabOffsetValue,
            },
          ],
        }}
      />
    </>
  );
}
