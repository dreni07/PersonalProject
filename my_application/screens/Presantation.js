import {useState,useEffect} from 'react';
import {Text,View,StyleSheet,TextInput,TouchableOpacity} from 'react-native';
import { CheckForAccount } from './Check';
import { CreateAccount } from './Check';
import { Picker } from '@react-native-picker/picker';
import {v4 as uuid} from 'uuid';


const Presantation = ({navigation}) => {
    const [username,setUsername] = useState('');
    const [language_to_learn,setLanguage] = useState('');
    useEffect(()=>{
        const checking = CheckForAccount();
        checking.then(ans=>{
            if(ans){
                navigation.navigate("Home");
            }
        });
    },[]);

    const handleSubmit = () => {
        if(username && language_to_learn){
            const user_data = {
                id:uuid(),
                username,
                language:language_to_learn
            }

            const the_account = CreateAccount(user_data);
            the_account.then(ans=>{
                if(ans){
                    navigation.navigate("Home");
                }
            })
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.sub_container}>
                <Text style={styles.title}>Welcome</Text>
            </View>
            <View style={styles.presantation_container}>
                <View style={styles.presantation_wrapper}>
                    <View style={styles.username_wrapper}>
                        <View style={{ marginVertical:'5px' }}>
                            <Text style={styles.label_style}>Your Name:</Text>
                        </View>
                        <View style={{ marginVertical:'5px' }}>
                            <TextInput
                                value={username}
                                style={styles.text_input}
                                placeholder="Name..."
                                onChange={(text) => {console.log(text.nativeEvent.text); setUsername(text.nativeEvent.text)}}
                            />
                        </View>
                    </View>
                    <View style={styles.language_wrapper} >
                        <View style={{ marginVertical:'5px' }}>
                            <Text style={styles.label_style}>Language To Learn:</Text>
                        </View>
                        <View>
                            <Picker style={styles.picker} selectedValue={language_to_learn} onValueChange={(language) => {console.log(language);setLanguage(language)}}>
                                <Picker.Item label="Select Option" value="" enabled={false}/>
                                <Picker.Item style={styles.picker_item} label="French" value="french"/>
                                <Picker.Item style={styles.picker_item} label="German" value="german"/>
                                <Picker.Item style={styles.picker_item} label="Spanish" value="spanish"/>
                                <Picker.Item style={styles.picker_item} label="Albanian" value="albanian"/>
                            </Picker>
                        </View>
                    </View>
                    <View style={{ marginLeft:'0px' }}>
                        <TouchableOpacity onPress={handleSubmit} style={styles.button}><Text style={styles.buttonText}>Submit</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        flex:1,
        display:'flex',
        flexDirection:'column',
    },
    presantation_container:{
        width:'100%',
        height:'70%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
    },
    text_input:{
        width:'250px',
        paddingVertical:'12px',
        paddingHorizontal:'20px',
        borderWidth:2,
        borderColor:'#333',
        borderRadius:2,
        fontFamily:'sans-serif',
        fontWeight:500,
        color:'#333',
        opacity:0.8,
    },  
    label_style:{
        color:'#333',fontFamily:'sans-serif',fontWeight:'500',fontSize:'20px',
    },
    username_wrapper:{
        marginVertical:'10px'
    },
    language_wrapper:{
        marginVertical:'10px'
    },
    presantation_wrapper:{
        display:'flex',
        flexDirection:'column',
     
    },
    sub_container:{
        width:'100%',
        height:'30%',
        display:'flex',
        flexDirection:'row',
        marginTop:'10px',
        justifyContent:'center'
    },
    title:{
        color:'#333',
        fontFamily:'sans-serif',
        fontWeight:'500',
        fontSize:'40px'
    },
    picker: {
        width: 250,               
        height: 50,               
        backgroundColor: '#fff',  
        borderRadius: 2,         
        borderWidth: 1,          
        borderColor: '#333',   
        marginBottom: 20,         
        overflow: 'hidden',       
        shadowColor: '#000',     
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,       
        shadowRadius: 4,
        elevation: 3,            
      },
      picker_item:{
        color:'#333',
        fontFamily:'sans-serif',
        fontWeight:'500',
        fontSize:'20px'
      },

      button:{
        backgroundColor:'#3498db',
        paddingVertical:12,
        paddingHorizontal:30,
        borderRadius:5,
        alignItems:'center',
        justifyContent:'center',
        
      },
      buttonText: {
        color: '#fff',              
        fontSize: 16,               
        fontWeight: 'bold',         
        fontFamily:'sans-serif'
      },
})

export default Presantation;