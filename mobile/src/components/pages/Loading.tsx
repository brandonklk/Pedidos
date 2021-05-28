import React from 'react';
import { ActivityIndicator } from 'react-native';

import globalCSS from '../../globalCSS';

interface ILoading {
    loading: boolean
}

export const Loading = (props: ILoading) => {

    const { loading } = props

    return (
        <>
            {loading &&
                <ActivityIndicator
                    size="large"
                    color="#0000ff"
                    style={globalCSS.containerLoading}
                />
            }
        </>
    );

}