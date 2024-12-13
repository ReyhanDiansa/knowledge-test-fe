import Cookies from 'js-cookie';

// Set a cookie with a 1-day expiration
export const setCookie = (name, value) => {
  Cookies.set(name, value, { expires: 1 });
};

// Get a cookie
export const getCookie = (name) => {
  return Cookies.get(name);
};

// Delete a cookie
export const deleteCookie = (name) => {
  Cookies.remove(name);
};
