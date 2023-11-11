<template>
  <div class="container mx-auto">
    <form class="w-1/2 mx-auto my-36" @submit.prevent="handleSubmit">
      <div class="grid grid-cols-2 gap-4">
        <div class="col-span-2">
          <h2 class="font-medium">Zaloguj się do swojego konta</h2>
        </div>
        <div class="col-span-1">
          <input
            v-model="formData.login"
            type="text"
            class="bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-l border-solid border-2 border-gray-300 w-full"
            id="login"
            placeholder="Login"
            name="login"
            required
          />
        </div>
        <div class="col-span-1">
          <input
            v-model="formData.password"
            type="password"
            class="bg-gray-100 text-gray-800 font-medium py-2 px-4 rounded-l border-solid border-2 border-gray-300 w-full"
            id="password"
            placeholder="Hasło"
            name="password"
            required
          />
        </div>
        <div class="col-span-2">
          <p>
            Zapomniałeś hasła?
            <nuxt-link to="/reset-password">Zresetuj hasło</nuxt-link>
          </p>
          <p>
            Nie masz konta?
            <nuxt-link to="/new-account">Załóż konto</nuxt-link>
          </p>
        </div>
        <div class="col-span-2">
          <button
            class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l w-full"
            type="submit"
          >
            Zaloguj się
          </button>
        </div>
        {{ error }}
        <div class="col-span-2">
          <info-error v-if="showError">
            Błąd logowania. Spróbuj jeszcze raz.
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
  login: 'admin',
  password: '/lWOg]K#F)C#L8',
});

const handleSubmit = async () => {
  const baseUrl = config.public.yourEnv;
  try {
    const response = await axios.post(`${baseUrl}/wp-json/jwt-auth/v1/token`, {
      username: formData.value.login,
      password: formData.value.password,
    });

    const token = response.data.token;
    localStorage.setItem('auth_token', token);
    global.setToken(token);
    await navigateTo('/account');
  } catch (error) {
    console.error('Błąd logowania:', error);
    showError.value = true;
    throw error;
  }
};
</script>
