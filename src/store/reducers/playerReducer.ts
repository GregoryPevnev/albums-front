import { AppAction, Actions } from "../actions/types";
import Track from "../../application/models/Track";
import { LoopState } from "../../ui/components/player/playerValues";

export interface PlayerState {
    // Pseudo-Stacks -> Poping and Pushing (FIRST ELEMENT FOR BOTH)
    nextTracks: Track[];
    prevTracks: Track[];

    currentTrack: Track | null;

    random: boolean;
    loop: LoopState;
}

const defaultState = {
    nextTracks: [],
    prevTracks: [],

    currentTrack: null,

    random: false,
    loop: Number(LoopState.NoLoop)
};

// Important: NOT using classes - BAD IN STATE => Raw arrays

const getRandom = (current: Track | null, tracks: Track[]): number => {
    if (tracks.length === 0) return 0;

    let index = Math.floor(Math.random() * tracks.length);
    while (tracks[index] === current) index = Math.floor(Math.random() * tracks.length);
    return index;
};

const pop = (arr: Track[], i: number) => [...arr.slice(0, i), ...arr.slice(i + 1)];

const push = (arr: Track[], elem: Track | null) => (elem ? [elem, ...arr] : arr);

const reset = ({ random, loop, currentTrack, prevTracks }: PlayerState): PlayerState => {
    const tracks: Track[] = currentTrack ? [...prevTracks.reverse(), currentTrack] : prevTracks.reverse();

    return {
        random,
        loop,
        prevTracks: [],
        currentTrack: null,
        nextTracks: tracks
    };
};

const nextState = (state: PlayerState): PlayerState | null => {
    if (state.nextTracks.length !== 0) return state;
    if (state.loop === LoopState.Loop) return reset(state);
    return null;
};

const orderTracks = (next: Track[], prev: Track[], current: Track | null): Track[] =>
    [...next, ...prev, ...(current ? [current] : [])].sort((t1, t2) => t2.order - t1.order);

const playerReducer = (state: PlayerState = defaultState, action: AppAction): PlayerState => {
    switch (action.type) {
        case Actions.SetLoop:
            return { ...state, loop: action.payload };
        case Actions.SetRandom:
            const { loop, currentTrack, nextTracks, prevTracks } = state;
            if (action.payload) return { loop, random: true, currentTrack, nextTracks, prevTracks };

            // Put everuything back into order

            const ordered = orderTracks(nextTracks, prevTracks, currentTrack);
            if (currentTrack === null)
                return { loop, random: false, currentTrack: ordered[0], nextTracks: ordered.slice(1), prevTracks: [] };

            const i = ordered.indexOf(currentTrack);
            return {
                loop,
                random: false,
                currentTrack: ordered[i],
                prevTracks: ordered.slice(0, i),
                nextTracks: ordered.slice(i + 1)
            };

        case Actions.PlayNext:
            const newState = nextState(state);
            if (newState === null) return state;

            const index = newState.random ? getRandom(state.currentTrack, newState.nextTracks) : 0;

            const result = {
                ...newState,
                prevTracks: push(newState.prevTracks, newState.currentTrack),
                currentTrack: newState.nextTracks[index],
                nextTracks: pop(newState.nextTracks, index)
            };

            return result;

        case Actions.PlayPrev:
            if (state.prevTracks.length === 0) return state;
            return {
                ...state,
                prevTracks: state.prevTracks.slice(1),
                currentTrack: state.prevTracks.length === 0 ? null : state.prevTracks[0],
                nextTracks: push(state.nextTracks, state.currentTrack)
            };

        case Actions.PlayTracks:
            const { tracks, start } = action.payload;
            return {
                ...state,
                currentTrack: tracks[start],
                nextTracks: tracks.slice(start + 1),
                prevTracks: tracks.slice(0, start).reverse()
            };

        default:
            return state;
    }
};

export default playerReducer;
