import axios from 'axios';

async function fetchInstagram() {
  const config = useRuntimeConfig();

  try {
    const getMediaList = {
      method: 'get',
      url: `${config.public.yourEnv}/wp-json/wp/v2/media`,
    };

    const mediaListRes = await axios(getMediaList);
    const mediaList = mediaListRes.data;

    const getInstagramList = {
      method: 'get',
      url: `${config.public.yourEnv}/wp-json/instagram/v1/opt/?option_name=instagram_photos_ids`,
    };

    const instaListRes = await axios(getInstagramList);
    const instaList = instaListRes.data;

    const matchingIds = [];
    console.log(mediaList);
    mediaList.forEach(media => {
      const matchingOption = instaList.find(option => option === media.slug);

      if (matchingOption) {
        matchingIds.push(media.id);
      }
    });

    console.log(matchingIds);
    return matchingIds;
  } catch (error) {
    console.error(error);
  }
}

export { fetchInstagram };
