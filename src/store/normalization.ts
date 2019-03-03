export interface NormalState<T> {
    [id: string]: T;
}

export interface NormalItem {
    id: string;
}

export const normalize = <T extends NormalItem>(items: T[]): NormalState<T> =>
    items.reduce((state, item) => ({ ...state, [item.id]: item }), {});

export const denormalize = <T extends NormalItem>(state: NormalState<T>): T[] =>
    Object.keys(state).map(id => state[id]);

export const setItem = <T extends NormalItem>(newItem: T, state: NormalState<T>): NormalState<T> => ({
    ...state,
    [newItem.id]: newItem
});

export const unsetItem = <T extends NormalItem>(deleteId: string, state: NormalState<T>): NormalState<T> => {
    if (!state[deleteId]) return state;

    const newState = Object.assign({}, state);
    delete newState[deleteId];
    return newState;
};
