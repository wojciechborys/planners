<script setup>
import { ref, onMounted } from 'vue';
import { fetchBestsellerProducts } from '../../server/api/products.get.js';

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
  <h1 class="md:text-xl mb-5 font-bold">Najnowsze produkty</h1>
  <div v-for="product in products" :key="product.id">
    {{ product.name }}
  </div>
</template>
