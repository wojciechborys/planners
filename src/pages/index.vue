<template>
  <main>
    <HeroSlider />
    <ProductsList class="mt-28" />
    <PostsList class="mt-28" />
  </main>
</template>

<script>
import { useHead } from '#app';
import { definePageMeta } from '#imports';
import ProductsList from '../components/commons/ProductsList.vue';
import HeroSlider from '../components/HeroSlider.vue';
import PostsList from '../components/commons/PostsList.vue';
export default {
  components: {
    ProductsList,
    HeroSlider,
    PostsList,
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
