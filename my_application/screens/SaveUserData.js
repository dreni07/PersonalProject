import {useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

class UserData {
    async UserData(user_searched){
        try{
            const get_user_data = this.get_user_data();
            get_user_data.then(ans=>{
                if(ans){
                    let the_user_data = JSON.parse(get_user_data);
                    the_user_data.searches.push(user_searched);
                    this.remove_and_set(the_user_data);
                }else{
                    let the_user_data = [user_searched];
                    this.set_item(JSON.stringify({searches:the_user_data}));
                }
            });
        } catch(err){
            console.error(err);
        }
    }

    async remove_and_set(user_data) {
        await AsyncStorage.removeItem('user_saved_data');
        await AsyncStorage.setItem('user_saved_data',user_data);     
    }

    async get_user_data() {
        return await AsyncStorage.getItem('user_saved_data');
    }

    async set_item(user_data) {
        await AsyncStorage.setItem('user_saved_data',user_data)
    }
}
export const user_data = new UserData()
