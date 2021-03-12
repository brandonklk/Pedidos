import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Card } from '@material-ui/core';

import { Formik } from 'formik';
import { object, string } from 'yup';
import { useNavigation } from '@react-navigation/native';

import { LoginInitialValues } from '../../interfaces/LoginInterface';
import term from '../../translation/terms.json';

const Login = () => {

    const navigation = useNavigation();

    const formikInitialValues: LoginInitialValues = {
        email: '',
        password: ''
    };
    
    const validationSchema = object({
        email: string().email("invalido").required("obrigatorio"),
        password: string().min(6, "minimo 6").max(12, "maximo 12").required("obrigatorio")
    })

    return (

        <Formik initialValues={ formikInitialValues } 
            onSubmit={ values => { values } }
            validationSchema={ validationSchema }          
        >

            {({ values, handleChange, handleSubmit, errors, isValidating, isSubmitting }) => (
                <View>
                    <Card>
                        <TextInput style={{backgroundColor:'blue'}} 
                            value={values.email} 
                            onChangeText={handleChange('email')} >
                        </TextInput >

                        { errors.email !== undefined && values.email !== "" &&  <Text>{term.msgError}</Text> }
                        
                        <TouchableOpacity onPress={() => handleSubmit } style={{ backgroundColor: 'red' }}>
                                <Text>clique</Text>
                        </TouchableOpacity>
                    </Card>
                    
                </View>
            )}

        </Formik>
    
    );
}

export default Login;