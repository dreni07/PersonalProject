import React,{useState,useEffect,useRef,createContext} from 'react';
import {View,Text,StyleSheet,Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckForAccount } from './Check';
import Quiz from './data/quiz.json';
import { SaveCourse } from './SaveCourse';
import Level from './Level';
import SearchBar from './SearchBar';
import { UserCourse } from './GetUserCourse';


export const Context = createContext();

const { width: screenWidth } = Dimensions.get('window');
const slide_width = screenWidth * 0.3;

const Home = ({navigation}) => {
    const the_course = SaveCourse(false);
    const [username,setUsername] = useState('');
    const [language,setLanguage] = useState('');
    const [userCourse,setCourse] = useState(null);
    const [currentLevel,setCurrentLevel] = useState(0);
    const [levels,setLevels] = useState([]);
    const first_mount = useRef(false);
    const [search_results,setSearchResults] = useState({});

    UserCourse().then(ans=>{
        console.log('User course there buddy',ans);
    })
   
    const handleDetails = (search_details) => {
        if(search_details){
            if(search_details.definations.length > 0){
                navigation.navigate("SearchDetails",{search_details:search_details})
            }else{
                alert("No Details About This Word!");
            }
        }else{
            alert("No Details About This Word!");

        }
       
    }

   
    useEffect(()=>{
        const the_account = CheckForAccount();
        the_account.then(ans=>{
            if(ans){
                let the_ans = JSON.parse(ans);
                setUsername(the_ans.username);
                setLanguage(the_ans.language);
            }else{
                navigation.navigate("Presantation");
            }
        })


    },[]);

    // useEffect(()=>{
    //         Practical().then((ans)=>{
    //             console.log(ans,"THE ANSWER OF PRACTICAL");
    //         })
    // },[]);
    
  
    // Features to add --> the practical quiz in which the user
    // will be taking another quiz which is a special quiz
    // Search for any word in french and see the results
    // online like a translator
    // Progress tracking (in which maybe I will count how many)
    // words has the user learned

    const translate = async (text) => {
        const url = 'https://translate-plus.p.rapidapi.com/translate';
        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': 'e91fed1247msh40f39dca1776a54p144a99jsn64bd354cb6de',
                'x-rapidapi-host': 'translate-plus.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: 'Hello , How are you',
                source: 'en',
                target: 'fr'
            })
        };
        
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error(error);
        }        
    };
      
      
   
    

    useEffect(()=>{
        if(first_mount.current){
            the_course.then(ans=>{
                console.log(ans,"THE ANSWER");
                setLevels(Object.entries(ans.the_course));
                setCurrentLevel(ans.current_level);
            })
        }else{
            first_mount.current = true;
        }
        
    },[language]);

    return(
        <Context.Provider value={{ value:[currentLevel,setCurrentLevel] }}>
                <View>
                    <SearchBar handleDetails={handleDetails} search_results={search_results} setSearchResults={setSearchResults}/>
                    <Text style={styles.title}>Enjoy Your Learning {username}!</Text>
                    <View style={styles.course}>
                        <Text style={{ color:'#333',fontFamily:'sans-serif',fontWeight:'500',fontSize:'20px' }}>Your Course:</Text>
                        <View style={styles.levels}>
                            <View style={styles.levels}>
                                <View style={styles.levelsWrapper}>
                                    {levels ? (
                                            levels.map((level,index)=>{
                                                return(
                                                    <View key={index} style={styles.slide}>
                                                        <Level level={level}/>
                                                    </View>

                                                    // <Text key={index}>Level {index + 1}</Text>
                                                )
                                            })
                                        ) : (
                                            <Text>Loading...</Text>
                                        )}
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
        marginVertical:'10px',
        marginHorizontal:'10px'
    },
    course:{
        marginTop:'20px',
        marginLeft:'30px',
        display:'flex',
        flexDirection:'column'
    },
    levels:{
        marginTop:'10px',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',

    },
    slide: {
        // backgroundColor: '#fff',
        width:slide_width,
        borderRadius: 10,
        height: 220,
        justifyContent: 'center',
        alignItems: 'center',
        margin:10
    },
    swiper: {
        height: 250, // Define height of swiper
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    levelsWrapper:{
        width:screenWidth,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
        flexWrap:'wrap',
    }
})

export default Home;