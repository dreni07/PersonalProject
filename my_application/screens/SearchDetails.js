import {useState,useEffect} from 'react';
import {View,Text,StyleSheet,Modal,TouchableOpacity} from 'react-native';

const colors = [
    '#9B59B6', // Purple
    '#E91E63', // Pink
    '#F39C12', // Yellow
    '#1ABC9C', // Teal
    '#3498DB', // Blue
    '#F1C40F', // Gold
    '#E74C3C', // Red
    '#8E44AD', // Violet
    '#2ECC71', // Green
    '#D35400'  // Orange
];
const SearchDetails = ({route}) => {
    const [random_index,setRandomIndex] = useState(0);
    const [modalVisible,setModalVisible] = useState(false);
    const [synonyms,setSynonyms] = useState([]);
    const [examples,setExamples] = useState([]);
    const [current_searching,setCurrentSearching] = useState('');

    useEffect(()=>{
        let random_index = Math.floor(Math.random() * colors.length);
        setRandomIndex(random_index);
    },[]);

    const close_modal = () => {
        setModalVisible(false);
    }

    function upperCaseFirstLetter(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function shuffleArray(array) {
        for(let i = array.length - 1;i > 0;i--){
            let j = Math.floor(Math.random() * (i+1));

            [array[i],array[j]] = [array[j],array[i]];
        }

        return array;
    }

    const array_of_colors = shuffleArray(colors);

    const {search_details} = route.params;

    // kur te klikoj synonyms
    // muj me bo domethane me te njejten api
    // me i marr perkthiimet ne frengjisht

    const translate = async (text) => {
        const url = 'https://translate-plus.p.rapidapi.com/translate';
        const options = {
            method: 'POST',
            headers: {
                'x-rapidapi-key': 'c82273b10amshb8cfde8b8d59d7cp18f77ajsn3acb841cc86b',
                'x-rapidapi-host': 'translate-plus.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text,
                source: 'en',
                target: 'fr'
            })
        };
        
        const response = await fetch(url,options);
        const answer = await response.json();

        return answer.translations.translation;

    };

    const handleSynonyms = () => {
        setCurrentSearching('synonyms');
        setModalVisible(true);
        let the_synonyms = search_details.synonyms;
        the_synonyms.forEach((synonym,index)=>{
            if(index < 5){
                let the_synonym_translated = {};
                translate(synonym).then(ans=>{
                    the_synonym_translated[synonym] = ans;
                    setSynonyms([...synonyms,the_synonym_translated]);
                });

            }
        });
    }

    
    const handleExamples = () => {
        setCurrentSearching('examples'); 
        setModalVisible(true);
        let the_examples = search_details.examples;
        console.log(the_examples,"EXAMPLES SHOWN AFTER CLICKING THE BUTTON");
        the_examples.forEach((example,index)=>{
            if(index < 5) {
                let the_example_translated = {};
                translate(example).then(ans=>{
                    the_example_translated[example] = ans;
                    setExamples([...examples,the_example_translated])
                })
            }
        })
    }
    
    const remove_un_wanted_chars = (string) => {
        let the_new_string = '';
        let the_char_seen = {};
        let char_start = '<';
        let char_end = '>';
        for(let i = 0;i<string.length;i++) {
            if(!(char_start in the_char_seen)) {
                if(string[i] == char_start) {
                    the_char_seen[string[i]] = string[i]; 
                    continue;
                }
                the_new_string += string[i]
            }else{
                if(string[i] == char_end) {
                    the_char_seen = {};
                }
            }
        }

        return the_new_string;
    }

    return (
        <View style={styles.container}>
            <View style={search_details.synonyms || search_details.examples ? styles.extra_buttons : styles.no_extra_buttons}>
                <TouchableOpacity  style={search_details.examples ? styles.extra_button : styles.no_extra_buttons}>
                    <Text style={styles.text_button} onPress={handleExamples}>Examples</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSynonyms} style={search_details.synonyms ? styles.extra_button : styles.no_extra_buttons}>
                    <Text style={styles.text_button}>Synonyms</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.wrapper}>
                <View style={styles.use_cases}>
                    <View style={styles.sub_title}>
                        <Text style={styles.text_title}>Definitions:</Text>
                    </View>
                    <View style={styles.main}>
                        {search_details.definations.map((item,index)=>{
                            if(index < 5){
                                return (
                                    <View style={[styles.child,{backgroundColor:array_of_colors[index]}]} key={index}>
                                        <Text style={styles.child_text}>{index+1}.{upperCaseFirstLetter(item)}</Text>
                                    </View>
                                )
                            }
                        })}
                    </View>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >

                    <View style={styles.modalView}>
                        <View style={styles.insideModalView}>
                            <View style={styles.modalWrapper}>
                                { current_searching == "synonyms" ? (synonyms.map((synonym,index)=>{
                                    return (
                                        <View style={styles.unique_synonym} key={index}>
                                            <Text style={[styles.child_text,{whiteSpace:'wrap'}]}>{Object.keys(synonym).at(0)}</Text>
                                            <Text style={[styles.child_text,{whiteSpace:'wrap'}]}>{Object.values(synonym).at(0)}</Text>
                                        </View>
                                    )
                                })): (examples.map((example,index)=>{
                                    return (
                                        <View style={styles.unique_synonym} key={index}>
                                            <Text style={[styles.child_text,{whiteSpace:'wrap'}]}>{remove_un_wanted_chars(Object.keys(example).at(0))}</Text>
                                            <Text style={[styles.child_text,{whiteSpace:'wrap'}]}>{remove_un_wanted_chars(Object.values(example).at(0))}</Text>
                                        </View>
                                    )
                                }))}
                            </View> 
                        </View>
                    </View>
                </Modal>
                <View style={styles.part_of_speech}>
                    <View style={styles.sub_title}>
                        <Text style={styles.text_title}>Part Of Speech:</Text>
                    </View>
                    <View style={[styles.child,{backgroundColor:array_of_colors[random_index]}]}>
                        <Text style={styles.child_text}>{upperCaseFirstLetter(search_details.part_of_speech)}</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center'
    },
    wrapper:{
        marginTop:'20px'
    },
    use_cases:{
        marginVertical:30
    },
    part_of_speech:{
        marginVertical:30
    },
    sub_title:{
        position:'relative',
        right:10
    },
    main:{
        marginTop:20
    },

    child:{
        marginVertical:10,
        padding:10,
        borderRadius:4
    },
    child_text:{
        color:'#333',
        fontFamily:'sans-serif',
        fontWeight:'700',
        fontSize:10
    },
    text_title:{
        color:'#333',
        fontWeight:'700',
        fontSize:'20px',
        fontFamily:'sans-serif'
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    insideModalView:{
        height:'300px',
        width:'350px',
        backgroundColor:'white',
        borderRadius:6,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    extra_buttons:{
        position:'absolute',
        top:'2%',
        right:'5%',
        display:'flex',
        flexDirection:'row'
    },
    extra_button:{
        marginHorizontal:10,
        backgroundColor:'#FFEB3B',
        paddingVertical:12,
        paddingHorizontal:24,
        borderRadius:4,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    no_extra_buttons:{
        display:'none'
    },
    text_button:{
        color:'#333',
        fontWeight:'700',
        fontSize:'17px'
    },
    modalWrapper:{
        height:'80%',
        width:'80%',
        display:'flex',
        flexDirection:'column'
    },
    unique_synonym:{
        marginVertical:10,
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-evenly',
    }
})

export default SearchDetails;