import {useState,useEffect,useContext} from 'react';
import {View,StyleSheet,Text,TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Context } from './Home';

const Level = ({level}) => {
    const navigation = useNavigation();
    const {value} = useContext(Context);
    const [current_level,setCurrentLevel] = value;

    function handle_level_click(level_clicked){
        if(level_clicked <= current_level) {
            navigation.navigate("Level",{level_id:level_clicked});
        }else{
            alert('STILL TO REACH THAT LEVEL');
        }
    }

    return (
        <View style={styles.cardContainer}>
            <LinearGradient
                colors={['blue','green']}
                style={styles.card}
            >
                <TouchableOpacity>
                    <Text style={styles.title}>{level[0]}</Text>
                </TouchableOpacity>

                <Text style={[styles.footer,styles.footerLeft]}>Questions:5</Text>
                <Text style={[styles.footer,styles.footerRight]}>Difficulty:</Text>
            </LinearGradient>
        </View> 
    )
}

const styles = StyleSheet.create({
    cardContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        marginHorizontal:20,
        width:'33%'
    },
    card:{
        cursor:'pointer',
        width:300,
        height:200,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
        padding:20,
        position:'relative'
    },
    
    // now im making some styling for the card when the level is not finnished yet
    card2:{
        cursor:'pointer',
        width:300,
        height:200,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
        padding:20,
        position:'relative',
        opacity:0.6
    },

    footer:{
        position:'absolute',
        fontSize:14,
        color:'#fff',
        bottom:10
    },
    footerLeft:{
        left:10
    },
    footerRight:{
        right:10
    },
    title:{
        fontSize:26,
        fontWeight:'bold',
        color:'#fff',
        textAlign:'center',
        marginBottom:20
    }

})
export default Level;