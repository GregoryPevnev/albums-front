import React, { Component } from "react";
import ProgressBar from "./ProgressBar";
import Track from "../../../application/models/Track";
import { LoopState, RandomState } from "./playerValues";

// IMPORTANT: A standalone component -> More reusable

const MAX_LENGTH = 50;

interface Props {
    track: Track | null;
    loop: LoopState;
    random: RandomState;

    onNext: Function;
    onPrev: Function;

    setRandom: Function;
    setLoop: Function;
}

interface State {
    loading: boolean; // SUPER-IMPORTANT: Acts as a Lock for Concurrent updates (Prevents setting multiple tracks simultanuously)
    // Additional: Prevents skipping tracks on Track-Finish (Asynchronous checks and updates)

    playing: boolean;

    currentTime: number;
    totalTime: number;

    currentTrack: string | null;
    audio: HTMLAudioElement | null;
}

const formatTime = (seconds: number) => {
    const secs = Math.ceil(seconds % 60);
    return `${Math.floor(seconds / 60)}:${secs > 9 ? secs : "0" + secs}`;
};

class Player extends Component<Props, State> {
    private static readonly DEFAULT_TEXT = "No Track Selected";

    private listener: any;

    private stop() {
        const prev: any = this.state.audio;

        if (prev !== null) {
            prev.pause();
            prev.remove();
        }
    }

    private setPlaying(playing: boolean) {
        if (this.props.track === null) return null;

        const audio: any = this.state.audio;

        if (!playing) audio.pause();
        else audio.play();

        this.setState(() => ({ playing }));
    }

    private update() {
        if (!this.props.track) return;

        this.setState(() => ({ loading: true }));
        this.stop();

        const url = this.props.track.object;
        const audio = new Audio(url);

        audio.play().then(() => {
            this.setState(() => ({
                audio,
                totalTime: audio.duration,
                currentTrack: url,
                currentTime: 0
            }));

            audio.addEventListener("timeupdate", this.listener);

            this.setPlaying(true);

            this.setState(() => ({ loading: false }));
        });
    }

    private replay() {
        const audio: any = this.state.audio;
        audio.currentTime = 0;
        this.setState(() => ({ currentTime: 0 }));
        audio.play();
    }

    private setTime(time: number) {
        this.setState(() => ({ currentTime: time }));

        const audio: any = this.state.audio;
        audio.currentTime = time;
    }

    private getTitle(): string {
        const { loading } = this.state;
        const { track } = this.props;

        if (loading) return "Loading...";
        if (!track) return Player.DEFAULT_TEXT;

        return track.name.length > MAX_LENGTH ? track.name.slice(0, MAX_LENGTH) + "..." : track.name;
    }

    private getLooper() {
        const { loop, setLoop } = this.props;

        const titles = ["No Loop", "Loop", "Loop Locked"];

        return (
            <button
                className={`btn btn--toggle ${loop === LoopState.NoLoop ? "" : "active"}`}
                onClick={() => setLoop()}
            >
                <i
                    className={`fas ${loop === LoopState.LoopOne ? "fa-reply-all" : "fa-reply"}`}
                    title={titles[Number(loop)]}
                />
            </button>
        );
    }

    private getRandom() {
        const { random, setRandom } = this.props;

        const titles = ["Ordered", "Random"];

        return (
            <button
                className={`btn btn--toggle ${(random === RandomState.Random && "active") || ""}`}
                onClick={() => setRandom()}
                title={titles[Number(random)]}
            >
                <i className="fas fa-random" />
            </button>
        );
    }

    constructor(props: Props) {
        super(props);

        this.listener = () => {
            const audio: any = this.state.audio;
            this.setState(() => ({ currentTime: audio ? audio.currentTime : 0 }));
            if (audio.currentTime === audio.duration && !this.state.loading) {
                if (this.props.loop === LoopState.LoopOne) this.replay();
                else this.props.onNext();
            }
        };
    }

    public state = {
        playing: false,
        loading: false,
        currentTime: 0,
        totalTime: 0,
        audio: null,
        currentTrack: null
    };

    public componentDidUpdate(prevProps: Props, prevState: State) {
        const current = this.props.track,
            prev = prevProps.track;

        if (current === null || this.state.loading) return;

        if (prev === null || prev.object !== current.object) this.update();
    }

    public componentDidMount() {
        this.update();
    }

    public componentWillUnmount() {
        const audio: any = this.state.audio;
        if (audio !== null) audio.removeEventListener("timeupdate", this.listener);
    }

    public render() {
        const { track, random, loop, setRandom, setLoop, onNext, onPrev } = this.props;
        const { playing, currentTime, totalTime, loading } = this.state;

        const isActive = !!(track && !loading); // IMPORTANT: BOTH FACTORS

        return (
            <div className="player">
                <p className="player__title" title={track ? track.name : Player.DEFAULT_TEXT}>
                    {this.getTitle()}
                </p>

                <div className="player__bar">
                    <ProgressBar
                        currentTime={currentTime}
                        totalTime={totalTime}
                        onChange={this.setTime.bind(this)}
                        isActive={!!this.state.audio}
                        onDragging={dragging => this.setPlaying(!dragging)}
                    />
                    <p className="player__time player__time--start">{formatTime(currentTime)}</p>
                    <p className="player__time player__time--end">{formatTime(totalTime)}</p>
                </div>

                <div className="player__btns">
                    <button className="btn" onClick={() => isActive && onPrev()} disabled={!isActive}>
                        <i className="fas fa-backward" />
                    </button>
                    <button
                        className="btn btn--primary"
                        onClick={() => this.setPlaying(!this.state.playing)}
                        disabled={!isActive}
                    >
                        {!playing ? <i className="fas fa-play" /> : <i className="fas fa-pause" />}
                    </button>
                    <button className="btn" onClick={() => isActive && onNext()} disabled={!isActive}>
                        <i className="fas fa-forward" />
                    </button>
                </div>

                <div className="player__options">
                    {this.getLooper()}
                    {this.getRandom()}
                </div>
            </div>
        );
    }
}

export default Player;
