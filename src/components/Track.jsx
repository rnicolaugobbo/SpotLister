import React, { useCallback } from "react";

function Track(props) {
    const addTrack = useCallback((event) => {
        props.onAdd(props.track);
    }, [props.onAdd, props.track]);

    const removeTrack = useCallback((event) => {
        props.onRemove(props.track);
    }, [props.onRemove, props.track]);

    const renderAction = () => {
        if(props.isRemoval) {
            return (
                <button className="track-action" onClick={removeTrack}>
                    -
                </button>
            );
        }
        return (
            <button className="track-action" onClick={addTrack}>
                +
            </button>
        )
    }
    return (
        <div className="track">
            <div className="track-info">
                <h3>{props.track.name}</h3>
                <p>
                    {props.track.artist} | {props.track.album} {renderAction()}
                </p>
            </div>
        </div>
    )
}

export default Track