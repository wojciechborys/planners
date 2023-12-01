import { userToken } from '@/stores/store';

export default function (to, from) {
  const global = userToken();
  const token = global.token;
  if (to.path === '/account' && !token) {
    return navigateTo('/login');
  } else if (to.path === '/login' && token) {
    return navigateTo('/account');
  }
}
