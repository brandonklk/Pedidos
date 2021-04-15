import React from 'react';
import { View, TextInput } from 'react-native';
import { ErrorMessage } from 'formik';
import { ErrorsFields } from '../Erros/ErrorsFields';
import globalCSS from '../../globalCSS';
import { DynamicFieldInterface } from '../../interfaces/fields/DynamicField-Interface';


export const DynamicField = (props : DynamicFieldInterface) => {

    const { field: { name, onBlur, onChange, value },
            form: { errors, touched, setFieldTouched },
            ...inputProps } = props;

    const isMandatory: boolean = props.required === true;

    const hasError: boolean = errors[name] !== undefined && 
        touched[name] !== undefined && isMandatory;

    return (
        <>
            <TextInput
                value={value}
                onChangeText={(text) => onChange(name)(text)}
                onBlur={() => {
                    setFieldTouched(name)
                    onBlur(name)
                }}
                style={globalCSS.inputDefault}
                {...inputProps}
            />

            {hasError && <ErrorMessage name={name}>{msg => <ErrorsFields mensagem={msg}></ErrorsFields>}</ErrorMessage>}

        </>
    )

  }