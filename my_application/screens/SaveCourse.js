import {useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SaveCourse = async ({course}) => {
    let the_current_course = await AsyncStorage.getItem('user_course');
    if(!the_current_course){
        let the_course_data = {
            current_level:1,
            course
        };
        await AsyncStorage.setItem('user_course',JSON.stringify(the_course_data));
    }
    return JSON.parse(await AsyncStorage.getItem('user_course'));
}