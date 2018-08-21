import React from 'react';

const QueueList = ({queuedVideos, selectedVideo, onRepeatClick, repeatQueue, onShuffleClick}) =>{
    var queue = queuedVideos.map((video) => {
           let className = video == selectedVideo ? "alert alert-success" : "alert alert-info" ;
            return <div className={className}>{video.snippet.title}</div>
        });
    return (<div className="queue col-md-2">
                <div className="queue__header">
                    <div className="col-sm-2">
                        <i className={repeatQueue? "fas fa-redo-alt active" : "fas fa-redo-alt" } onClick={() => onRepeatClick() }></i>
                    </div>                   
                    <div className="col-sm-7 queue_title">Song Queue</div>
                    <div className="col-sm-2">
                        <i className="fas fa-random"  onClick={() => onShuffleClick() } ></i>
                    </div>
                </div>
                <div className=" queue-list">
                {queue}
                </div>
            </div>);
}

export default QueueList;