<template>
  <div class="container mx-auto">
    <h2 class="mb-7">Instagram</h2>
    <div class="instagram grid grid-cols-4 gap-2">
      <div
        class="col-span-1 position-relative"
        v-for="(photo, index) in photos"
        :key="index"
      >
        <img :src="photo.source_url" />
      </div>
    </div>
    <div class="text-center mt-10">
      <button
        class="bg-transparent hover:bg-gray-200 text-black-700 font-semibold py-2 px-4 border-2 border-black"
      >
        Zobacz naszego Instagrama
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { fetchInstagram } from '../../server/api/instagram.get.js';
import axios from 'axios';

export default {
  setup() {
    const config = useRuntimeConfig();

    const photos = ref([]);

    const fetchOptions = async () => {
      try {
        const fetchedFields = await fetchInstagram();
        const photoPromises = fetchedFields.map(image => getImageUrl(image));
        const resolvedPhotos = await Promise.all(photoPromises);
        console.log(resolvedPhotos);
        photos.value = resolvedPhotos;
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
      fetchOptions();
    });

    return {
      getImageUrl,
      photos,
    };
  },
};
</script>
