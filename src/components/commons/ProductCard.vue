<template>
  <div class="product-card">
    <img :src="product.images[0].src" />
    <div class="product-card__content">
      <h2 class="product-card__content--title">{{ product.name }}</h2>
      <div
        class="product-card__content--categories"
        v-for="cat in product.categories"
      >
        <span>{{ cat.name }}</span>
      </div>
      <button class="add-to-cart">
        <span>Dodaj do koszyka</span><b v-html="product.price_html"></b>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
defineProps({
  product: Object,
});
const products = ref([]); // Dodaj definicję zmiennej products
</script>
