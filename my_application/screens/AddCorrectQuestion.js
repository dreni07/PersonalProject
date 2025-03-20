import AsyncStorage from "@react-native-async-storage/async-storage";

export const AddCorrectQuestion = async () => {
    let the_correct_question = await AsyncStorage.getItem('correct_questions');

    if(the_correct_question) {
        the_correct_question = parseInt(the_correct_question) + 1;
        RemoveCorrectQuestion();
        InsertCorrectQuestion(the_correct_question);
    }else{
        InsertCorrectQuestion(1);
    }
}

export const getCorrectQuestions = async () => {
    return await AsyncStorage.getItem('correct_questions');
}

export const RemoveCorrectQuestion = async () => {
    await AsyncStorage.removeItem('correct_questions');
}

const InsertCorrectQuestion = async (number_of_correct) => {
    await AsyncStorage.setItem('correct_questions',number_of_correct.toString());
}