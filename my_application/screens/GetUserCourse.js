import AsyncStorage from "@react-native-async-storage/async-storage";

export const UserCourse = async () => {
    let the_user_course = await AsyncStorage.getItem('user_course');

    return the_user_course
}
