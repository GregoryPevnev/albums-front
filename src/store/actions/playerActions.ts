import { Actions } from "./types";
import Track from "../../application/models/Track";
import { LoopState } from "../../ui/components/player/playerValues";

// Play new Tracklist
export interface PlayTracksAction {
    type: Actions.PlayTracks;
    payload: {
        tracks: Track[];
        start: number;
    };
}

// Position and Random-Usage / Loops

export interface PlayNextAction {
    type: Actions.PlayNext;
}

export interface PlayPrevAction {
    type: Actions.PlayPrev;
}

// Setters

export interface SetRandomAction {
    type: Actions.SetRandom;
    payload: boolean;
}

export interface SetLoopAction {
    type: Actions.SetLoop;
    payload: LoopState;
}

export const playTracks = (tracks: Track[], start: number): PlayTracksAction => ({
    type: Actions.PlayTracks,
    payload: {
        tracks,
        start
    }
});

export const playNext = (): PlayNextAction => ({ type: Actions.PlayNext });
export const playPrev = (): PlayPrevAction => ({ type: Actions.PlayPrev });

export const setRandom = (random: boolean): SetRandomAction => ({ type: Actions.SetRandom, payload: random });
export const setLoop = (loop: LoopState): SetLoopAction => ({ type: Actions.SetLoop, payload: loop });
