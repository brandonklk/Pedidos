import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React, { useEffect } from 'react';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import FlashMessage from "react-native-flash-message";

import Routes from './src/routes';

export default function App() {

  useEffect(() => {

    async function loadFonts() {
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });
    }

    loadFonts();
  }, []);

  return (
    <>      
      <Routes/>
      <FlashMessage floating={true} duration={4000} position="top" />
    </>
  );
}