<script lang="ts">
    import { todaysMood, emojis, haveClicked, isLoading } from "../stores/store";
    import { currentMood, clickHandler, getLocalStorage } from "../services/moodService";
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";
    import Loader from "./Loader.svelte";

    onMount(async () => {
        const stored = await getLocalStorage();

        if (stored) {
            todaysMood.set(stored);
        }
        $isLoading = false
    });

    $: mood = currentMood($todaysMood);
</script>

<div
    class="flex items-center justify-center gap-3 sm:gap-4 flex-col min-h-[300px] relative"
>
    {#if $isLoading}
    <Loader />
    {:else if  !$haveClicked}
        <div
            transition:fade={{ duration: 200 }}
            class="flex items-center justify-center gap-3 sm:gap-4 flex-col absolute inset-0"
        >
            <div class="flex gap-3 sm:gap-4">
                {#each $emojis as e (e.value)}
                    <button
                        on:click={() => clickHandler(e.value)}
                        class="text-[3rem] sm:text-[4rem] transition-all duration-300 ease-out hover:scale-110 hover:opacity-90 cursor-pointer flex items-center justify-center"
                    >
                        <span>{e.emoji}</span>
                    </button>
                {/each}
            </div>

            <div
                class="flex items-center justify-center gap-1 sm:gap-2 flex-col"
            >
                <h1 class="text-2xl font-bold">Kontorets humør i dag!</h1>
                <span
                    class="text-4xl transition-transform hover:scale-110 cursor-default"
                >
                    {mood}
                </span>
            </div>
        </div>
        
    {:else}
        <div
            transition:fade={{ duration: 300 }}
            class="text-2xl font-bold absolute inset-0 flex items-center justify-center"
        >
            Tusen takk for at du sendte inn!
        </div>
    {/if}
</div>
