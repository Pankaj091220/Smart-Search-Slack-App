const { App, LogLevel, subtype } = require('@slack/bolt');
const axios = require('axios');
const dotenv = require('dotenv')
const https = require('https');
dotenv.config();

async function searchWithEinstein(textEntered){
    try {
    
      const headers = {
            "Content-Type": "application/json",
            "X-LLM-Provider": "OpenAI",
            "X-Org-Id" : process.env.EINSTEIN_ORD_ID,
            "Authorization" : "API_KEY "+ process.env.EINSTEIN_API_KEY
           
      }
         
        const body = {
          "prompt": textEntered,
          "temperature": 0.6,
          "max_tokens": 512,
          "model": "text-davinci-003",
          "parameters": {
              "logprobs": 5,
              "echo": true,
              "user": "test-llm-user"
          }
        }
  
  // Axios request configuration
  const axiosConfig = {
    url: 'https://bot-svc-llm.sfproxy.einsteintest1.test1-uswest2.aws.sfdc.cl/v1.0/generations',
    method: 'POST',
    data: body,
    headers: headers,
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
    
  };
  
  var recv="";
  
  // Send the Axios request
  await axios(axiosConfig)
    .then((response) => {
      console.log('Response Received\n');
      console.log(response.data.generations[0].text);
      recv = response.data.generations[0].text; 
  
    })
    .catch((error) => {
      console.error(error);
    });
    
     return recv;
  
  
    } catch (error) {
      console.error('An error occurred while performing the search:', error.message);
    }
  }
  

module.exports ={
    searchWithEinstein
};
  
  
  
  
  
  