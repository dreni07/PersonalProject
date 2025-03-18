import React,{useState,useEffect} from 'react';
import { UserDataForQuiz,Practical } from './Practical';
import { createStackNavigator } from '@react-navigation/stack';
import PersonalizedQuestion from './PersonalizedQuestion';
import LoadingScreen from './LoadingScreen';


const PracticalQuizStack = createStackNavigator();

const PracticalQuestion = () => {
    const [practical_questions,setPracticalQuestion] = useState([]);
    const [user_data_quiz,setUserDataForQuiz] = useState([]);
    const [personalized_quiz,setPersonalizedQuiz] = useState([]);

    useEffect(()=>{
        Practical().then(wrong_questions=>{
            UserDataForQuiz().then(user_searched=>{
                let personalized_questions = determine_questions(wrong_questions,user_searched);
            })
        })
    })

    const determine_questions = (wrong_questions,user_searched) => {
        //
        const wrong_questions = sort_based_on_wrong_times(wrong_questions);
    }

    const sort_based_on_wrong_times = () =>{
        //
    }

    return (
        <PracticalQuizStack.Navigator initialRouteName={`Loading`}>
            {personalized_quiz.length > 0 ? (
                personalized_quiz.map((quiz,index)=>{
                    return (
                        <PracticalQuizStack.Screen
                            options={{ headerShown:false }}
                            key={index}
                            name={`Question${index + 1}`}
                            component={PersonalizedQuestion}
                            initialParams={{ question:quiz }}
                        />
                    )
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