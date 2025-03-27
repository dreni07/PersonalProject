import AsyncStorage from '@react-native-async-storage/async-storage';

export const QuestionWrong = async (question) => { // this question will look something like
    
    try{
        let the_questions_wrong = await AsyncStorage.getItem('questions_wrong');
        if(!the_questions_wrong){
            const question_wrong = [question];
            await AsyncStorage.setItem('questions_wrong',JSON.stringify(question_wrong));
        }else{

            const all_questions_wrong = JSON.parse(the_questions_wrong);
            const all_this_questions = all_questions_wrong.filter(the_wrong_question => the_wrong_question.question === question.question);

            if(all_this_questions.length > 0){ 
                all_this_questions[0].number_of_times_wrong += 1 //masi u

                let the_other_questions = all_questions_wrong.filter(the_wrong_question => the_wrong_question.question !== question.question);

                await AsyncStorage.removeItem('questions_wrong');

                if(the_other_questions.length > 0){

                    await AsyncStorage.setItem('questions_wrong',JSON.stringify([...the_other_questions,all_this_questions[0]]));

                }else{

                    await AsyncStorage.setItem('questions_wrong',JSON.stringify([all_this_questions[0]]));

                }

                return;
            }

            const questions_wrong = [...all_questions_wrong,question];

            await AsyncStorage.removeItem('questions_wrong');
            await AsyncStorage.setItem('questions_wrong',JSON.stringify(questions_wrong));

        }
        the_questions_wrong = JSON.parse(await AsyncStorage.getItem('questions_wrong'));
        return the_questions_wrong;
    } catch(err){
        console.error(err);
    }
}

export const GetQuestionsWrong = async () => {
    return JSON.parse(await AsyncStorage.getItem('questions_wrong'));
}