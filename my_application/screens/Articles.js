import React,{useState,useEffect} from 'react'
import {View,Text,Linking,TouchableOpacity,StyleSheet} from 'react-native'
import { Dimensions } from 'react-native';
import { CheckForAccount } from './Check';

// Get the screen width

// Calculate 30% of the screen width

const get_the_language = async () => {
    try {
        const account = await CheckForAccount();
        return account ? account : {};
    } catch(err) {
        console.error(err);
    }
}


const Articles = () => {
    const [articles,setArticles] = useState([]);
    useEffect(()=>{

        const get_articles = async () => {
            const the_language_response = await get_the_language();
            const the_language_object = JSON.parse(the_language_response);
            const apiKey = '42a7eecaf51644388f31b06fc8d6e801';
            const url = `https://newsapi.org/v2/everything?q=*&language=${the_language_object.language}&apiKey=${apiKey}`;
        
            fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();  
            })
            .then(data => {
                const articles = data.articles;
                setArticles(articles);
            
            })
            .catch(error => {
                console.error('There was an error fetching the data:', error);
            });
        }
    
        
        get_articles();
        
    },[]);

    const openUrl = (url) => {
        Linking.canOpenURL(url).then((supported)=>{
            if(supported){
                Linking.openURL(url);
            }else{
                console.log("Unable to open url");
            }
        }).catch(err=>{
            console.error(err);
        })
    }
  return (
    <View style={styles.container}>
        {articles ? articles.map((article,index)=>{
            if(index < 5){
                return (
                    <View style={styles.single_article} key={index}>
                        <Text style={styles.article_name}>Article Name:{article.title}</Text>
                        <TouchableOpacity onPress={() => {
                            openUrl(article.url)
                        }}>
                            <Text style={styles.article_url}>{article.url}</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        }) : (<></>)}
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: '#F4F4F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    single_article: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginBottom: 20,
        padding: 15,
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        width: '100%',
    },
    article_name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 10,
    },
    article_url: {
        fontSize: 14,
        color: '#007BFF',
        textDecorationLine: 'underline',
    },
});
export default Articles
