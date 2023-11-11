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
import { userToken } from '@/stores/store';

const config = useRuntimeConfig();
const userName = ref('');
const userEmail = ref('');
const global = userToken();
const token = global.token;

definePageMeta({
  layout: 'default',
  middleware: ['auth'],
});

function logout() {
  localStorage.removeItem('auth_token');
  global.setToken('');
  navigateTo('/login?status=logged_out');
}

onMounted(async () => {
  const baseUrl = config.public.yourEnv;
  try {
    const userResponse = await axios.get(`${baseUrl}/wp-json/wp/v2/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = userResponse.data;
    userName.value = user.name;
  } catch (error) {
    console.error('Błąd logowania:', error);
    throw error;
  }
});
</script>
