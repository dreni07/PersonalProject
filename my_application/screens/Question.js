import React,{useState,useEffect,useMemo} from 'react';
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native';
import { CheckForAccount } from './Check';
import { first_letter_capitalized } from './Level';
import { SaveCourse } from './SaveCourse';
import { useNavigation } from '@react-navigation/native';
import { QuestionWrong } from './AddQuestionWrong';
// import { Practical } from './Practical';

const Question = ({route,navigation}) => {
    // let the_question = question.at(-1);
    const [userLanguage,setUserLanguage] = useState('');
    const main_navigation = useNavigation();

    let language_map = {
        de:'German',
        fr:'French',
        es:'Spanish'
    }


    const colors = [
        '#FF69B4', // Pink (Hot Pink)
        '#FFEB3B', // Yellow (Amber)
        '#2196F3', // Blue (Bright Blue)
        '#4CAF50'  // Green (Green)
      ];

    const account = CheckForAccount();
    account.then(ans=>{
        let the_user = JSON.parse(ans);
        setUserLanguage(the_user.language);
    })
    let { question,the_level } = route.params;


    const the_question_number = parseInt(question[0].split('').at(-1));

    const the_correct_answer = useMemo(()=>{
        let the_correct_answer = question[1].options.correct;
        return the_correct_answer;
    },[]);

    


    const handlePress = (answer) => {
        if(answer === the_correct_answer){
            if(the_question_number === 5){
                SaveCourse(the_level.level_id + 1).then(ans=>{
                    if(ans){
                        main_navigation.navigate("Home");
                    }
                });
                
            }
            navigation.navigate(`Question${the_question_number + 1}`);
        }else{
            const the_current_question = `How To Say ${question[1].word_in_english[0]} In ${userLanguage ? first_letter_capitalized(userLanguage) : ''}`;

            let the_question_wrong = {
                question:the_current_question,
                options:question[1].options,
                number_of_times_wrong:1
            };

            QuestionWrong(the_question_wrong);
        }
    }
    return(
        <View>
            <View style={styles.container_title}>
                <Text style={styles.container_text}>{question[0]}</Text>
            </View>
            <View style={styles.question_wrapper}>
                <View style={styles.question_container}>
                    <View style={styles.question}>
                        <Text style={styles.question_text}>How To Say {question[1].word_in_english[0]} In {userLanguage ? first_letter_capitalized(language_map[userLanguage]) : ''}?</Text>
                    </View>
                    <View style={styles.options}>
                        <Text style={{ color:'#333',fontFamily:'sans-serif',fontWeight:'500',fontSize:'20px' }}>Options</Text>
                        <View style={styles.options_choose}>
                            {Object.entries(question[1].options).map(([_,value],index)=>{
                                if(_ !== "correct"){
                                    return (
                                        <TouchableOpacity key={index} onPress={() => handlePress(value)} style={[styles.optionButton,{backgroundColor:colors[index]}]}>
                                            <Text>{value}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                            })}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container_title:{
        marginTop:'30px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    container_text:{
        color:'#333',
        fontFamily:'sans-serif',
        fontWeight:'500',
        fontSize:'30px',
        textTransform:'capitalize'
    },

    question_wrapper:{
        marginTop:'50px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },

    question_container:{
        height:'100px',
        width:'300px',
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },

    question:{
        display:'flex',
        justifyContent:'center'
    },

    options:{
        marginTop:'50px'
    },

    question_text:{
        color:'#333',
        fontFamily:'sans-serif',
        fontWeight:'500',
        fontSize:'20px'
    },
    options_choose:{
        marginTop:'20px'
    },
    optionButton: {
        width: '240px',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'#4CAF50'
    },
    optionText: {
        fontSize: 18,
        color: '#333',
        fontWeight: '600',
    },
});

export default Question;