import {useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SaveSearchedResults = async (word_searched) => {
    const the_user_searched_words = await AsyncStorage.getItem("user_searched_words");
    if(!the_user_searched_words) {
        createUserSearchedWords(JSON.stringify([{word:word_searched,word_searched_count:1}]));
    }else{
        addUserSearchedWord(word_searched);
    }
}

const createUserSearchedWords = async (the_data) => {
    await AsyncStorage.setItem('user_searched_words',the_data)
}

const addUserSearchedWord = async(word_searched) => {
    const user_searched_words = await AsyncStorage.getItem('user_searched_words');
    
    let the_current_searched_words = JSON.parse(user_searched_words);
    
    let the_words_searched = the_current_searched_words.map((word_searched)=>{
        return word_searched.word == word_searched;
    })

    if(the_words_searched) {
        let the_word = the_words_searched.at(-1).word;
        the_current_searched_words.map((word)=>{
            let the_current_word = word[the_word];
            if(the_current_word){
                word.word_searched_count += 1;
                return;
            }
        });
    }else{
        let the_word_searched = {
            word:word_searched,
            word_searched_count:1
        };

        the_current_searched_words.push(the_word_searched);
        
        removeWordSearched();

        the_current_searched_words = JSON.stringify(the_current_searched_words); 
        createUserSearchedWords(the_current_searched_words);
    }

}

const removeWordSearched = async () => {
    await AsyncStorage.removeItem('user_searched_words');
}