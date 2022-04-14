<script>
  import { fly } from "svelte/transition";

  import { RingLoader } from "svelte-loading-spinners";
  import Comments from "./Comments.svelte";
  import { createEventDispatcher } from "svelte";

  export let recommendations;
  export let isLoading;
  export let error;
  export let isSearching;

  console.log(`isLoading: ${isLoading}`);

  const dispatch = createEventDispatcher();

  let query = "";

  const handleClick = () => {
    dispatch("search", query);
  };

  const goToLanding = () => {
    isSearching = false;
    console.log(isSearching);
    location.reload();
  };

</script>

<header class="bg-gray-900 shadow-sm lg:static lg:overflow-y-visible">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
      <div class="flex md:absolute md:left-0 md:inset-y-0 lg:static" on:click={goToLanding}>
        <div class="flex-shrink-0 flex items-center">
          <a href="/">
            <img
              alt="Workflow"
              class="block h-8 w-auto"
              src="/assets/recommeddit.svg"
            />
          </a>
        </div>
      </div>
      <div
        class="min-w-0 px-0 pt-4 cursor-pointer xl:col-span-2 text-2xl font-bold text-white hover:text-gray-300 pl-20 lg:pl-0 pb-3 lg:pb-0"
      >
        Recommeddit
      </div>
      <div class="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
        <form
          action="#"
          class="sm:max-w-xl sm:mx-auto lg:mx-0"
          on:submit|preventDefault={handleClick}
        >
          <div
            class="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0 hidden lg:flex"
          >
            <div class="w-full">
              <label class="sr-only" for="search">Search</label>
              <div class="relative">
                <input
                  autocomplete="off"
                  bind:value={query}
                  class="block w-full bg-white border border-gray-300 rounded-md py-2 pl-2 pr-3 text-sm placeholder-gray-500  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
                  id="search"
                  placeholder="best ..."
                  type="search"
                />
              </div>
            </div>
            <div class="mt-3 sm:mt-0 sm:ml-3 hidden lg:flex">
              <button
                class="block w-full py-2 px-4 rounded-md shadow bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium hover:from-teal-600 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 focus:ring-offset-gray-900"
                type="submit"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</header>

<div class="text-2xl flex lg:hidden">
  Sorry! Not available on mobile.
</div>

<div class="pl-40 pr-40 pt-10 grid grid-cols-1 gap-10">

  {#if error}
    <div class="exc-item hidden lg:inline">
      <svg width="200" height="200" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 500 0C 224 0 0 224 0 500C 0 776 224 1000 500 1000C 776 1000 1000 776 1000 500C 1000 224 776 0 500 0C 500 0 500 0 500 0M 500 25C 762 25 975 238 975 500C 975 762 762 975 500 975C 238 975 25 762 25 500C 25 238 238 25 500 25C 500 25 500 25 500 25 M 526 150C 576 150 602 175 601 224C 600 300 600 350 575 525C 570 560 560 575 525 575C 525 575 475 575 475 575C 440 575 430 560 425 525C 400 355 400 300 400 226C 400 175 425 150 475 150M 500 650C 527 650 552 661 571 679C 589 698 600 723 600 750C 600 805 555 850 500 850C 445 850 400 805 400 750C 400 723 411 698 429 679C 448 661 473 650 500 650C 500 650 500 650 500 650" />
      </svg>
    </div>
    <div class="error-item text-center hidden lg:inline">
      <p>Sorry, our servers are currently overloaded!</p>
      <p>Please try again later</p>
    </div>
  {:else}
    {#if !isLoading}
      {#each recommendations as recommendation}
        <div
          class="rounded overflow-hidden shadow-lg hidden lg:inline"
          in:fly={{ y: 100, duration: 1000 }}
        >
          <div class="flex gap-4">
            <div class="w-20 h-12 bg-gray-700">
              <p class="text-white text-xl font-thin text-center pt-2">
                {recommendation.score.toFixed(1)}
              </p>
            </div>
            <p class="text-2xl pt-1 pr-10">{recommendation.keyword}</p>
            <!--<div class="border-black border-2 text-center text-2xl pl-5 pr-5 pt-1">
              <a href="{recommendation.link}" class="flex" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-link"
                     viewBox="0 0 16 16">
                  <path
                    d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z" />
                  <path
                    d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z" />
                </svg>
                &nbsp; Check it out here!
              </a>
            </div>-->
          </div>
          <div
            id={recommendation.keyword.split(" ").join("")}
            class="carousel slide relative px-10 py-5"
            data-bs-ride="carousel"
          >
            <div class="carousel-inner relative w-full overflow-hidden">
              {#each recommendation.imageUrls as url,i}
                <div class={`carousel-item ${i===0 ? "active" : ""} relative float-left w-full`} style='height: 81.5vh;'>
                  <img
                    src={url}
                    class="block w-full max-h-[36rem] object-contain"
                    alt="Camera"
                  />
                </div>
              {/each}
            </div>
            <button
              class="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
              type="button"
              data-bs-target={"#".concat("",recommendation.keyword.split(" ").join(""))}
              data-bs-slide="prev"
            >
              <span
                class="back-arrow carousel-control-prev-icon inline-block bg-no-repeat"
                aria-hidden="true"
              />
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
              type="button"
              data-bs-target={"#".concat("",recommendation.keyword.split(" ").join(""))}
              data-bs-slide="next"
            >
              <span
                class="front-arrow carousel-control-next-icon inline-block bg-no-repeat"
                aria-hidden="true"
              />
              <span class="visually-hidden">Next</span>
            </button>
          </div>
          <div class="text-center pb-8 grid grid-cols-1 justify-center">
            <p class="text-2xl">
              Description:
            </p>
            <p class="description">
              {recommendation.description}
            </p>
          </div>
          <div class="pl-10 pr-10 pb-8 grid grid-cols-2 gap-10">
            <Comments comments={recommendation.comments.sort((a, b) => (a.score < b.score) ? 1 : -1)} />
          </div>
        </div>
      {/each}
    {:else}
      <div class="spinner-item">
        <RingLoader size="80" color="#5CE4E9" unit="px" duration="1s" />
      </div>
    {/if}
  {/if}
</div>


<style>
    .exc-item {
        position: absolute;
        left: 42%;
        top: 20%;
        z-index: 9999;
        font-size: xx-large;
    }

    .error-item {
        position: absolute;
        left: 30.75%;
        top: 50%;
        z-index: 9999;
        font-size: xx-large;
    }

    .spinner-item {
        position: absolute;
        left: 47%;
        top: 50%;
        z-index: 9999;
        font-size: xx-large;
    }


    .description {
        padding-left: 200px;
        padding-right: 200px;
    }

    .back-arrow {
        background-color: #43454B;
        background-image: none;
        mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3E%3Cpath d='M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z'/%3E%3C/svg%3E")
    }

    .front-arrow {
        background-color: #43454B;
        background-image: none;
        mask-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3E%3Cpath d='M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z'/%3E%3C/svg%3E")
    }
</style>
