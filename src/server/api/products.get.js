import axios from 'axios';

async function fetchBestsellerProducts() {
  const config = useRuntimeConfig();

  try {
    const apiConfig = {
      method: 'get',
      url: `${config.public.yourEnv}/wp-json/wc/v3/products`,
      params: {
        consumer_key: config.public.apiPublic,
        consumer_secret: config.apiSecret,
      },
    };

    const response = await axios(apiConfig);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export { fetchBestsellerProducts };
