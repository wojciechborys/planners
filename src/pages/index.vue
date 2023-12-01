<template>
  <main>
    <HeroSlider />
    <ProductsList class="mt-28" />
    <PostsList class="mt-28" />
    <AboutSection class="mt-28" />
    <InstagramSection class="mt-48" />
  </main>
</template>

<script>
import { useHead } from '#app';
import { definePageMeta } from '#imports';
import ProductsList from '../components/commons/ProductsList.vue';
import HeroSlider from '../components/HeroSlider.vue';
import PostsList from '../components/sections/PostsList.vue';
import AboutSection from '../components/sections/AboutSection.vue';
import InstagramSection from '../components/sections/InstagramSection.vue';
export default {
  components: {
    ProductsList,
    HeroSlider,
    PostsList,
    AboutSection,
    InstagramSection,
  },
  setup () {
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
