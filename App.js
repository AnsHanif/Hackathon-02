import React from 'react'
import { View, Text,StatusBar } from 'react-native'
import AuthContextProvider from './src/contexts/AuthContext'
import AppNavigator from './src/navigation/AppNavigator'


export default function App() {
  return (
    <>
    <StatusBar barStyle={"light-content"} backgroundColor="#4286f4" />
    <AuthContextProvider>
    <AppNavigator />
    </AuthContextProvider>
    </>
  )
}