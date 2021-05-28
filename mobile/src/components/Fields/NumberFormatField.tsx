import React from 'react';
import { Text } from 'react-native';
import { Button } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';
import { FormattedNumber, FormatNumberOptions, IntlProvider } from 'react-intl';
import globalCSS from '../../globalCSS';

interface INumberFormatField extends FormatNumberOptions {
    value: number,
    displayValuePurchase?: Function
}

export const NumberFormatField = (props: INumberFormatField) => {
    const { value, displayValuePurchase } = props;

    return (
        <>
            <IntlProvider locale="pt-BR" defaultLocale="pt-BR" >
                <Text numberOfLines={1}>
                    <FormattedNumber value={value} style="currency" currency="BRL" />
                </Text>
            </IntlProvider>
        </>
    );
}
