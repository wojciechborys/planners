<template>
  <div>
    <h1>Jesteś zalogowany</h1>
    <p>Użytkownik: {{ userName }}</p>
    <button @click="logout">Wyloguj się</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const config = useRuntimeConfig();
const userName = ref('');
const userEmail = ref('');
function logout() {
  localStorage.removeItem('authToken');
  navigateTo('/login');
}
onMounted(async () => {
  // Poniżej znajdziesz przykładowy kod do zalogowania się przez API WooCommerce.
  // const consumerKey = 'ck_ddfa72b96e991cce77628fd2c06ad21317c84688';
  // const consumerSecret = 'cs_a24b110fb3c2b276e1d581ef5dda30a22c9699a4';
  // const baseUrl = config.public.yourEnv;

  try {
    const token = localStorage.getItem('authToken');
    const userResponse = await axios.get(
      'https://api.creavity.pl/wp-json/wp/v2/users/me',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const user = userResponse.data; // Pobierz dane z odpowiedzi
    userName.value = user.name;
  } catch (error) {
    console.error('Błąd logowania:', error);
    throw error;
  }
});
</script>
