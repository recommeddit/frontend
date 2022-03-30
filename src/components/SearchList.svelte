<script>
  import { fly } from 'svelte/transition';

  import { RingLoader } from 'svelte-loading-spinners'

  export let recommendations;
  export let isLoading;

  $: console.log(`recommendations: ${recommendations}`);
  $: console.log(`isLoading: ${isLoading}`);
</script>

<style>
  .spinner-item {
    position: fixed;
    left: 800px;
    top: 300px;
    width: 100%;
    height: 100%;
    z-index: 9999;
  }
</style>

<header class="bg-gray-900 shadow-sm lg:static lg:overflow-y-visible">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
      <div class="flex md:absolute md:left-0 md:inset-y-0 lg:static">
        <div class="flex-shrink-0 flex items-center">
          <a href="#">
            <img alt="Workflow"
                 class="block h-8 w-auto"
                 src="/assets/recommeddit.svg">
          </a>
        </div>
      </div>
      <div
        class="min-w-0 px-0 pt-4 xl:col-span-2 text-2xl font-bold text-white hover:text-gray-300">
        Recommeddit
      </div>
      <div class="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
        <div
          class="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
          <div class="w-full">
            <label class="sr-only" for="search">Search</label>
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <!-- Heroicon name: solid/search -->
                <svg aria-hidden="true" class="h-5 w-5 text-gray-400"
                     fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clip-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        fill-rule="evenodd"/>
                </svg>
              </div>
              <input
                class="block w-full bg-white border border-gray-300 rounded-md py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="search"
                name="search"
                placeholder="Search" type="search">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>

<div
  class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
  <!--Card 1-->
  {#if !isLoading}
    {#each recommendations as recommendation}
      <div class="rounded overflow-hidden shadow-lg" in:fly="{{ y: 100, duration: 1000 }}">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{recommendation.keyword}</div>
          <p class="text-gray-700 text-base">
            Score: {recommendation.score}
          </p>
        </div>
      </div>
    {/each}
  {:else}
    <div class = "grid place-items-center h-screen">
      <RingLoader size="80" color="#5CE4E9" unit="px" duration="1s"/>
    </div>
  {/if}
</div>