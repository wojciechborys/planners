<template>
  <div>
    <NavHeader />
    <slot />
    <NavFooter />
  </div>
</template>

<script>
import NavHeader from '../components/NavHeader.vue';
import NavFooter from '../components/NavFooter.vue';
import { userToken } from '@/stores/store';
export default {
  components: {
    NavHeader,
    NavFooter,
  },

  setup() {
    if (process.client) {
      const global = userToken();
      const token = localStorage.getItem('auth_token');
      global.setToken(token);
    }
  },
};
</script>
