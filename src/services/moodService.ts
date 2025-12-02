import { get } from "svelte/store";
import { emojis, todaysMood, haveClicked } from "../stores/store";

export const currentMood = (values: number[]): string => {
    const emojiList = get(emojis);
    if (!values.length) return "Ingen har avgitt stemme for idag";

    const countMap = new Map<number, number>();
    let best = values[0];
    let max = 0;

    for (const value of values) {
        const count = (countMap.get(value) ?? 0) + 1;
        countMap.set(value, count);
        if (count > max) {
            best = value;
            max = count;
        }
    }

    const match = emojiList.find((item) => item.value === best);
    return match ? match.emoji : "❓";
};

export function clickHandler(value: number) {

    todaysMood.update((data) => [...data, value]);
    haveClicked.set(true)
    setLocalStorage();
    setTimeout(() => {
        haveClicked.set(false)
    }, 5000);
}

export async function getLocalStorage() {
    const raw = localStorage.getItem("todaysMood");
    if (!raw) return null;

    try {
        const data = JSON.parse(raw);

        if (!data.expiresAt || Date.now() > data.expiresAt) {
            localStorage.removeItem("todaysMood");
            return null;
        }

        return data.mood;

    } catch {
        return null;
    }
}

function setLocalStorage() {
    const expiresAt = getEndOfToday()

    const mood = get(todaysMood);

    localStorage.setItem("todaysMood", JSON.stringify({
        mood,
        expiresAt
    }));
}

function getEndOfToday(): number {
    const now = new Date();
    const end = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23, 59, 59, 999
    );
    return end.getTime();
}