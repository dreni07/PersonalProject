import AsyncStorage from "@react-native-async-storage/async-storage";
import { CheckForAccount } from "./Check";
import Courses from './data/quiz.json';

export const SaveCourse =  async (level_updated=false) => {
    let the_account  = await CheckForAccount();
    if(the_account){
        const the_user_account = JSON.parse(the_account);
        const get_course = await AsyncStorage.getItem('user_course');
        if(get_course){
            if(level_updated){ // in case the user upgrades his level this will be the functionality
                const the_current_course = JSON.parse(get_course);
                the_current_course.current_level =  level_updated > the_current_course.current_level ? level_updated : the_current_course.current_level;
                await AsyncStorage.removeItem('user_course');
                await AsyncStorage.setItem('user_course',JSON.stringify(the_current_course));
            }
            return JSON.parse(await AsyncStorage.getItem('user_course'));
        }
        const create_course = Courses['languages'][the_user_account.language];
        const user_course = {
            user_id:the_user_account.id,
            the_course:create_course,
            current_level:1
        }
        const course_saved = await AsyncStorage.setItem('user_course',JSON.stringify(user_course));

        if(course_saved) return user_course;
    }

    return;

}