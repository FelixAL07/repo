<script>
  export let size = 80;  // Size in pixels
  export let variant = "default"; // "default", "dots", "bars", "pulse"
</script>

{#if variant === "default"}
  <!-- Orbital Ring Spinner -->
  <div class="relative inline-flex items-center justify-center" style="width: {size}px; height: {size}px;">
    <div class="absolute inset-0 rounded-full border-4 border-amber-200 opacity-40"></div>
    <div class="absolute inset-0 rounded-full border-4 border-transparent border-t-rose-300 animate-spin"></div>
    <div class="absolute inset-2 rounded-full border-4 border-transparent border-t-pink-400 animate-spin" style="animation-duration: 0.8s; animation-direction: reverse;"></div>
    <div class="absolute rounded-full bg-linear-to-br from-amber-200 to-rose-300 blur-sm" 
         style="width: {size * 0.3}px; height: {size * 0.3}px; animation: pulse 2s ease-in-out infinite;"></div>
  </div>

{:else if variant === "dots"}
  <!-- Bouncing Dots -->
  <div class="inline-flex gap-2 items-end" style="height: {size}px;">
    <div class="w-4 h-4 bg-linear-to-br from-amber-200 to-orange-300 rounded-full animate-bounce"></div>
    <div class="w-4 h-4 bg-linear-to-br from-rose-200 to-rose-400 rounded-full animate-bounce" style="animation-delay: 0.1s;"></div>
    <div class="w-4 h-4 bg-linear-to-br from-pink-200 to-pink-400 rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
  </div>

{:else if variant === "bars"}
  <!-- Wave Bars -->
  <div class="inline-flex gap-1.5 items-center" style="height: {size}px;">
    {#each Array(5) as _, i}
      <div class="w-1.5 bg-linear-to-t from-amber-200 to-rose-400 rounded-full"
           style="height: {size * 0.4}px; animation: wave 1.2s ease-in-out infinite; animation-delay: {i * 0.1}s;"></div>
    {/each}
  </div>

{:else if variant === "pulse"}
  <!-- Ripple Pulse -->
  <div class="relative inline-flex items-center justify-center" style="width: {size}px; height: {size}px;">
    <div class="absolute inset-0 rounded-full bg-amber-200 opacity-75 animate-ping"></div>
    <div class="absolute inset-0 rounded-full bg-rose-300 opacity-70 animate-ping" style="animation-delay: 0.5s;"></div>
    <div class="relative rounded-full bg-linear-to-br from-amber-200 to-rose-400" 
         style="width: {size * 0.4}px; height: {size * 0.4}px;"></div>
  </div>
{/if}

<style>
  @keyframes wave {
    0%, 100% { height: 40%; }
    50% { height: 100%; }
  }
</style>