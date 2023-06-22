const axios = require('axios');
const dotenv = require('dotenv')
const https = require('https');
dotenv.config();

async function searchWithCoveo(keyword) {
    try {
      
      const apiKey = process.env.COVEO_API_KEY;
      const organizationId = process.env.COVEO_ORG_ID;
  
  
  
  
      const response = await axios.get(`https://platform.cloud.coveo.com/rest/search/v2?access_token=${apiKey}&organizationId=${organizationId}&q=${encodeURIComponent(keyword)}`);
     
      const results = response.data.results;
     

      const articles = [];
      var cnt=0;
   
      for (const result of results) {
       
        const sourceImage="";
     
        const obj = {
          "ID" : cnt,
          "title" : result.title,
          "URL" : result.clickUri,
          "Desc" : result.excerpt,
          "Source": result.raw.syssource,
          "ImageURL" : sourceImage
        }
  
        if(obj.Source=='Coveo - Docs'){
          obj.ImageURL='https://imgur.com/pcnbqq1.png'
        }else if (obj.Source=='Coveo - YouTube Playlists') {
          obj.ImageURL='https://imgur.com/gcBoRVg.jpg';
        } else {
          obj.ImageURL='https://imgur.com/apEzbKW.png'
        }
  
        articles.push(obj);
        cnt=cnt+1;
       
      }
  
   
      return articles;
      console.log("\n*********************************************\n");
  
    
    } catch (error) {
      console.error('An error occurred while performing the search:', error.message);
    }
  }
module.exports = {
    searchWithCoveo
};

  
  
  
  
  