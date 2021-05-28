import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import globalCSS from '../../globalCSS';

interface IScanner {
  addNewProductOfCart: Function
}

export default function Scanner(props: IScanner) {
  const [hasPermission, setHasPermission] = useState<Boolean | null>(null);
  //const [valueQr, setValueQr] = useState<string>('');
  const [scanned, setScanned] = useState(false);

  const { addNewProductOfCart } = props;

  useEffect(() => {
    cameraIsPermission();
  }, []);

  const cameraIsPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  }

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    addNewProductOfCart(data);
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão de câmera.</Text>;
  }
  
  if (!hasPermission) {
    return <Text>Acesso a câmera não autorizado.</Text>;
  }

  return (
    <View style={globalCSS.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title="Toque para digitalizar novamente" onPress={() => setScanned(false)} />}
    </View>
  );
}
