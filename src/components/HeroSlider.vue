<template>
  <swiper
    v-if="fields"
    :slides-per-view="1"
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="slide in fields.hero"
      ><div v-html="slide.text"></div
    ></swiper-slide>
  </swiper>
  <div v-else>
    <!-- Obszar, który będzie wyświetlany, jeśli fields jest puste -->
    Brak dostępnych pól.
  </div>
</template>
<script>
import { ref, onBeforeMount } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { fetchAcfFromHomepage } from '../server/api/acf.get.js';
import 'swiper/css';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },

  setup() {
    const fields = ref(null);

    const fetchAcf = async () => {
      console.log('Przed fetchAcf'); // Dodaj ten console log
      try {
        const fetchedFields = await fetchAcfFromHomepage();
        fields.value = fetchedFields.acf;
        console.log('Fields:', fields.value);
      } catch (error) {
        console.error('Błąd pobierania danych:', error);
      }
    };

    onBeforeMount(() => {
      fetchAcf();
    });

    return {
      fields,
    };
  },
};
</script>
