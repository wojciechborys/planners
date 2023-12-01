<template>
  <div class="container mx-auto">
    <h2 class="mb-7">Blog</h2>
    <div class="blog grid grid-cols-2 gap-4">
      <!-- Pierwszy element -->
      <div
        v-if="latestPosts.length > 0"
        :key="latestPosts[0].id"
        class="blog__first"
      >
        <div
          class="col-span-2 blog__first--image"
          v-if="latestPosts[0]._embedded['wp:featuredmedia']"
          :style="{
            backgroundImage: `url('${getThumbnailUrl(latestPosts[0])}')`,
          }"
        >
          <h3>{{ latestPosts[0].title.rendered }}</h3>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-4 blog__rest">
        <div
          v-for="(post, index) in latestPosts.slice(1)"
          :key="post.id"
          class="rest"
        >
          <div
            class="col-span-1 blog__rest--image"
            v-if="post._embedded['wp:featuredmedia']"
            :style="{
              backgroundImage: `url('${getThumbnailUrl(post)}')`,
            }"
          >
            <h3>{{ post.title.rendered }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const latestPosts = ref([]);
    const config = useRuntimeConfig();

    const getLatestPosts = async () => {
      try {
        const apiUrl = `${config.public.yourEnv}/wp-json/wp/v2/posts`;
        const response = await axios.get(`${apiUrl}?per_page=5&_embed`);
        latestPosts.value = response.data;
      } catch (error) {
        console.error('Błąd pobierania wpisów:', error);
      }
    };

    const getThumbnailUrl = post => {
      const featuredMedia = post._embedded['wp:featuredmedia'];
      if (featuredMedia && featuredMedia.length > 0) {
        const thumbnail = featuredMedia[0].media_details.sizes.large;
        return thumbnail.source_url;
      }
      return 'https://placekitten.com/300/200';
    };

    onBeforeMount(() => {
      getLatestPosts();
    });

    return {
      latestPosts,
      getThumbnailUrl,
    };
  },
};
</script>
