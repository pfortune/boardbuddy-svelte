import { writable } from "svelte/store";
import type { Session } from "$lib/types/boardbuddy-types";

export const subTitle = writable<string>();
export const currentSession = writable<Session>();
