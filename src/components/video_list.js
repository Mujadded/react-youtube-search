import React from 'react';
import VideoListItem from './video_list_item';

const VideoList = (props) => {
    const videoItems = props.videos.map((video) => {
        return (
            <VideoListItem
                onClickAddVideo={ props.onClickAddVideo }
                onVideoSelect={props.onVideoSelect}
                key={video.etag} 
                video={video} />
        );
    });
    return (
        <div className="col-sm-3 video-list-box">
            <ul className="list-group">
                {videoItems}
            </ul>
        </div>
    )
};

export default VideoList;