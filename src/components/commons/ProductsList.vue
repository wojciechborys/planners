<script setup>
import { ref, onMounted } from 'vue';
import { fetchBestsellerProducts } from '../../server/api/products.get.js';
import ProductCard from './ProductCard.vue';
const components = {
  ProductCard,
};
const products = ref([]);

const fetchProducts = async () => {
  const fetchedProducts = await fetchBestsellerProducts();
  products.value = fetchedProducts;
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div class="container mx-auto">
    <h2 class="mb-7">Najnowsze produkty</h2>
    <div class="product-list__wrapper">
      <div
        class="product-list__single"
        v-for="product in products"
        :key="product.id"
      >
        <ProductCard :product="product" />
      </div>
    </div>
    <div class="text-center mt-10">
      <button
        class="bg-transparent hover:bg-gray-200 text-black-700 font-semibold py-2 px-4 border-2 border-black"
      >
        Zobacz wszystkie produkty
      </button>
    </div>
  </div>
</template>
