import React,{useState,useEffect} from 'react';
import {Text,View,StyleSheet} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Question from './Question';

import { SaveCourse } from './SaveCourse';
// import Quiz from './Quiz';

const QuizStack = createStackNavigator();
const LevelQuestions = ({route}) => {
    const [the_current_level,setCurrentLevel] = useState([]);
    const [difficulty,setDifficulty] = useState('');

    let the_level = route.params; // the level id 
    console.log(the_level,"LEVELI KTU");
    let my_array = [];
    my_array.slice()
    useEffect(()=>{
        let the_course = SaveCourse();
        
        the_course.then(ans=>{
            console.log(ans,"ANSWER MAKING ERROR THERE");
            let the_levels = Object.entries(ans.the_course);
            for(let i = 0;i<the_levels.length;i++){
                if(the_levels[i][0].split('').includes(the_level.level_id.toString())){
                    let the_object = Object.entries(the_levels[i][1]);
                    let the_sliced_object = the_object.slice(1);
                    setCurrentLevel(the_sliced_object);
                    setDifficulty(the_object[0].at(-1));

                    console.log(the_sliced_object,"SLICED OBJECT");
                    // mduhet me ja bo pass krejt qita quizit
                }
            }
        });

        
    },[]); // take the question for the level only when the component mounts
   
    return (
            the_current_level.length > 0 ? (
                    <QuizStack.Navigator  initialRouteName={`Question1`}>
                        {the_current_level.map((question,index)=>{
                            return(
                                <QuizStack.Screen options={{ headerShown:false }}  key={index} name={`Question${(index + 1).toString()}`} component={Question} initialParams={{ question,the_level }}/>
                            )
                        })}
                    </QuizStack.Navigator>
                    
            ):<Text>Loading</Text>
        
    )
}

export default LevelQuestions;