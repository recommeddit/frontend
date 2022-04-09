<script>
    export let comments = [];

    let current = 2;
</script>

{#each comments.slice(0, current) as comment}
    <a href={comment.url}>
        <div class="flex">
            <div class="mr-4 flex-shrink-0">
                <div class="w-14 h-14 border-black border-2">
                    <img
                        src="images/upvote.svg"
                        alt="upvote"
                        class="pl-4 pt-1 pr-4"
                    />
                    <p class="comment">{comment.score}</p>
                </div>
            </div>
            <div>
                <p class="mt-1">{comment.text}</p>
            </div>
        </div>
    </a>
{/each}
{#if current < comments.length}
    <button
        class="show"
        on:click={() => (current = comments.length)}
        id="loadmore"
        type="button"
    >
        Show More
    </button>
{:else}
    <button
        class="show"
        on:click={() => (current = 2)}
        id="loadmore"
        type="button"
    >
        Show Less
    </button>
{/if}

<style>
    .show{
        background-color: rgb(55 65 81);
        color: white;
        font-size: 1.25rem;
        line-height: 1.75rem;
        font-weight: 100;
        width: 125px;
        height: 50px;
        text-align: center;
        margin-left: 90%;
        border-radius: 15px;
    }

    .comment{
        font-size: 1.25rem; /* 20px */
        line-height: 1.75rem;
        text-align: center;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }

</style>