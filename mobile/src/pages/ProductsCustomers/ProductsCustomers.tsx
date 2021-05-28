import React, { useEffect, useState, useRef } from 'react';
import { useRoute } from '@react-navigation/native';

import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { View, Text, FlatList, SafeAreaView, Modal } from 'react-native';
import { Button, Container } from 'native-base';

import FlashMessage, { showMessage } from 'react-native-flash-message';
import { ListEmpty } from '../../components/pages/ListEmpty';
import globalCSS from '../../globalCSS';
import { CardProducts } from '../../components/Cards/CardProducts';
import Scanner from '../../components/Camera/Scanner';
import { NumberFormatField } from '../../components/Fields/NumberFormatField';
import { deleteProduct, getProductCurrentDayOfUser, saveNewProduct } from '../../services/Products/ProductsService';
import { IProducts } from '../../interfaces/pages/InterfaceUtils';
import { Loading } from '../../components/pages/Loading';

export default function ProductsCustomers () {
    const route = useRoute();
    const refMensageModal = useRef<null|any>(null);
    const [loading, setLoading] = useState(false);
    const [totalSpending, setTotalSpending] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [totalProductsPurchased, setTotalProductsPurchased] = useState(0);
    const [page, setPage] = useState(1);
    const [allProducts, setAllProducts] = useState<IProducts[]>([]);

    useEffect(() => {
      getProducts();
    }, []);

    const getProducts = async () => {

      if(loading){
        return;
      }
      
      const allProductsloaded: boolean = totalProductsPurchased > 0 && 
        allProducts.length === totalProductsPurchased;
        
      if (allProductsloaded) {
        return;
      }
      
      setLoading(true);
      
      const [allProductsCurrentDay, spending, totalProducts] = await getProductCurrentDayOfUser(page);
      
      if (allProductsCurrentDay && allProductsCurrentDay.length > 0) {
        setTotalProductsPurchased(totalProducts);
        setAllProducts([...allProducts, ...allProductsCurrentDay]);
        setTotalSpending(spending);
        setPage(page + 1);
      }

      setLoading(false);
    }

    const addNewProductOfCart = async (valueProduct: string) => {
      // salvar o produto/objeto no banco
      setLoading(true);

      const valueParse: IProducts = JSON.parse(valueProduct);
      const { mensagem, type } = await saveNewProduct(valueParse);

      setLoading(false);

      if(refMensageModal.current !== null) {
        refMensageModal.current.showMessage({
          message: mensagem,
          type: type
        })
      }

    }

    const removeProduct = async (value: number) => {
      // remover objeto do banco e front
      setLoading(true);

      const { mensagem, type } = await deleteProduct(value);
      setAllProducts((products) => products.filter((item) => item.id !== value));

      setLoading(false);

      showMessage({
        message: mensagem,
        type: type
      })
    }

    const displayValuePurchase = (purchaseValue: number) => {
      showMessage({ message: `Valor total é de ${purchaseValue}`, type: 'warning' })
    }

    return (
      <SafeAreaView style={globalCSS.containerSafeArea}>
        {loading ? <Loading loading={loading}/> :
          <Container>
            <Modal
              visible={modalVisible}
              animationType="fade"
              transparent={true}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={globalCSS.modal}>
                <Scanner addNewProductOfCart={addNewProductOfCart}/>
                <Button style={globalCSS.buttonDefault} onPress={() => setModalVisible(false)}>
                  <Text style={globalCSS.textButton}>Cancelar</Text>
                </Button>
              </View>
              <FlashMessage ref={refMensageModal} floating={true} duration={4000} position="top" />
            </Modal>

            <FlatList 
              data={allProducts}
              keyExtractor={item => String(item.id)}
              onEndReached={getProducts}
              showsVerticalScrollIndicator={false}
              initialNumToRender={10}
              onEndReachedThreshold={0.5}
              removeClippedSubviews={true}
              ListEmptyComponent={<ListEmpty message="Nenhuma compra realizada"/>}
              renderItem={({ item }) => (
                <CardProducts id={item.id} name={item.name} price={item.price}
                    description={item.description} img={item.img} purchase_date={item.purchase_date} 
                    removeProduct={removeProduct}/>
              )}
            >
            </FlatList>

            <View style={globalCSS.containerButton}>

              <Button style={globalCSS.action} iconLeft onPress={() => setModalVisible(true)}>
                <MaterialCommunityIcons name="cart-plus" size={31} color="white" />
                <Text numberOfLines={1} style={[globalCSS.textButton, { marginLeft: 8 }]}>Adicionar ao carrinho</Text>
              </Button>

              <Button bordered style={globalCSS.actionMoney} iconLeft
                        onPress={() => console.log('ok')}>
                <MaterialIcons name="monetization-on" size={31} color="green" />
                <NumberFormatField value={totalSpending}
                  displayValuePurchase={displayValuePurchase}
                />
              </Button>

            </View>
          </Container>
        }
      </SafeAreaView>
  );

}
