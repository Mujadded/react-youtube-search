import React from 'react';

const QueueList = ({queuedVideos, selectedVideo}) =>{
    var queue = queuedVideos.map((video) => {
           let className = video == selectedVideo ? "alert alert-success" : "alert alert-info" ;
            return <div className={className}>{video.snippet.title}</div>
        });
    return (<div className="queue col-md-2">
                <div className="queue__header">Next Songs in Queue</div>
                    <div className=" queue-list">
                    {queue}
                </div>
            </div>);
}

export default QueueList;