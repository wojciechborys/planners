<template>
  <div class="container mx-auto">
    <h2 class="mb-7">O nas</h2>
    <div class="about grid grid-cols-2 gap-4">
      <div class="col-span-1 position-relative" v-if="bigPhoto && smallPhoto">
        <img class="about__photo" :src="bigPhoto.source_url" />
        <img class="about__photo--small" :src="smallPhoto.source_url" />
      </div>
      <div class="col-span-1 pl-10 about__description">
        <div v-html="description"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { fetchAcfFromHomepage } from '../../server/api/acf.get.js';
import axios from 'axios';

export default {
  setup() {
    const config = useRuntimeConfig();

    const bigPhoto = ref(null);
    const smallPhoto = ref(null);
    const description = ref(null);

    const fetchAcf = async () => {
      try {
        const fetchedFields = await fetchAcfFromHomepage();
        description.value = fetchedFields.acf.opis;
        bigPhoto.value = await getImageUrl(fetchedFields.acf.foto_1);
        smallPhoto.value = await getImageUrl(fetchedFields.acf.foto_2);
      } catch (error) {
        console.error('Błąd pobierania danych:', error);
      }
    };

    const getImageUrl = async imageId => {
      try {
        const response = await axios.get(
          `${config.public.yourEnv}/wp-json/wp/v2/media/${imageId}`
        );
        const image = response.data;
        return image;
      } catch (error) {
        console.error('Błąd pobierania danych:', error);
        throw error;
      }
    };

    onMounted(() => {
      fetchAcf();
    });

    return {
      getImageUrl,
      bigPhoto,
      smallPhoto,
      description,
    };
  },
};
</script>
