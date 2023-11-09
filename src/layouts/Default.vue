<template>
  <div>
    <div class="navbar justify-center">
      <div class="container">
        <div class="navbar-start">
          <a class="btn btn-ghost md:text-xl">Mam Plan!</a>
        </div>
        <div class="navbar-center hidden lg:flex">
          <!-- TODO: You can add menu here -->
        </div>
        <div class="navbar-end text-right">Moje konto</div>
      </div>
    </div>
    <slot />
    <footer class="footer footer-center p-10 bg-base-50">
      <h1>Helloooo!</h1>
    </footer>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const theme = ref(null);

    return {
      theme,
    };
  },
};
</script>
