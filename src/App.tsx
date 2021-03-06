import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import theme from '@styles/theme';
import { NavigationContainer } from '@react-navigation/native';
import { Routes } from './routes';

import { StorageProvider } from '@hooks/storage';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar backgroundColor={theme.colors.primary} />
      <StorageProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </StorageProvider>
    </ThemeProvider>
  );
}
