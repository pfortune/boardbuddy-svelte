import { writable } from 'svelte/store';
import type { Session } from '$lib/types/boardbuddy-types';

export const subTitle = writable<string>();
export const currentSession = writable<Session>();
export const isAdmin = writable<boolean>(false);

export function updateAdminStatus(role: string) {
    isAdmin.set(role === 'admin');
}