import React from 'react';
import { View, Text } from 'react-native';
import { ErrorsFieldsInterface } from '../../interfaces/fields/ErrorsFields-Interface';
import globalCss from '../../globalCSS';

export const ErrorsFields = (props: ErrorsFieldsInterface) => {

  return (
     <View style={ globalCss.viewMsgError }>
        <Text style={ globalCss.msgErrorDefault }>{ props.mensagem }</Text>
     </View>
  )
}