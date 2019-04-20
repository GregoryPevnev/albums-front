import { SortBy } from "../application/loaders";

export const getSortBy = (search: string): SortBy => {
    const match = search.match(/^\?mode=(top|recent)$/);
    const order = match ? decodeURI(match[1]) : "top";
    return order === "top" ? SortBy.Top : SortBy.Recent;
};

export const getSearch = (search: string) => {
    const match = search.match(/^\?search=(\S+)$/);
    return match && match[1].length > 0 ? decodeURI(match[1]) : null;
};

export const formatSearch = (search: string) => `?search=${encodeURI(search)}`;

// IMPORTANT: Encoding / Decoding for EVERY function
