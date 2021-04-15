import React from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import { Field, Formik } from 'formik';
import { object, string } from 'yup';
import { useNavigation } from '@react-navigation/native';
import { showMessage } from "react-native-flash-message";

import { LoginInitialValues } from '../../interfaces/pages/LoginInterface';
import term from '../../translation/terms.json';
import globalCSS from '../../globalCSS';
import { DynamicField } from '../../components/Fields/DynamicField';

const Login = () => {

    const navigation = useNavigation();

    const formikInitialValues: LoginInitialValues = {
        email: '',
        password: ''
    };
    
    const validationSchema = object({
        email: string().email(term.mailInvalid).required(term.fieldMandatory),
        password: string().min(6, term.minValue6).max(12, term.maxValue12).required(term.fieldMandatory)
    })

    return (
        <>
            <Formik initialValues={ formikInitialValues } 
                onSubmit={ values => console.log(values) }
                validationSchema={ validationSchema }          
            >

                {({ values, touched, handleSubmit, 
                    errors, isValid, isSubmitting 
                }) => (

                    <KeyboardAvoidingView style={globalCSS.keyboardAvoidingView}>
                        <View style={globalCSS.container}>
                            <>
                                <Field
                                    component={DynamicField}
                                    name="email"
                                    placeholder={term.labelMail}
                                    required={true}
                                />

                                <Field
                                    component={DynamicField}
                                    name="password"
                                    placeholder={term.labelPassword}
                                    required={true}
                                    secureTextEntry
                                />
                                
                                <TouchableOpacity disabled={ !isValid } onPress={handleSubmit} style={globalCSS.buttonDefault}>
                                        <Text style={globalCSS.textButton}>clique</Text>
                                </TouchableOpacity>
                            </>
                        </View>
                    </KeyboardAvoidingView>
                )}

            </Formik>
        </>
    );
}

export default Login;