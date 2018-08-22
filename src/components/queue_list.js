import React from 'react';

const QueueList = ({onVideoSelect, queuedVideos, selectedVideo, onRepeatClick, repeatQueue, onShuffleClick}) =>{
    var queue = queuedVideos.map((video) => {
           let className = video == selectedVideo ? "alert alert-success" : "alert alert-info" ;
            return (
                    <div  className={className}
                    key={video.etag}
                    onClick={()=> {onVideoSelect(video)}}>
                    {video.snippet.title}
                    </div>
                    );
        });
    return (<div className="queue col-sm-2">
                <div className="queue__header">
                    <div className="col-md-2 col-xs-5">
                        <i className={repeatQueue? "fas fa-redo-alt active" : "fas fa-redo-alt" } onClick={() => onRepeatClick() }></i>
                    </div>                   
                    <div className="col-md-7 hidden-md-down queue_title">Song Queue</div>
                    <div className="col-md-2 col-xs-5">
                        <i className="fas fa-random"  onClick={() => onShuffleClick() } ></i>
                    </div>
                </div>
                <div className=" queue-list">
                {queue}
                </div>
            </div>);
}

export default QueueList;