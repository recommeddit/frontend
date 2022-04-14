<script>
  export let comments = [];

  let current = 4;
</script>

{#each comments.slice(0, current) as comment}
  <a href={"https://" + comment.url} target="_blank" rel="noopener noreferrer">
    <div class="flex">
      <div class="mr-4 flex-shrink-0">
        <div class="w-14 h-14 border-black border-2">
          <img
            src="https://www.transparentpng.com/thumb/up-arrow/Thwv9B-up-arrow-clipart-png-file.png"
            alt="upvote"
            class="pl-3 pr-3"
          />
          <p class="comment">{comment.score}</p>
        </div>
      </div>
      <div>
        <h4 class="text-lg font-bold hover:text-blue-600 hover:underline">{comment.authorName}</h4>
        <p class="mt-1">{comment.text}</p>
      </div>
    </div>
  </a>
{/each}

<style>
    .show {
        background-color: rgb(55 65 81);
        color: white;
        font-size: 1.25rem;
        line-height: 1.75rem;
        font-weight: 100;
        width: 125px;
        height: 50px;
        text-align: center;
        margin-left: 91.5%;
        border-radius: 15px;
    }

    .comment {
        font-size: 1.25rem; /* 20px */
        line-height: 1.75rem;
        text-align: center;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }

</style>
