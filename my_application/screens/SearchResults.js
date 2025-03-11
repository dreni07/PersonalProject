import {useState,useEffect} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
const SearchResults = ({search_details,isSearching,search_results,handleDetails}) => {
    return (
        <View style={isSearching ? styles.search_results : styles.search_results_inactive }>
            <TouchableOpacity onPress={() => {handleDetails(search_details,search_results.searched)}}>
                <Text style={styles.input}>
                   {search_results.searched}
                </Text>
                <Text style={styles.input}>
                    {search_results.translation}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    search_results:{
        width:'100%',
        position:'absolute',
        top:'100%',
        left:0,
        height:'50px',
        backgroundColor:'white',
        zIndex:1,
        borderBottomLeftRadius:'4px',
        borderBottomRightRadius:'4px'
    },
    search_results_inactive: {
        width:'100%',
        position:'absolute',
        top:'100%',
        left:0,
        height:'50px',
        backgroundColor:'white',
        zIndex:1,
        borderBottomLeftRadius:'4px',
        borderBottomRightRadius:'4px',
        opacity:0
    },
    input:{
        color:'#333',
        fontFamily:'sans-serif',
        fontWeight:'500',
        opacity:0.8
    }
})

export default SearchResults;