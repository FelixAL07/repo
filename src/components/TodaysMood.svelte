<script lang="ts">
    import { currentMood } from "../services/moodService";
    import { todaysMood } from "../stores/store";
    $: mood = currentMood($todaysMood)
</script>

<div class="flex items-center justify-center gap-1 sm:gap-2 flex-col">
    <h1 class="text-2xl font-bold">Kontorets humør i dag!</h1>
    <span class="text-4xl transition-transform hover:scale-110 cursor-default">
        {mood}
    </span>
</div>
