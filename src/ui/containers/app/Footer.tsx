import React from "react";
import Player from "../../components/player/Player";
import { connect } from "react-redux";
import Track from "../../../application/models/Track";
import { AppState } from "../../../store/reducers/index";
import { bindActionCreators } from "redux";
import { playNext, playPrev, setRandom, setLoop } from "../../../store/actions/playerActions";
import { LoopState, RandomState } from "../../components/player/playerValues";

interface Props {
    track: Track | null;
    random: boolean;
    loop: LoopState;

    playNext: Function;
    playPrev: Function;

    setLoop: (state: LoopState) => any;
    setRandom: (state: boolean) => any;
}

const FooterComponent = ({ track, random, loop, playNext, playPrev, setLoop, setRandom }: Props) => (
    <Player
        track={track}
        random={random ? RandomState.Random : RandomState.Serial}
        loop={loop}
        onNext={playNext}
        onPrev={playPrev}
        setLoop={() => setLoop(((Number(loop) + 1) % 3) as LoopState)}
        setRandom={() => setRandom(!random)}
    />
);

const Footer = connect(
    ({ player: { currentTrack, random, loop } }: AppState) => ({ track: currentTrack, loop, random }),
    dispatch => bindActionCreators({ playNext, playPrev, setRandom, setLoop }, dispatch)
)(FooterComponent);

export default Footer;
