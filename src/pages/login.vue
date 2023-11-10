<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input
        v-model="formData.login"
        type="text"
        id="login"
        placeholder="login"
        name="login"
        required
      />

      <input
        v-model="formData.password"
        type="password"
        id="password"
        placeholder="Hasło"
        name="password"
        required
      />

      <button type="submit">Zaloguj się</button>
    </form>

    <div v-if="submitted">
      <p>Zalogowano!</p>
    </div>
    <div v-else>Nie jesteś zalogowany</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
// const config = useRuntimeConfig();
const formData = ref({
  login: 'admin',
  password: '/lWOg]K#F)C#L8',
});

const submitted = ref(false);

const handleSubmit = async () => {
  // Poniżej znajdziesz przykładowy kod do zalogowania się przez API WooCommerce.
  // const consumerKey = 'ck_ddfa72b96e991cce77628fd2c06ad21317c84688';
  // const consumerSecret = 'cs_a24b110fb3c2b276e1d581ef5dda30a22c9699a4';
  // const baseUrl = config.public.yourEnv;

  try {
    // Uzyskaj token JWT
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
    throw error;
  }
};
</script>
