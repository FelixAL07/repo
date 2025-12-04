<script lang="ts">
    import { currentMood } from "../services/moodService";
    import { todaysMood } from "../stores/store";
    let mood: string = "";
    $: mood = currentMood($todaysMood);
</script>

<div class="flex items-center justify-center gap-1 sm:gap-2 flex-col">
    <h1 class="text-2xl font-bold">Kontorets humør i dag!</h1>
   <!-- Smaller text if it isnt any votes yet --> 
    {#if mood === "Ingen har avgitt stemme for idag"}
        <span class="text-[1rem] sm:text-[2rem] transition-all duration-300 ease-out hover:scale-110 hover:opacity-90 cursor-pointer flex items-center justify-center">
            {mood}
        </span>
    {:else}
        <span class="text-[3rem] sm:text-[4rem] transition-all duration-300 ease-out hover:scale-110 hover:opacity-90 cursor-pointer flex items-center justify-center">
            {mood}
        </span>
    {/if}
</div>
