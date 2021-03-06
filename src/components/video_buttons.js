import React from 'react';
import Files from "react-files";

const VideoButtons = ({nextInQueue, onExportClick, fileReader}) => {
  return (
    <div className="video-buttons">
        <button className="btn" onClick={ () => nextInQueue() }> Play next in queue </button>
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
              Click to Upload queue or Drop file here
          </Files>
        </div>
      </div>
  );
}

export default VideoButtons;
