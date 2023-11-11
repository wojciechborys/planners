import { defineStore } from 'pinia';

export const userToken = defineStore('myStore', {
  state: () => ({
    token: '',
  }),
  actions: {
    setToken(data) {
      this.token = data;
    },
  },
});
