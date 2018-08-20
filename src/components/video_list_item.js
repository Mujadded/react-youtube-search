import React from 'react';

const VideoListItem = ({video, onVideoSelect, onClickAddVideo}) => {
  const imageUrl = video.snippet.thumbnails.default.url;

  return (
      <li className="list-group-item">
        <div className="video-list media" onClick={() => onVideoSelect(video)}>
          <div className="media-left video-item">
            <img className="media-object" src={imageUrl} />
          </div>

          <div className="media-body">
            <div className="media-heading">{video.snippet.title}</div>
          </div>
        </div>
      <div className="btn btn-primary addQueue" onClick={ () => onClickAddVideo(video)}>Add to Queue</div>
      </li>
  );
}

export default VideoListItem;