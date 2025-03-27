import {useState,useEffect} from 'react';
import {View,Text,StyleSheet,TextInput} from 'react-native';
import SearchResults from './SearchResults';
import { CheckForAccount } from './Check';
// import {SaveSearchedResults} from './SaveUserData';

const SearchBar = ({handleDetails,search_results,setSearchResults}) => {
    const [isSearching,setSearching] = useState(false);
    const [search_details,setSearchDetails] = useState({});
    const [search_language,setSearchingLanguage] = useState("");

    const get_the_language = async () => {
        try {
            const account = await CheckForAccount();
            return account ? account : {};
        } catch(err) {
            console.error(err);
        }
    }

    useEffect(()=>{
        get_the_language().then(ans=>{
            setSearchingLanguage(JSON.parse(ans).language);
        })
    },[]);


    const handleSearchResults = async (text) => {
        if(text.nativeEvent.text.length > 0) {
            setSearching(true);
            const url = 'https://translate-plus.p.rapidapi.com/translate';
            const options = {
                method: 'POST',
                headers: {
                        'x-rapidapi-key': 'e2b949a7cemsh503ba2581247ed5p1e6919jsnd40034f5a671',
                        'x-rapidapi-host': 'translate-plus.p.rapidapi.com',
                        'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    text:text.nativeEvent.text,
                    source: 'en',
                    target: search_language
                })
            };
            try{
                const response = await fetch(url,options);
                if(!response.ok) {
                    throw new Error('Something went wrong');
                }
                const answer = await response.json();
    
                    
                setSearchDetails(answer.details);
                setSearchResults({searched:text.nativeEvent.text,translation:answer.translations.translation})
            } catch(err) {
                console.error(err);
            }
        }else{
            setSearching(false);
        }
          
    }

        


   
    
    return(
        <View style={styles.search_container}>
            <TextInput onChange={(text) => {handleSearchResults(text)}} style={styles.search_input} placeholder="Search For A Word..."/>
            <SearchResults search_details={search_details} isSearching={isSearching} handleDetails={handleDetails} search_results={search_results}/>
        </View>
    )
}

const styles = StyleSheet.create({
    search_container:{
        position:'absolute',
        top:'5%',
        right:'10%'
    },
    search_input:{
        paddingVertical:10,
        paddingHorizontal:20,
        backgroundColor:'#D3D3D3',
        fontFamily:'sans-serif',
        color:'#333',
        borderRadius:'4px'
    }
})

export default SearchBar;
