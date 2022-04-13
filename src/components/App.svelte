<script lang="ts">
  import ModeSwitcher from "./ModeSwitcher.svelte";
  import Tailwindcss from "./Tailwindcss.svelte";
  import Landing from "./Landing.svelte";
  import SearchList from "./SearchList.svelte";
  import to from "await-to-js";

  let isSearching = false;
  let isLoading = false;
  let error = false;
  let recommendations = [];

  const handleSearch = async ({ detail: query }) => {
    isSearching = true;
    isLoading = true;
    console.log(query);
    const [err, res] = await to(fetch("https://recommeddit.nrp-nautilus.io/search?"
      + new URLSearchParams({ query })));
    if (err || !res.ok) {
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
    error = true;
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
