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
                <button className="track-action ml-2 w-6 h-6 flex items-center justify-center rounded-full bg-purple-500 hover:bg-purple-400 text-white transition-colors" onClick={removeTrack}>
                    -
                </button>
            );
        }
        return (
            <button className="track-action ml-2 w-6 h-6 flex items-center justify-center rounded-full bg-purple-500 hover:bg-purple-400 text-white transition-colors" onClick={addTrack}>
                +
            </button>
        )
    }

    return (
        <div className="track px-4 py-3 hover:bg-purple-800/50 transition-colors group">
            <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-white truncate">{props.track.name}</h3>
                    <p className="text-sm text-purple-300 truncate">
                        {props.track.artist} | {props.track.album}
                    </p>
                </div>
                <div className="ml-4 flex-shrink-0">{renderAction()}</div>
            </div>
        </div>
    )
}

export default Track