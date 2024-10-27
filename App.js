  import React, { useEffect, useState, useRef } from 'react';
  import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
  import YouTubeIframe from 'react-native-youtube-iframe';
  import { NavigationContainer } from '@react-navigation/native';
  import { createDrawerNavigator } from '@react-navigation/drawer';
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
  import axios from 'axios';
  import * as Progress from 'react-native-progress';
  import CourseScreen from './src/Screen/CourseScreen';
  import ProfileScreen from './src/Screen/ProfileScreen';
  import Icon from 'react-native-vector-icons/MaterialIcons';

  const JSON_URL = 'https://theharshkonda.github.io/Server002/JavaSpring.json';
  const { width } = Dimensions.get('window');

  const  Drawer = createDrawerNavigator();
  const Tab = createBottomTabNavigator();
  const DomainScreen = ({ domain }) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{domain} Courses</Text>
    </View>
  );

  const SkillScreen = ({ skill }) => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{skill} Courses</Text>
    </View>
  );

  const BottomTabNavigator = () => (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
  
          if (route.name === 'Course') {
            iconName = focused ? 'school' : 'school';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
  
          // You can return any component that you like here
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Course" 
        component={CourseScreen} 
        options={{
          headerShown: false,
          tabBarLabel: 'Courses'
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          headerShown: false,
          tabBarLabel: 'Profile'
        }} 
      />
    </Tab.Navigator>
  );

  const App = () => {
    return (
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="Home" component={BottomTabNavigator} />
          <Drawer.Screen name="Frontend Developer" component={() => <DomainScreen domain="Frontend Developer" />} />
          <Drawer.Screen name="Backend Developer" component={() => <DomainScreen domain="Backend Developer" />} />
          <Drawer.Screen name="Fullstack Developer" component={() => <DomainScreen domain="Fullstack Developer" />} />
          <Drawer.Screen name="DevOps / SRE / Cloud Engineer" component={() => <DomainScreen domain="DevOps / SRE / Cloud Engineer" />} />
          <Drawer.Screen name="QA / Automation Testing Engineer" component={() => <DomainScreen domain="QA / Automation Testing Engineer" />} />
          <Drawer.Screen name="Data Engineer / Big Data" component={() => <DomainScreen domain="Data Engineer / Big Data" />} />
          <Drawer.Screen name="Cybersecurity Engineer" component={() => <DomainScreen domain="Cybersecurity Engineer" />} />
          <Drawer.Screen name="Engineering Manager" component={() => <DomainScreen domain="Engineering Manager" />} />
          <Drawer.Screen name="Data Scientist / AI/ML" component={() => <DomainScreen domain="Data Scientist / AI/ML" />} />
          <Drawer.Screen name="Data Analyst" component={() => <DomainScreen domain="Data Analyst" />} />
          <Drawer.Screen name="UI/UX Designer" component={() => <DomainScreen domain="UI/UX Designer" />} />
          <Drawer.Screen name="Python" component={() => <SkillScreen skill="Python" />} />
          <Drawer.Screen name="Java" component={() => <SkillScreen skill="Java" />} />
          <Drawer.Screen name="Software Testing" component={() => <SkillScreen skill="Software Testing" />} />
          <Drawer.Screen name="C#" component={() => <SkillScreen skill="C#" />} />
          <Drawer.Screen name="DSA" component={() => <SkillScreen skill="DSA" />} />
          <Drawer.Screen name="Angular" component={() => <SkillScreen skill="Angular" />} />
          <Drawer.Screen name="React" component={() => <SkillScreen skill="React" />} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  };
  
  export default App;
