import React from 'react';
import Files from "react-files";

const VideoButtons = ({onNextClick, onExportClick, fileReader}) => {
  return (
    <div className="video-buttons">
        <button className="btn" onClick={ () => onNextClick() }> Play next in queue </button>
        <a className="btn btn-primary" id="link" download="queue.json" onClick={ () => onExportClick() }> Save queue </a>
        <div className="files btn btn-warning">
          <Files
            className="files-dropzone"
            onChange={file => {
              fileReader.readAsText(file[0]);
            }}
            onError={err => console.log(err)}
            accepts={[".json"]}
            multiple={false}
            clickable >
            <i className="fa fa-close"></i>Upload queue
          </Files>
        </div>
      </div>
  );
}

export default VideoButtons;