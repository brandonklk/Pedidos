import React from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import { Field, Formik } from 'formik';
import { object, string, ref } from 'yup';
import { useRoute, useNavigation } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";
import { forgotPassword } from '../../services/User/UserService';

import { IForgotPassword } from '../../interfaces/pages/InterfaceUtils';
import term from '../../translation/terms.json';
import globalCSS from '../../globalCSS';
import { DynamicField } from '../../components/Fields/DynamicField';

export default function ForgotPassword() {
    const navigation = useNavigation();
    const route = useRoute();

    const endsForgotPassword = async (value: IForgotPassword) => {

        const { mensagem, type } = await forgotPassword(value);

        showMessage({
            message: mensagem,
            type: type,
        });

        if (type === 'success') {
            navigation.navigate('Login');
        } else if (type === 'warning') {
            navigation.navigate('StartForgotPassword');
        }

    }

    const formikInitialValues: IForgotPassword = {
        email: '',
        password: '',
        confirmPassword: '',
        token: ''
    };
    
    const validationSchema = object({
        email: string().email(term.mailInvalid).required(term.fieldMandatory),
        password: string().min(8, term.minValue8).max(15, term.maxValue15).required(term.fieldMandatory),
        confirmPassword: string().oneOf([ref('password'), null], term.diffPassword).required(term.fieldMandatory),
        token: string().required(term.fieldMandatory),
    })

    return (
        <>
            <Formik initialValues={ formikInitialValues } 
                onSubmit={ values => endsForgotPassword(values) }
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
                                />

                                <Field
                                    component={ DynamicField }
                                    name="confirmPassword"
                                    placeholder={ term.labelConfirmPassword }
                                    required={ true }
                                />

                                <Field
                                    component={ DynamicField }
                                    name="token"
                                    placeholder={ term.labelToken }
                                    required={ true }
                                />

                                
                                <TouchableOpacity disabled={ !isValid } onPress={() => handleSubmit() } 
                                    style={ globalCSS.buttonDefault }>
                                        <Text style={ globalCSS.textButton }>clique</Text>
                                </TouchableOpacity>
                            </>
                        </View>
                    </KeyboardAvoidingView>
                )}

            </Formik>
        </>
    );
}