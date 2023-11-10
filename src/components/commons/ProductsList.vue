<h1 class="md:text-xl mb-5 font-bold">Najnowsze produkty</h1>
<div v-for="product in products" :key="product.id">
      {{ product.name }}
    </div>
