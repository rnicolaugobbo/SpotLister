import React, { useCallback } from "react";

function Track(props) {
    return (
        <div className="track">
            <div className="track-info">
                <h3>{props.track.name}</h3>
                <p>
                    {props.track.artist} | {props.track.album}
                </p>
            </div>
        </div>
    )
}

export default Track