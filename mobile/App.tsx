
import React from 'react';
import FlashMessage from "react-native-flash-message";

import Routes from './src/routes';

export default function App() {
  return (
    <>
      <FlashMessage position="top"/>
      <Routes/>
    </>
  );
}