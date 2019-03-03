export const sleep = (time: number) => new Promise(res => setTimeout(() => res(), time));

export const distinct = (arr: string[]) => Array.from(new Set(arr));
