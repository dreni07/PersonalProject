import React,{useState,useEffect,useRef,createContext} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckForAccount } from './Check';
import Quiz from './data/quiz.json';
import { SaveCourse } from './SaveCourse';
import Level from './Level';


export const Context = createContext();

const Home = ({navigation}) => {
    const [username,setUsername] = useState('');
    const [userLevels,setLevels] = useState([]);
    const [current_level,setCurrentLevel] = useState(1);
    const [search_results,setSearchResults] = useState({});

    const the_first_mount = useRef(false);

    useEffect(()=>{
        if(the_first_mount.current){
            CheckForAccount.then(ans=>{
                console.log(ans,"FOR THE ACCOUNT");
                if(ans){
                    let answer = JSON.parse(ans);
                    let the_language_choosen = answer.language;
                    let the_full_course = Object.entries(Quiz[the_language_choosen]);
                    // SaveCourse(the_full_course).then(answer=>{
                    //     setLevels(answer.course);
                    //     setCurrentLevel(answer.current_level);
                    // });
                    console.log(the_full_course,"THE FULL COURSE THERE");
                }
            })
        }else{
            the_first_mount.current = true;
        }
    },[]);
    
    const the_username = async () => {
        const the_user = JSON.parse(await AsyncStorage.getItem('user'));
        if(the_user) {
            return the_user.username
        } else {
            navigation.navigate("Presantation");
        }

    }

    the_username().then(ans=>{
        setUsername(ans ? ans : '');
    })
    
    return (
        <Context.Provider value={{ value:[current_level,setCurrentLevel]}}>
            <View>
                <SearchBar search_results={search_results} setSearchResults={setSearchResults}/>
                <Text style={styles.title}>Enjoy Learning {username}</Text>
                <View style={styles.course}>
                    <Text style={styles.sub_title}>Your Course</Text>
                    <View style={styles.levels}>
                        <View>
                            <View style={styles.wrapper_levels}>
                                {userLevels ? (

                                    userLevels.map((level,index)=>{
                                        return (
                                            <View key={index}>
                                                <Level level={level} style={styles.slide}/>
                                            </View>
                                        )
                                    })
                                ) : <Text></Text>}
                            </View>   
                        </View>
                    </View>
                </View>
            </View>
        </Context.Provider>
    )
}

const styles = StyleSheet.create({
    title:{
        color:'#333',
        fontFamily:'sans-serif',
        fontWeight:'500',
        fontSize:'30px',
        margin:10
    },
    course:{
        marginTop:20,
        marginLeft:30,
        display:'flex',
        flexDirection:'column'
    },
    sub_title:{
        color:'#333',
        fontFamily:'sans-serif',
        fontWeight:'500'
    },
    levels:{
        marginTop:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center'
    },
    slide:{
        width:'33%',
        borderRadius:10,
        height:220,
        justifyContent:'center',
        alignItems:'center',
        margin:10
    }
});

export default Home;