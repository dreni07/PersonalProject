import React,{useState,useEffect} from 'react';
import {Text,View,StyleSheet,TouchableOpacity} from 'react-native';
import { UserDataForQuiz,Practical } from './Practical';
import { createStackNavigator } from '@react-navigation/stack';
import PersonalizedQuestion from './PersonalizedQuestion';
import LoadingScreen from './LoadingScreen';

const PracticalQuizStack = createStackNavigator();

const PractialQuestion = () => {
    const [practical_questions,setPracticalQuestions] = useState([]);
    const [user_data_quiz,setUserDataForQuiz] = useState([]);
    const [personalized_quiz,setPersonalizedQuiz] = useState([]);

    useEffect(()=>{
        Practical().then(answer=>{
            if(answer.length > 5){
                UserDataForQuiz().then(ans=>{
                    ans = ans ? ans : [];
                    let personalized_questions = determine_questions(answer,ans);
                    setPersonalizedQuiz(personalized_questions);
                })
            }
        })
    },[]);

   

    const sort_based_on_wrong_times = (the_wrong_questions) => {
        
        for(let i = 0;i<the_wrong_questions.length;i++){
            for(let j = 0;j<the_wrong_questions.length;j++){
                if(the_wrong_questions[j].number_of_times_wrong < the_wrong_questions[j].number_of_times_wrong){
                    let temporary = the_wrong_questions[j];
                    the_wrong_questions[j] = the_wrong_questions[j+1];
                    the_wrong_questions[j+1] = temporary;
                }
            }
        }
        return the_wrong_questions;
    }

    const determine_questions = (wrong_questions,user_data_quiz) => {
        const the_wrong_questions = sort_based_on_wrong_times(wrong_questions);
        const only_questions = get_only_questions(the_wrong_questions);
        const the_searched_questions = return_the_searched_questions_to_ask(only_questions,user_data_quiz);
        return [...only_questions,...the_searched_questions];
    }


    const return_the_searched_questions_to_ask = (current_questions,user_data_quiz) => {
        let the_questions_to_aks = [];
        for(let i = 0;i<user_data_quiz.length;i++){
            if(check_for_duplicate_questions(current_questions,user_data_quiz[i])){
                the_questions_to_aks.push(user_data_quiz[i]);
            }
        }
        return the_questions_to_aks;
    }

    const get_only_questions = (question_details) => {
        let only_questions = [];
        for(let i = 0;i<question_details.length;i++) {
            only_questions.push(question_details[i].question);
        }
        return only_questions
    }

    const check_for_duplicate_questions = (all_wrong_questions,question) => {
        for(let i = 0;i<all_wrong_questions.length;i++){
            if(all_wrong_questions.includes(question)){
                return false;
            }
        }
        return true;
    }


    // after determing the questions I need to set them on a state
    // and need to actually save also the options or maybe generate some options
    // based on all the possible options
    return (
        <PracticalQuizStack.Navigator initialRouteName={`Loading`}>
            {personalized_quiz.length > 0 ? (
                personalized_quiz.map((quiz, index) => {
                    if(index < 5){
                        return (
                            <PracticalQuizStack.Screen
                                options={{ headerShown:false }}
                                key={index}
                                name={`Question_${index+1}`}
                                component={PersonalizedQuestion}
                                initialParams={{ question: quiz,current_question:index+1 }} 
                            />
                        );
                    }
                })
            ) : (
                <PracticalQuizStack.Screen
                    name={`Loading`}
                    component={LoadingScreen}
                />
            )}
        </PracticalQuizStack.Navigator>
    )
}

// make an component question in which I will
// make the question asking functionality
// and also make an state or save it somewhere whether the user has attended this quiz or not

export default PractialQuestion;
