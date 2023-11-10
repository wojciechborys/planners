<template>
  <div>
    <NavHeader />
    <slot />
    <NavFooter />
  </div>
</template>

<script>
import { ref } from 'vue';
import NavHeader from '../components/NavHeader.vue';
import NavFooter from '../components/NavFooter.vue';
export default {
  components: {
    NavHeader,
    NavFooter,
  },
  setup() {
    const theme = ref(null);

    return {
      theme,
    };
  },
};
</script>
