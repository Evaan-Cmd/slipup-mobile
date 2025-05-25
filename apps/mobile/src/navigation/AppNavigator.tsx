import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home, Camera, FileText, Settings } from 'lucide-react-native'
import { colors } from '@slipup/ui-kit'

// Screen imports
import DashboardScreen from '../screens/DashboardScreen'
import CameraScreen from '../screens/CameraScreen'
import SlipsScreen from '../screens/SlipsScreen'

const Tab = createBottomTabNavigator()

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let IconComponent = Home

            if (route.name === 'Dashboard') {
              IconComponent = Home
            } else if (route.name === 'Camera') {
              IconComponent = Camera
            } else if (route.name === 'Slips') {
              IconComponent = FileText
            }

            return <IconComponent size={size} color={color} />
          },
          tabBarActiveTintColor: colors.primary[500],
          tabBarInactiveTintColor: colors.gray[400],
          tabBarStyle: {
            backgroundColor: colors.white,
            borderTopColor: colors.gray[200],
            borderTopWidth: 1,
            paddingTop: 8,
            paddingBottom: 8,
            height: 70,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
            marginTop: 4,
          },
          headerStyle: {
            backgroundColor: colors.white,
            borderBottomColor: colors.gray[200],
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: '600',
            color: colors.gray[900],
          },
        })}
      >
        <Tab.Screen 
          name="Dashboard" 
          component={DashboardScreen}
          options={{
            title: 'Dashboard',
            headerShown: true,
          }}
        />
        <Tab.Screen 
          name="Camera" 
          component={CameraScreen}
          options={{
            title: 'Camera',
            headerShown: false, // Camera screen manages its own header
          }}
        />
        <Tab.Screen 
          name="Slips" 
          component={SlipsScreen}
          options={{
            title: 'Slips',
            headerShown: true,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
} 