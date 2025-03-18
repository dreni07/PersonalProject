import {useState,useEffect} from 'react';
import {View,Text,StyleSheet} from 'react-native';

const PersonalizedQuestion = ({route}) => {
    let {question} = route.params;

    // mduhet me kodu UI per PersonalizedQuestion
    return (
        <View>
            <Text>{question} Question there</Text>
        </View>
    )
}

export default PersonalizedQuestion