<template>
  <swiper
    v-if="fields"
    :slides-per-view="1"
    :navigation="true"
    :pagination="{ clickable: true }"
    :modules="modules"
  >
    <swiper-slide v-for="slide in fields.hero" :key="slide.id">
      <div
        class="hero__slider"
        :style="{ backgroundImage: `url('${slide.imageUrl}')` }"
      >
        <div class="container mx-auto">
          <div v-html="slide.text"></div>
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { fetchAcfFromHomepage } from '../server/api/acf.get.js';
import axios from 'axios';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },

  setup() {
    const config = useRuntimeConfig();

    const fields = ref(null);

    const fetchAcf = async () => {
      try {
        const fetchedFields = await fetchAcfFromHomepage();
        fields.value = fetchedFields.acf;

        for (const field of fields.value.hero) {
          if (field.photo) {
            const imageId = field.photo;
            const imageUrl = await getImageUrl(imageId);
            console.log(imageUrl.source_url);
            field.imageUrl = imageUrl.source_url;
          }
        }
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

    onBeforeMount(() => {
      fetchAcf();
    });

    return {
      fields,
      modules: [Navigation, Pagination],
    };
  },
};
</script>
