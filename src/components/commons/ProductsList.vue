<script setup>
import { ref, onMounted } from 'vue';
import { fetchBestsellerProducts } from '../../server/api/products.get.js';
import ProductCard from './ProductCard.vue';
const components = {
  ProductCard,
};
const products = ref([]); // Dodaj definicję zmiennej products

const fetchProducts = async () => {
  const fetchedProducts = await fetchBestsellerProducts();
  products.value = fetchedProducts;
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <h2>Najnowsze produkty</h2>
  <div class="product-list__wrapper">
    <div
      class="product-list__single"
      v-for="product in products"
      :key="product.id"
    >
      <ProductCard :product="product" />
    </div>
  </div>
</template>
