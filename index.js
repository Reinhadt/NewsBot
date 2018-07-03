const Twit = require('twit')
const NewsAPI = require('newsapi')
require('dotenv').config()

const newsapi = new NewsAPI(process.env.NEWS_TOKEN)

const T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

function tuiteo(articulo){

    T.post(
        'statuses/update',
        {status: `${articulo.source.name}: ${articulo.title} ${articulo.url}`},
        (err, data, response) => {
            console.log(err, data, response);
        }
    )
}

function getNotices(){
    newsapi.v2.topHeadlines({
        country: 'mx'
    }).then(response => {
        tuiteo(response.articles[0])
        for(i = 1; i<response.articles.length; i++){
            (function(i){
                console.log("articulo1:" + response.articles[i])
                setTimeout(() => {
                    tuiteo(response.articles[i])
                }, (240*1000)*i);
            })(i);
        }
    })
}

getNotices();
setInterval(getNotices, 14400*1000)