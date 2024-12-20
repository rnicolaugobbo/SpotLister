import React from "react";
import Track from "./Track";

function TrackList(props) {
    return (
        <div className="track-list">
            {props.tracks.map((track) => {
                return (
                    <Track
                    track={track} 
                    key={track.id} 
                    onAdd={props.onAdd} 
                    isRemoval={props.isRemoval} 
                    onRemove={props.onRemove} />
                )
            })}
        </div>
    );
};

export default TrackList