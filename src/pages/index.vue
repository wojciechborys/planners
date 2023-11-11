<template>
  <main>
    <div class="container mx-auto">
      <ProductsList />
    </div>
  </main>
</template>

<script>
import { useHead } from '#app';
import { definePageMeta } from '#imports';
import ProductsList from '../components/commons/ProductsList.vue';

export default {
  components: {
    ProductsList,
  },
  setup() {
    definePageMeta({
      layout: 'default',
      middleware: ['auth'],
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
  },
};
</script>
