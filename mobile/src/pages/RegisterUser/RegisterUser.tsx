import React from 'react';
import { View, Text, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';

import { Field, Formik } from 'formik';
import { object, string, ref } from 'yup';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";

import term from '../../translation/terms.json';
import globalCSS from '../../globalCSS';
import { DynamicField } from '../../components/Fields/DynamicField';
import { ICreateNewUser, IParamsNewUser } from '../../interfaces/pages/InterfaceUtils';
import { createNewUser } from '../../services/User/UserService';

export default function RegisterUser() {

    const navigation = useNavigation();

    const registerNewUser = async (value: ICreateNewUser) => {

        const { user, type, mensagem }: IParamsNewUser = await createNewUser(value);
        
        if (type === 'success') {
            showMessage({
                message: mensagem,
                type: type,
            });

            navigation.navigate('Login', { mensagem, type, user });
        } else {
            showMessage({
                message: mensagem,
                type: type,
            });
            console.error("Não foi possivel criar usuário.");
        }
    }

    const formikInitialValues: ICreateNewUser = {
        email: '',
        password: '',
        name: '',
        confirmPassword: '',
        phone: '',
        avatar: '',
    };
    
    const validationSchema = object({
        email: string().email(term.mailInvalid).required(term.fieldMandatory),
        password: string().min(8, term.minValue8).max(15, term.maxValue15).required(term.fieldMandatory),
        name: string().required(term.fieldMandatory),
        confirmPassword: string().oneOf([ref('password'), null], term.diffPassword).required(term.fieldMandatory),
        phone: string(),
        avatar: string(),
    })

    return (
        <>
            <Formik initialValues={ formikInitialValues } 
                onSubmit={ values => registerNewUser(values) }
                validationSchema={ validationSchema }          
            >

                {({ values, touched, handleSubmit, 
                    errors, isValid, isSubmitting
                }) => (
                    <ScrollView>
                        <KeyboardAvoidingView style={globalCSS.keyboardAvoidingView}>
                        
                            <View style={globalCSS.container}>
                            
                                <>

                                    <Field
                                        component={ DynamicField } name="name" placeholder={term.labelName}
                                        required={true}
                                    />

                                    <Field
                                        component={ DynamicField } name="email" placeholder={term.labelMail}
                                        required={true}
                                    />

                                    <Field
                                        component={ DynamicField } name="password" placeholder={term.labelPassword}
                                        required={true}
                                        secureTextEntry
                                    />

                                    <Field
                                        component={ DynamicField } name="confirmPassword" placeholder={term.labelConfirmPassword}
                                        required={true}
                                        secureTextEntry
                                    />

                                    <Field
                                        component={ DynamicField } name="phone" placeholder={term.labelPhone}
                                        required={false}
                                        keyboardType="numeric"
                                    />

                                    <Field
                                        component={ DynamicField } name="avatar" placeholder={term.labelAvatar}
                                        required={false}
                                    />
                                    
                                    <TouchableOpacity disabled={ !isValid } onPress={() => handleSubmit()} 
                                        style={[globalCSS.buttonDefault, { marginBottom: 10 }]}>
                                            <Text style={globalCSS.textButton}>clique</Text>
                                    </TouchableOpacity>
                                </>
                            
                            </View>
                        
                        </KeyboardAvoidingView>
                    </ScrollView>
                )}

            </Formik>
        </>
    );
}