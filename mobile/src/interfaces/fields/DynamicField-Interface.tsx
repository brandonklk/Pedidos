export interface DynamicFieldInterface {
    field: { name: string, onBlur: (name: string) => void, 
            onChange: (value: string) => (text: string) => void, 
            value?: any
        },
    form: { errors: {[key:string]: any[]}, 
            touched: {[key:string]: any[]}, 
            setFieldTouched: any
        },
    error?: boolean,
    type: string,
    required?: boolean
}