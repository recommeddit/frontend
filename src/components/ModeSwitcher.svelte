<script lang="ts">
  import {onMount} from 'svelte';

  let darkMode = false;
  const THEME_KEY = 'themePreference';

  function setDarkTheme(dark: boolean) {
    darkMode = dark;
    document.documentElement.classList.toggle('dark', darkMode);
  }

  function toggleMode() {
    setDarkTheme(!darkMode);
    window.localStorage.setItem(THEME_KEY, darkMode ? 'dark' : 'light');
  }

  onMount(() => {
    const theme = window.localStorage.getItem(THEME_KEY);
    if (theme === 'dark') {
      setDarkTheme(true);
    } else if (theme == null && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkTheme(true);
    }
  });
</script>
<div class="absolute top-0 right-0 w-8 h-8 p-2" on:click={toggleMode}>

</div>