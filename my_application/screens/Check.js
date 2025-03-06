import {useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CheckForAccount = async () => {
    const the_item = await AsyncStorage.getItem('user');
    return the_item ? the_item : false;
}

export const CreateAccount = async ({id,username,language}) => {
    const user = {
        id,
        username,
        language
    };

    const the_account = await AsyncStorage.setItem('user',JSON.stringify(user));

    return the_account ? true : false;
}

export const DeleteAccount = async () => {
    await AsyncStorage.removeItem('user');
}