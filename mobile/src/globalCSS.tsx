import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({

    keyboardAvoidingView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight + 20,
        width: '100%',
    },
    inputDefault: {
        width: '100%',
        padding: 8,
        borderRadius: 7,
        marginBottom: 10,
        fontSize: 17,
        backgroundColor: '#DCDCDC',
    },
    buttonDefault: {
        width: '100%',
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#99E599',
        borderRadius: 7,
    },
    textButton: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: 'bold',
    },
    viewMsgError: {
        width: '100%',
        color: '#FFFFFF',
        backgroundColor: '#f8d7da', 
        borderColor: '#f5c2c7',
        padding: 7,
        marginBottom: 15,
        marginTop: -7,
        textShadowOffset:{width: 1, height: 1},
        textShadowRadius:10,
        borderRadius: 4,
    },
    msgErrorDefault: {
        color: 'red',
        fontSize: 15,
    }

});