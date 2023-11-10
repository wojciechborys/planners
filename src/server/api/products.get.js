import axios from 'axios';

async function fetchNewestProducts () {
  try {
    const apiConfig = {
      method: 'get',
      url: `${config.public.yourEnv}/wp-json/wc/v3/products`,
      params: {
        consumer_key: 'ck_ddfa72b96e991cce77628fd2c06ad21317c84688',
        consumer_secret: 'cs_a24b110fb3c2b276e1d581ef5dda30a22c9699a4',
      },
    };

    const response = await axios(apiConfig);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
