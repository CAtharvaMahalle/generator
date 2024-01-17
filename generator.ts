// generator.ts
import axios, { AxiosRequestConfig } from 'axios';
import * as path from 'path';
import * as fs from 'fs-extra';
require('dotenv').config()
var CONFIG = require('./config.json');

const testRoot = __dirname;

const owners = CONFIG.owners

function sendTransaction(apiUrl: string, transaction: any,customerId:any): Promise<void> {
  const customHeaders = {
    'Content-Type': 'application/json',
    'x-api-key': process.env.API_KEY, // Include any necessary authorization headers
    'clientSecret': Buffer.from(customerId).toString('base64'),
  };

  const axiosConfig: AxiosRequestConfig = {
    method: 'post',
    url: apiUrl,
    headers: customHeaders,
    data: transaction,
  };

  return axios(axiosConfig)
    .then((response) => {
      console.log('Request successful:', response.data);
    })
    .catch((error) => {
      console.error('Error making POST request:', error.message);
    });
}

function fetchData() {
  // Fetch real data from your parser instead of reading a static XML file
  // You might use an existing parser library or implement your own parser
  // For now, let's keep it simple and use a placeholder function
  const result = fs.readFileSync(path.join(testRoot, 'data', 'generated.json'), 'utf8');
  // return xml2JS.xml2js(result, { compact: true, textKey: 'value', alwaysChildren: true });
  return JSON.parse(result);
}

export async function generateAndSendTransactions(apiUrl: string, owners:any): Promise<void> {
  let interval:any = CONFIG.DURATION; // 10 minutes
  async function sendTransactions() {
    const transactions = await fetchData();    
    for(const transaction of transactions){
      for (const owner of owners) {
        for (const store of owner?.stores) {
          transaction.storeId = store
          for (let i = 1; i <= 2; i++) {
            transaction.registerId=i;
            await sendTransaction(apiUrl, transaction,owner.customerId);
          }
        }
      }
    }
    
  }

  // Execute the function immediately and then at intervals
  await sendTransactions();
  setInterval(sendTransactions, interval);
}

//Initializing the generator
generateAndSendTransactions(CONFIG.API_URL,owners)
