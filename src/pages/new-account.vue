<template>
  <div class="container mx-auto">
    <form class="w-1/2 mx-auto my-36" @submit.prevent="handleSubmit">
      <div class="grid grid-cols-2 gap-4">
        <div class="col-span-2">
          <h2 class="font-medium">Załóż nowe konto</h2>
        </div>
        <div class="col-span-1">
          <input
            v-model="formData.username"
            type="text"
            class="bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-l border-solid border-2 border-gray-300 w-full"
            placeholder="Nazwa użytkownika"
            name="username"
            required
          />
        </div>
        <div class="col-span-1">
          <input
            v-model="formData.email"
            type="email"
            class="bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-l border-solid border-2 border-gray-300 w-full"
            placeholder="Adres email"
            name="email"
            required
          />
        </div>
        <div class="col-span-1">
          <input
            v-model="formData.password"
            type="password"
            class="bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-l border-solid border-2 border-gray-300 w-full"
            placeholder="Hasło"
            name="password"
            required
          />
        </div>
        <div class="col-span-2">
          <p>
            Masz już konto?
            <nuxt-link to="/login">Zaloguj się</nuxt-link>
          </p>
        </div>
        <div class="col-span-2">
          <button
            class="bg-gray-200 hover-bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l w-full"
            type="submit"
          >
            Zarejestruj się
          </button>
        </div>
        {{ error }}
        <div class="col-span-2">
          <info-error v-if="showError">
            Błąd rejestracji. Spróbuj jeszcze raz.
          </info-error>
          <info-success v-if="isLoggedOut">
            Wylogowałeś się ze swojego konta.
          </info-success>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import InfoError from '../components/commons/baneners/InfoError.vue';
import InfoSuccess from '../components/commons/baneners/InfoSuccess.vue';
import { userToken } from '@/stores/store';
import { useRoute } from 'vue-router';

const components = {
  InfoError,
  InfoSuccess,
};
const showError = ref(false);
const global = userToken();
const config = useRuntimeConfig();
const route = useRoute();
const isLoggedOut = route.query.status === 'logged_out';
definePageMeta({
  layout: 'default',
  middleware: ['auth'],
});

const formData = ref({
  username: '',
  email: '',
  password: '',
});

const handleSubmit = async () => {
  const baseUrl = config.public.yourEnv;
  try {
    const apiConfig = {
      method: 'post', // Zmieniamy metodę na POST
      url: `${baseUrl}/wp-json/wc/v3/customers`,
      data: {
        username: formData.value.username,
        email: formData.value.email,
        password: formData.value.password,
      },
      params: {
        consumer_key: config.public.apiPublic,
        consumer_secret: config.public.apiSecret,
      },
    };

    const response = await axios(apiConfig);
    console.log(response);

    const token = response.data.token;
    localStorage.setItem('auth_token', token);
    global.setToken(token);
    await navigateTo('/account');
  } catch (error) {
    console.error('Błąd rejestracji:', error);
    showError.value = true;
    throw error;
  }
};
</script>
