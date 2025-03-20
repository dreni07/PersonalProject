import {useState,useEffect,useRef} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AddCorrectQuestion,getCorrectQuestions,RemoveCorrectQuestion } from './AddCorrectQuestion';
const PersonalizedQuestion = ({route,navigation}) => {
    let {question,current_question} = route.params;
    const [correct_answer,setCorrectAnswer] = useState("");
    const [user_answer,setUserAnswer] = useState("");
    const [number_of_tries,setTries] = useState(0);
    const [display_right_answer,setRightAnswer] = useState(false);
    const [number_of_correct_questions,setCorrectQuestion] = useState(0);
    const [end_of_quiz,setQuizEnd] = useState(false);

    const the_first_mount = useRef(null);

    // mduhet me kodu UI per PersonalizedQuestion

    const get_the_result = async (the_question) => {
        try{
            const url = 'https://translate-plus.p.rapidapi.com/translate';
            const options = {
                method: 'POST',
                headers: {
                    'x-rapidapi-key': 'e2b949a7cemsh503ba2581247ed5p1e6919jsnd40034f5a671',
                    'x-rapidapi-host': 'translate-plus.p.rapidapi.com',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text:the_question,
                    source: 'en',
                    target: 'fr'
                })
            };

            const response = await fetch(url,options);

            console.log(response)

            if(!response.ok) {
                throw new Error("Something Went Wrong");
            }

            const answer = await response.json();

            
            setCorrectAnswer(answer.translations.translation);
        } catch(err) {
            console.error(err);
        }
    }

    useEffect(()=>{
        if(!the_first_mount.current) {
            get_the_result(question.split(' ')[3]);
        }else{
            the_first_mount.current = true;
        }
    },[]);

    const handleNextQuestion = () => {
        if(current_question == 5){
            setQuizEnd(true);
            
            let the_correct_questions = getCorrectQuestions();
            the_correct_questions.then(ans=>{
                console.log(ans,"THE NUMBER OF CORRECT QUESTIONS");
                setCorrectQuestion(parseInt(ans));
            });

            RemoveCorrectQuestion();

            setTimeout(()=>{
                useNavigation("Home");
            },3000);
        }
        // }else{
        //     navigation.navigate(`Question_${current_question + 1}`);
        // }

        if(user_answer.toLowerCase() == correct_answer.toLowerCase()) {
            // setCorrectQuestion(number_of_correct_questions + 1);
            // setTries(0);
            AddCorrectQuestion();
            navigation.navigate(`Question_${current_question + 1}`);
        }else{
            if(number_of_tries == 3) {
                setRightAnswer(true);
                setTimeout(()=>{
                    setRightAnswer(false);
                    navigation.navigate(`Question_${current_question + 1}`);
                },3000);
            }

            setTries(number_of_tries + 1);
        }
    }
    return (
        <View style={styles.container}>
            <View style={display_right_answer && !end_of_quiz ? styles.right_answer : styles.non_right_answer}>
                <Text style={styles.correct_answer}>Correct Answer:{correct_answer}</Text>
            </View>

            <View style={display_right_answer || end_of_quiz ? styles.non_right_answer : styles.number_of_tries}>
                <Text style={styles.number_of_tries_text}>{3 - number_of_tries} <Text style={styles.small_number_tries}>number of tries left</Text></Text>
            </View>
            <View style={display_right_answer || end_of_quiz ? styles.wrapper_question : ''}>
                <View style={styles.question_wrapper}>
                    <Text style={styles.question_text}>{question}?</Text>
                    <TextInput style={styles.input} placeholder="Enter Your Answer..." onChange={(e)=>{
                        setUserAnswer(e.nativeEvent.text)
                    }}/>
                </View>
                <View style={styles.answer_wrapper}>
                    <TouchableOpacity style={styles.button} onPress={handleNextQuestion}>
                        <Text style={styles.buttonText}>Next Question</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={end_of_quiz ? styles.points_scored : styles.non_points}>
                <Text style={styles.end_of_quiz}>End Of Quiz!</Text>
                <Text style={styles.correct_question}>Correct: {number_of_correct_questions}/5</Text>
            </View>
           
            {/* <Text>Correct Answer {correct_answer}</Text> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    question_wrapper:{
        marginBottom:20
    },
    answer_wrapper:{
        marginTop:20
    },
    input: {
        height: 30,
        width: '100%',
        borderColor: '#003366',  // Dark blue border color
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 16,
        color: '#333',  // Dark gray text color
        backgroundColor: '#f5f5f5',  // Light gray background color
        paddingVertical:20
      },

      question_text:{
        marginBottom:10,
        color:'#333',
        fontFamily:'sans-serif',
        fontWeight:'900',
        fontSize:30
      },

      button: {
        backgroundColor: '#003366',  
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 30,  
        elevation: 3, 
        shadowColor: '#000',  
        shadowOffset: { width: 0, height: 4 },  
        shadowOpacity: 0.1,  
        shadowRadius: 5,  
      },
      buttonText: {
        fontSize: 18,
        color: 'white',  
        fontWeight: 'bold', 
        textAlign: 'center', 
      },

      wrapper_question:{
        display:'none'
      },
      non_right_answer:{
        display:'none',
      },
      right_answer:{
        position:'absolute',
        top:'10%',
        left:'50%',
        transform:'translateX(-50%)'
      },
      number_of_tries:{
        position:'absolute',
        top:'10%',
        left:'50%',
        transform:'translateX(-50%)'
      },
      number_of_tries_text:{
        color:'#333',
        fontFamily:'sans-serif',
        fontWeight:'900',
        fontSize:30
      },
      small_number_tries:{
        color:'#333',
        fontFamily:'sans-serif',
        fontWeight:'500',
        opacity:0.8,
        fontSize:'10px'
      },
      correct_answer:{
        color:'#333',
        fontFamily:'sans-serif',
        fontWeight:'500'
      },
      points_scored:{
        position:'absolute',
        top:'50%',
        left:'50%',
        transform:'translate(-50%,-50%)'
      },
      non_points:{
        display:'none'
      },

      correct_question:{
        color:'#333',
        fontFamily:'sans-serif',
        fontWeight:'700',
        fontSize:'30px'
      },
      end_of_quiz:{
        color:'#333',
        fontFamily:'sans-serif',
        fontWeight:'500',
        marginBottom:30,
        fontSize:'30px'
      }
})

export default PersonalizedQuestion