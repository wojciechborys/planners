<script setup>
import { ref } from 'vue';
import axios from 'axios';
import InfoError from '../components/commons/baneners/InfoError.vue';
const components = {
  InfoError,
};
// const config = useRuntimeConfig();
const formData = ref({
  login: 'admin',
  password: '/lWOg]K#F)C#L8',
});

const showError = ref(false);

const handleSubmit = async () => {
  // Poniżej znajdziesz przykładowy kod do zalogowania się przez API WooCommerce.
  // const consumerKey = 'ck_ddfa72b96e991cce77628fd2c06ad21317c84688';
  // const consumerSecret = 'cs_a24b110fb3c2b276e1d581ef5dda30a22c9699a4';
  // const baseUrl = config.public.yourEnv;

  try {
    const response = await axios.post(
      'https://api.creavity.pl/wp-json/jwt-auth/v1/token',
      {
        username: formData.value.login,
        password: formData.value.password,
      }
    );
    const token = response.data.token;

    localStorage.setItem('authToken', token);

    await navigateTo('/account');
  } catch (error) {
    console.error('Błąd logowania:', error);
    showError.value = true;
    throw error;
  }
};
</script>

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
            Błąd logowania. Spróbuj jeszcze raz
          </info-error>
        </div>
      </div>
    </form>
  </div>
</template>
