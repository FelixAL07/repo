<script>
  /* Gotten from AI, just to have a loading bar and i couldnt find any good ones online*/

  export let size = 80;  // Size in pixels
</script>

  <!-- Orbital Ring Spinner -->
  <div class="relative inline-flex items-center justify-center" style="width: {size}px; height: {size}px;">
    <div class="absolute inset-0 rounded-full border-4 border-amber-200 opacity-40"></div>
    <div class="absolute inset-0 rounded-full border-4 border-transparent border-t-rose-300 animate-spin"></div>
    <div class="absolute inset-2 rounded-full border-4 border-transparent border-t-pink-400 animate-spin" style="animation-duration: 0.8s; animation-direction: reverse;"></div>
    <div class="absolute rounded-full bg-linear-to-br from-amber-200 to-rose-300 blur-sm" 
         style="width: {size * 0.3}px; height: {size * 0.3}px; animation: pulse 2s ease-in-out infinite;"></div>
  </div>
  
<style>
  @keyframes wave {
    0%, 100% { height: 40%; }
    50% { height: 100%; }
  }
</style>