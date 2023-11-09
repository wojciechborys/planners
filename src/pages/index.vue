<template>
  <div class="container justify-center" v-if="products && products.length">
    <h1 class="md:text-xl mb-5 font-bold">Najnowsze produkty</h1>
    <div v-for="product in products" :key="product.id">
      {{ product.name }}
    </div>
  </div>
</template>

<script>
import { useHead } from '#app';
import { definePageMeta } from '#imports';
import axios from 'axios';
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

    const getNewestProducts = () => {
      console.log(config.public.yourEnv);

      const apiConfig = {
        method: 'get',
        url: `${config.public.yourEnv}/wp-json/wc/v3/products`,
        params: {
          consumer_key: 'ck_ddfa72b96e991cce77628fd2c06ad21317c84688', // Klucz API
          consumer_secret: 'cs_a24b110fb3c2b276e1d581ef5dda30a22c9699a4', // Sekret API
        },
      };

      axios(apiConfig)
        .then(function (response) {
          // Obsłuż odpowiedź z API
          products.value = response.data; // Przypisz dane do products.value
        })
        .catch(function (error) {
          // Obsłuż błąd
          console.error(error);
        });
    };

    onMounted(() => {
      getNewestProducts();
    });

    return {
      products, // Zwróć products jako część wyniku funkcji setup
    };
  },
};
</script>
