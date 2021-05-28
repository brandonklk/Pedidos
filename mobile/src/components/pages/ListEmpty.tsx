import { View, Text } from 'native-base';
import React from 'react';
import { ListEmptyInterface } from '../../interfaces/components/ListEmpty-Interface';
import { AntDesign } from '@expo/vector-icons'; 

import globalCSS from '../../globalCSS';

export const ListEmpty = (props: ListEmptyInterface) => {

  const { message } = props;

  return (
      <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', flex: 1 }}>
          <View style={{ marginTop: 15 }}>
            <AntDesign name="shoppingcart" size={60} color="black" />
          </View>

          <Text style={globalCSS.messageListEmpty}>
              {message}
          </Text>
      </View>
  );

}