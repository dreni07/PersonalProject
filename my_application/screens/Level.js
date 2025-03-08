import {useState,useEffect,useContext} from 'react';
import {View,StyleSheet,Text,TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Context } from './Home';
import { useNavigation } from '@react-navigation/native';

export function first_letter_capitalized(string){
    if(string == '') return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function spaceBetweenNumber(string) {
    let the_full_string = '';
    let the_splitted = string.split('');
    for(let i = 0;i<the_splitted.length;i++){
        if(isNaN(parseInt(the_splitted[i]))){
          the_full_string += the_splitted[i];
        }else{
          the_full_string += ' ' + the_splitted[i];
        }
    }

    return the_full_string;
}


function extractLevel(string){
  let the_splitted = string.split('')
  for(let i = 0;i<the_splitted.length;i++){
    if(!isNaN(parseInt(the_splitted[i]))){
      return parseInt(the_splitted[i]);
    }
  }
}




const Level = ({level}) => {

  const navigation = useNavigation();
  const {value} = useContext(Context);
  const [current_level,setCurrentLevel] = value;

  console.log(current_level,"CURRENT LEVEL PASSED TO THE LEVEL!");

  function handleLevel(level_clicked) {
    if(level_clicked <= current_level){
      navigation.navigate("Level",{level_id:level_clicked});
    }else{
      alert('STILL TO REACH THAT LEVEL');
    }
  }
    


    return (
        <View style={styles.cardContainer}>
          {current_level >= extractLevel(level[0]) ? (
              <LinearGradient
                  
              colors={['#6a11cb', '#2575fc']} // Beautiful gradient from purple to blue
              style={styles.card}
              >
              <TouchableOpacity onPress={() => {handleLevel(extractLevel(level[0]))}}>
                <Text style={styles.title}>{first_letter_capitalized(spaceBetweenNumber(level[0]))}</Text>
              </TouchableOpacity>
              <Text style={[styles.footer, styles.footerLeft]}>Questions: 5</Text>
              <Text style={[styles.footer, styles.footerRight]}>Difficulty: {level[1].difficulty}</Text>
            </LinearGradient>
          ): (<LinearGradient
                
            colors={['#d3d3d3', '#a9a9a9']} // Beautiful gradient from purple to blue
            style={styles.card2}
        >
            <TouchableOpacity onPress={() => {handleLevel(extractLevel(level[0]))}}>
              <Text style={styles.title}>{first_letter_capitalized(spaceBetweenNumber(level[0]))}</Text>
            </TouchableOpacity>

            <Text style={[styles.footer, styles.footerLeft]}>Questions: 5</Text>

            <Text style={[styles.footer, styles.footerRight]}>Difficulty: {level[1].difficulty}</Text>
        </LinearGradient>
      )}
            
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        marginHorizontal:"20px",
        width:"33%",
      },
      card: {
        cursor:'pointer',
        width: 300,
        height: 200,
        borderRadius: 15,  
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        position: 'relative',
      },
      card2:{
        cursor:'pointer',
        width: 300,
        height: 200,
        borderRadius: 15,  
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        position: 'relative',
        opacity:0.6,
      },
      title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center', // Center title horizontally
        marginBottom: 20,
      },
      footer: {
        position: 'absolute',
        fontSize: 14,
        color: '#fff', // White text for contrast
        bottom: 10, // 10px from the bottom edge
      },
      footerLeft: {
        left: 10, // 10px from the left edge
      },
      footerRight: {
        right: 10, // 10px from the right edge
      },
})
export default Level;