import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons  } from '@expo/vector-icons';
import { IProducts } from '../../interfaces/pages/InterfaceUtils';
import { Content, Card, CardItem, Body, Right, Left, Badge } from 'native-base';

import productsCSS from '../../pages/ProductsCustomers/ProductsCustomers-CSS';
import { NumberFormatField } from '../Fields/NumberFormatField';


export const CardProducts = (props : IProducts) => {

    const { id, name, price, description, img, removeProduct, purchase_date } = props;

    return (
        <>
        
            <Content>
                <Card style={productsCSS.cardBorder}>

                    <CardItem cardBody bordered style={productsCSS.cardBorder}>
                      <Image style={[productsCSS.imageCard, productsCSS.cardBorder]} source={{uri: img}}/>
                    </CardItem>
                    
                    <CardItem header bordered>
                      <Text>{ name }</Text>
                    </CardItem>

                    <CardItem bordered>
                        
                        <Left>
                            <MaterialIcons name="monetization-on" size={24} color="green" />
                            <Text>
                                <NumberFormatField value={price}/>
                            </Text>
                        </Left>

                        <Body>
                            <Badge info>
                                <Text>12 itens</Text>
                            </Badge>
                        </Body>

                        <TouchableOpacity onPress={() => removeProduct(id)}>
                            <Right>
                                <MaterialCommunityIcons name="cart-remove" size={24} color="#e50000" />
                            </Right>
                        </TouchableOpacity>
                        
                    </CardItem>
                    
                    <CardItem style={productsCSS.cardBorder}>
                      <Body>
                        <Text>{ description }</Text>
                      </Body>

                      
                    </CardItem>

                </Card>
            </Content>

        </>
    )
}
