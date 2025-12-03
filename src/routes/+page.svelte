<script>
    /*Background styling gotten from AI*/

    import Moodmeter from "../components/Moodmeter.svelte";
    import TodaysMood from "../components/TodaysMood.svelte";
</script>
<main
    class="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,#fde68a,#fca5a5,#fbcfe8)]"
>
    <div class="relative z-10 w-full max-w-4xl px-6">
        <div
            class="rounded-3xl border border-white/40 bg-white/70 p-8 shadow-2xl backdrop-blur-xl transition-transform duration-500 ease-out hover:-rotate-1 hover:scale-[1.02]"
        >
            <!-- Today's Mood at the top -->
            <div class="mb-4">
                <TodaysMood />
            </div>

            <!-- Divider -->
            <div class="h-px bg-linear-to-r from-transparent via-gray-300/50 to-transparent mb-2"></div>

            <!-- Mood Meter below -->
            <Moodmeter />
        </div>
    </div>
    <span class="absolute right-1/7 top-1/8 text-5xl opacity-30 drop-shadow animate-float-slow">😊</span>
    <span class="absolute left-10 top-12 text-5xl opacity-30 drop-shadow animate-float-slow">😄</span>
    <span class="absolute bottom-16 right-16 text-6xl opacity-20 drop-shadow animate-float">🤩</span>
    <span class="absolute left-1/3 bottom-10 text-4xl opacity-25 drop-shadow animate-float-delayed">🙂</span>
</main>