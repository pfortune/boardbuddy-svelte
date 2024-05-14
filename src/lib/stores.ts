import { writable } from "svelte/store";


const getInitialTheme = () => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('theme') || 'skeleton';
    }
    return 'skeleton';
  };
  
  export const themeStore = writable(getInitialTheme());
  
  themeStore.subscribe(value => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', value);
    }
  });