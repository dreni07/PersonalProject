import React,{useState,useEffect} from 'react'
import {View,Text,Linking,TouchableOpacity,StyleSheet} from 'react-native'
import { Dimensions } from 'react-native';

// Get the screen width
const screenWidth = Dimensions.get('window').width;

// Calculate 30% of the screen width
const thirtyPercentOfWidth = screenWidth * 0.30;


const Articles = () => {
    const [articles,setArticles] = useState([]);
    useEffect(()=>{
        const apiKey = '42a7eecaf51644388f31b06fc8d6e801'; // Replace with your own API key from NewsAPI
    
    // Define the language you want to filter by (e.g., 'en' for English, 'fr' for French)
        const language = 'fr';
    
    // Define the NewsAPI endpoint for fetching articles
        const url = `https://newsapi.org/v2/everything?q=*&language=${language}&apiKey=${apiKey}`;
    
    // Use fetch to get the data from NewsAPI
        fetch(url)
        .then(response => {
            // Check if the response is OK
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();  // Parse the JSON response
        })
        .then(data => {
            // Log the articles to the console
            const articles = data.articles;
            setArticles(articles);
            // console.log(`Found ${articles.length} articles:`);
        
            // Display the articles in the console
            // articles.forEach((article, index) => {
            // console.log(`${index + 1}. ${article.title}`);
            // console.log(`   Source: ${article.source.name}`);
            // console.log(`   URL: ${article.url}`);
            // console.log('------------------------');
            // });
        })
        .catch(error => {
            console.error('There was an error fetching the data:', error);
        });
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
        marginTop: 10,
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',  // Spread out the articles evenly
        flexWrap: 'wrap',  // Allow wrapping if necessary
    },
    single_article: {
        width: thirtyPercentOfWidth,  // 30% of the screen width
        height: 100,  // Fixed height for each article
        flexShrink: 0,  // Prevent shrinking of the article
        flexGrow: 0,  // Prevent the article from growing
        backgroundColor:'white',
        textAlign:'center',
        height:'120px',
        borderRadius:2
    },
    article_name:{
        color:'#333',
        textAlign:'center',
        marginTop:10,
        fontSize:'12px'
    },
    article_url:{
        color:'#333',
        textAlign:'center',
        marginTop:10,
        fontSize:'10px',
        color:'blue'
    }
})
export default Articles
