import React from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import { Field, Formik } from 'formik';
import { object, string } from 'yup';
import { useRoute, useNavigation } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";
import { generateTokenForForgotPassword } from '../../services/User/UserService';

import { IGenerateTokenForForgotPassword } from '../../interfaces/pages/InterfaceUtils';
import term from '../../translation/terms.json';
import globalCSS from '../../globalCSS';
import { DynamicField } from '../../components/Fields/DynamicField';

export default function StartForgotPassword() {
    const navigation = useNavigation();
    const route = useRoute();

    const startForgotPassword = async (value: IGenerateTokenForForgotPassword) => {

        const { mensagem, type } = await generateTokenForForgotPassword(value);

        showMessage({
            message: mensagem,
            type: type,
        });
        
        if (type === 'warning') {
            navigation.navigate('ForgotPassword');
        }

    }

    const formikInitialValues: IGenerateTokenForForgotPassword = {
        email: '',
    };
    
    const validationSchema = object({
        email: string().email(term.mailInvalid).required(term.fieldMandatory),
    })

    return (
        <>
            <Formik initialValues={ formikInitialValues } 
                onSubmit={ values => startForgotPassword(values) }
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