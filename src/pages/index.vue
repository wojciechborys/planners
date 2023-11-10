<template>
  <div
    class="container justify-center"
    v-if="products && products.length"
  ></div>
</template>

<script>
import { useHead } from '#app';
import { definePageMeta } from '#imports';
import { onMounted, ref } from 'vue'; // Dodaj ref

export default {
  setup() {
    const config = useRuntimeConfig();
    const products = ref([]); // Zadeklaruj products jako ref

    definePageMeta({
      layout: 'default',
    });

    useHead({
      title: 'Mam Plan! - planery, notesy, akcesoria',
      description: 'Lorem ipsum',
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
      meta: [
        {
          hid: 'og:image',
          name: 'og:image',
          property: 'og:image',
        },
      ],
    });

    onMounted(() => {
      getNewestProducts();
    });

    return {
      products,
    };
  },
};
</script>
