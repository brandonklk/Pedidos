import React from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import { Field, Formik } from 'formik';
import { object, string } from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";
import { autenticate } from '../../services/User/UserService';

import { ILoginInitialValues } from '../../interfaces/pages/InterfaceUtils';
import term from '../../translation/terms.json';
import globalCSS from '../../globalCSS';
import loginCSS from './Login-CSS';
import { DynamicField } from '../../components/Fields/DynamicField';
import { setUserInLocalStorage } from '../../utils/StorageUtils';

export default function Login() {
    const navigation = useNavigation();
    const route = useRoute();

    const connectUserAndSetDadoLocalStorage = async (value: object) => {
        
        const { user, type, mensagem } = await autenticate(value);

        if (type === 'success') {
            try {
                await setUserInLocalStorage(user);
                navigation.navigate('ProductsCustomers');
            } catch (e) {
               console.log("Erro ao logar usuário. ", e)
            }
        } else {
            showMessage({
                message: mensagem,
                type: type,
            });
        }

    }

    const navigateToUserRegistration = () => {
        navigation.navigate('RegisterUser');
    }

    const navigateToStartForgotPassword = () => {
        navigation.navigate('StartForgotPassword');
    }

    const formikInitialValues: ILoginInitialValues = {
        email: '',
        password: ''
    };
    
    const validationSchema = object({
        email: string().email(term.mailInvalid).required(term.fieldMandatory),
        password: string().min(8, term.minValue8).max(15, term.maxValue15).required(term.fieldMandatory)
    })

    return (
        <>
            <Formik initialValues={ formikInitialValues } 
                onSubmit={ values => connectUserAndSetDadoLocalStorage(values) }
                validationSchema={ validationSchema }          
            >

                {({ values, touched, handleSubmit, 
                    errors, isValid, isSubmitting 
                }) => (

                    <KeyboardAvoidingView style={globalCSS.keyboardAvoidingView}>
                        <View style={globalCSS.container}>
                            <>
                                <Field
                                    component={ DynamicField }
                                    name="email"
                                    placeholder={ term.labelMail }
                                    required={ true }
                                />

                                <Field
                                    component={ DynamicField }
                                    name="password"
                                    placeholder={ term.labelPassword }
                                    required={ true }
                                    secureTextEntry
                                />
                                
                                <TouchableOpacity disabled={ !isValid } onPress={() => handleSubmit() } style={ globalCSS.buttonDefault }>
                                        <Text style={ globalCSS.textButton }>clique</Text>
                                </TouchableOpacity>
                            </>

                            <View style={ loginCSS.containerActions }>
                                <TouchableOpacity style={ loginCSS.action } onPress={ navigateToUserRegistration }>
                                    <Text style={ loginCSS.textLink }>{ term.createAccount }</Text>
                                </TouchableOpacity>

                                <Text style={ loginCSS.action }> | </Text>

                                <TouchableOpacity style={ loginCSS.action } onPress={ navigateToStartForgotPassword }>
                                    <Text style={ loginCSS.textLink }>{ term.forgotPassword }</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                )}

            </Formik>
        </>
    );
}