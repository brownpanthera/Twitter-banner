require('dotenv').config()

const needle = require("needle");
const express = require("express");

const {generateImage} = require('./lib/canvas');
const {uploadImage} = require('./lib/upload');

const app = express();

app.set("port", process.env.PORT || 8080);

app.use(express.urlencoded({extended: true})); 
app.use(express.json());


app.get("/",(req,res)=>{
    res.json({status:"ok"});
})


setInterval(async() => {

  const token = process.env.BEARER_TOKEN 
  token.replace(/\r?\n|\r/g, '')

  const auth_headers = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json',
    },
    timeout: 20000,
  }

  const userId = "906370059097972737";

  console.log(auth_headers)

  let response = await needle('get', `https://api.twitter.com/1.1/users/show.json?user_id=${userId}`, {}, auth_headers)
    
  if (response.body ) {
    try{
      await generateImage(response.body.followers_count)
      uploadImage();
    }catch(err){
      console.log(err);
    }
  }
  
}, 6000);

app.listen(app.get("port"), () => {
    console.log("Listeneing at port 8080");
});


