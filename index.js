const Twit = require('twit')
const NewsAPI = require('newsapi')

const newsapi = new NewsAPI('686325814b5d45088a0ec8963f75d032')

const T = new Twit({
    consumer_key: 'mb29KimXTgpTgzcNaNmEdVAYy',
    consumer_secret: 'yy5D1BEnURXeZaaXSZm1FNq7MRgOPUmJraob1QFkUmeluiPrwF',
    access_token: '938117137549291520-sM2laBsjQ1uibw9jkxN7CzfLJMmk8cW',
    access_token_secret: 'wWrdrnyEoLAq1gw1BNGGcXH5ABAey2IKX5CWCUAYwHYtY',
    timeout_ms: 60*1000
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