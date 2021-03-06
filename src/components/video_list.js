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
        <ul className="col-sm-3 list-group video-list-box">
            {videoItems}
        </ul>
    );
};

export default VideoList;