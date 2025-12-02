import { writable } from "svelte/store";
import type { Mood } from "../types/mood";

export const todaysMood = writable<number[]>([]);

export const emojis = writable<Mood[]>([
    { emoji: "😡", value: 1 },
    { emoji: "😕", value: 2 },
    { emoji: "🙂", value: 3 },
    { emoji: "😄", value: 4 },
    { emoji: "🤩", value: 5 }
]);

export const haveClicked = writable<boolean>(false)

export const isLoading = writable<boolean>(true)