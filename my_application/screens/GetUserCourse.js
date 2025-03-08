import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserCourse = () => {
    let the_user_course = AsyncStorage.getItem('user_course');

    return the_user_course
}
