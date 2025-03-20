import React,{useEffect,useContext,useRef} from 'react'
import { Text } from 'react-native-gesture-handler'
import { PersonalizedQuizContext } from './PracticalQuestion';


const LoadingScreen = ({navigation}) => {
  useEffect(()=>{
    navigation.navigate('Question_1');
  },[]);
  return (
      <Text>Loading</Text>
  )
}

export default LoadingScreen
