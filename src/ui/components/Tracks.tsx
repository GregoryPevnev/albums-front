import React from "react";
import Track from "../../application/models/Track";
import Loading from "./Loading";

interface Props {
    loading: boolean;
    error: string | null;
    tracks: Track[];

    onPlay: (i: number) => any;
}

const Tracks = ({ tracks, loading, error, onPlay }: Props) => {
    if (loading) return <Loading>Loading Tracks...</Loading>;
    if (error) return <p className="error">Could not load tracks</p>;
    return (
        <div className="tracks">
            {tracks
                .sort((t1, t2) => t1.order - t2.order)
                .map(({ name, order, id }, i) => (
                    <p key={id} className="tracks__track" onClick={() => onPlay(i)}>
                        <span className="tracks__number">{order}</span>
                        <span>{name}</span>
                    </p>
                ))}
            <button className="btn btn--primary" onClick={() => onPlay(0)} style={{ marginTop: 15 }}>
                Play Album
            </button>
        </div>
    );
};

export default Tracks;
