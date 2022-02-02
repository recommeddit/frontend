<script lang="ts">
  import {createEventDispatcher} from 'svelte';

  const dispatch = createEventDispatcher();

  let query = "";
  let suggestions = []

  const handleClick = () => {
    dispatch('search', query);
  }

  const handleSuggest = async () =>{
    query = query.trimStart()
    if(query.length>0){
      const res = await fetch("https://us-central1-recommeddit.cloudfunctions.net/auto_suggest?"
      + new URLSearchParams({query}));
      const parsedRes = await res.json();
      suggestions = parsedRes.suggest;
    }else{
      suggestions = []
    }
  }

  const handleChange = (result) =>{
    document.getElementById("search").focus();
    query = result.replace(/<[^>]*>?/gm, '')
    suggestions=[]
  }


</script>

<div class="bg-white">
  <div class="relative">
    <header class="relative">
      <div class="bg-gray-900 pt-6">
        <nav aria-label="Global"
             class="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6">
          <div class="flex items-center flex-1">
            <div class="flex items-center justify-between w-full md:w-auto">
              <a href="#">
                <span class="sr-only">Recommeddit</span>
                <img alt=""
                     class="h-8 w-auto sm:h-10"
                     src="/assets/recommeddit.svg">
              </a>
              <div class="-mr-2 flex items-center md:hidden">
                <button aria-expanded="false"
                        class="bg-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white"
                        type="button">
                  <span class="sr-only">Open main menu</span>
                  <svg aria-hidden="true" class="h-6 w-6" fill="none"
                       stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2"/>
                  </svg>
                </button>
              </div>
            </div>
            <div class="hidden space-x-8 md:flex md:ml-10">
              <a class="text-2xl font-bold text-white hover:text-gray-300"
                 href="#">Recommeddit</a>
            </div>
          </div>
        </nav>
      </div>
    </header>
    <main class="bg-gray-900">
      <div class="bg-gray-900 sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden h-screen">
        <div class="mx-auto max-w-7xl lg:px-8">
          <div class="lg:grid lg:grid-cols-2 lg:gap-8">
            <div
              class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
              <div class="lg:py-10">
                <h1
                  class="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                  <span class="block">A better way to</span>
                  <div class="pb-3 bg-clip-text bg-gradient-to-r from-teal-200 to-cyan-400 sm:pb-5">
                    <span class="block">
                    discover movies
                    </span>
                  </div>
                </h1>
                <p class="text-base text-gray-300 sm:text-xl lg:text-lg xl:text-xl">
                  Our AI-powered recommendation algorithm will search and aggregate top
                  movie recommendations from Reddit
                </p>
                <div class="mt-10 sm:mt-12">
                  <form action="#" class="sm:max-w-xl sm:mx-auto lg:mx-0"
                        on:submit|preventDefault={handleClick}>
                    <div class="sm:flex">
                      <div class="min-w-0 flex-1">
                        <label class="sr-only" for="search">Searching</label>
                        <input
                          autocomplete="off"
                          bind:value={query}
                          on:input={handleSuggest}
                          on:blur={(e)=>console.log(e)}
                          class="block w-full px-4 py-3 rounded-md border-0 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
                          id="search"
                          placeholder="best movies to watch after ..."
                          type="search"
                        >
                      </div>
                      <div class="mt-3 sm:mt-0 sm:ml-3">
                        <button
                          class="block w-full py-3 px-4 rounded-md shadow bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
                          type="submit">
                          Search
                        </button>
                      </div>
                    </div>
                  </form>
                  <div>
                  <ul class="divide-y divide-gray-100 mt-2">
                    {#each suggestions as suggest}
                    <li class="py-2 flex bg-gray-900 hover:bg-gray-800" on:click={()=>handleChange(suggest)}>
                      <div class="ml-4">
                        <p class="text-sm font-medium text-gray-100 cursor-default">{@html suggest}</p>
                      </div>
                    </li>
                    {/each}
                  </ul>
                </div>
              </div>
            </div>
            <div class="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
              <div class="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                <!-- Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ -->
                <img
                  alt=""
                  class="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  src="/assets/background.svg">
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>
