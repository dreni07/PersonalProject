import React,{useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
export const Practical = async () => { 
    const the_questions_wrong = await AsyncStorage.getItem('questions_wrong');
    if(!the_questions_wrong) return; // wrong questions not here
    return JSON.parse(the_questions_wrong);
};

export const UserDataForQuiz = async () => {
    const the_user_data = await AsyncStorage.getItem('user_saved_data');
    if(!the_user_data) return;
    return JSON.parse(the_user_data);
}