import React, { useCallback } from "react";

function Track({ track, onAdd, onRemove, isRemoval }) {
    const addTrack = useCallback((event) => {
        onAdd(track);
    }, [onAdd, track]);

    const removeTrack = useCallback((event) => {
        onRemove(track);
    }, [onRemove, track]);

    const renderAction = () => {
        if(isRemoval) {
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
                <div className="min-w-0 flex-1 flex items-center space-x-3">
                    <img src={track.image} alt={`Album cover for ${track.name}`} className="w-12 h-12 object-cover rounded-sm flex-shrink-0" />
                    <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-white truncate">{track.name}</h3>
                        <p className="text-sm text-purple-300 truncate">
                            {track.artist} | {track.album}
                        </p>
                    </div>
                </div>
                <div className="ml-4 flex-shrink-0">{renderAction()}</div>
            </div>
        </div>
    )
}

export default Track