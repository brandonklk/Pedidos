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
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        borderRadius: 7,
    },
    containerButton: {
        width: '100%',
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    action: {
        color: '#fff',
        backgroundColor: '#007bff',
        borderRadius: 8,
        height: 50,
        width: '48%',
        paddingHorizontal: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actionMoney: {
        borderRadius: 8,
        borderColor: '#DCDCDC',
        height: 50,
        width: '48%',
        paddingHorizontal: 35,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textMoney: {
        marginLeft: 8,
        color: '#000000',
        fontSize: 17,
        fontWeight: 'bold',
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
    },
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerSafeArea: {
        flex: 1,
        marginHorizontal: 2,
    },
    messageListEmpty: {
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 8,
        fontSize: 24,
        fontWeight: "bold",
    },
    modal: {
        flex: 1,
        margin: 5,
        backgroundColor: '#D3D3D3',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
    }

});