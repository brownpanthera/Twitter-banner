require('dotenv').config()

const { TwitterClient } =require('twitter-api-client');

const fs = require('fs')

const twitterClient = new TwitterClient({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
  });


module.exports.uploadImage  = async function() {
    const imageAsBase64 = fs.readFileSync('./test.png', 'base64');

    try {
        var res = await twitterClient.accountsAndUsers.accountUpdateProfileBanner({banner: imageAsBase64})
        return res;
    } catch (error) {
        return error;
    }  
   
}
