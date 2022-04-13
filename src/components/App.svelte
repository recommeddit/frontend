<script lang="ts">
  import ModeSwitcher from "./ModeSwitcher.svelte";
  import Tailwindcss from "./Tailwindcss.svelte";
  import Landing from "./Landing.svelte";
  import SearchList from "./SearchList.svelte";

  let isSearching = false;
  let isLoading = false;
  let error = false;
  let recommendations = [];

  const handleSearch = async ({ detail: query }) => {
    isSearching = true;
    isLoading = true;
    console.log(query);
    const res = await fetch("http://169.231.158.220:8000/search?"
      + new URLSearchParams({ query }));
    if (!res.ok) {
      error = true;
      return;
    }
    const parsedRes = await res.json();
    recommendations = (parsedRes?.recommendations ?? []).map(({ recommendation, images, score, link, comments }) => {
      return {
        keyword: recommendation,
        description: "",
        score,
        imageUrls: images,
        comments: comments.map(comment => ({
          text: comment["body text"],
          score: comment.score,
          authorName: comment["author name"],
          url: comment.permalink
        })),
        link
      };
    });
    isLoading = false;
  };
</script>

<style>
</style>

<Tailwindcss />
<ModeSwitcher />
{#if isSearching}
  <SearchList {isLoading} {error} {recommendations} />
{:else}
  <Landing on:search={handleSearch} />
{/if}
