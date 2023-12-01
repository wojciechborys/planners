import axios from 'axios';

async function fetchAcfFromHomepage() {
  const config = useRuntimeConfig();

  try {
    const apiConfig = {
      method: 'get',
      url: `${config.public.yourEnv}/wp-json/wp/v2/pages/36`,
    };

    const response = await axios(apiConfig);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export { fetchAcfFromHomepage };
