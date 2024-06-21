import React from "react";
// import { CiPlay1 } from "react-icons/ci";

const Video = ({ vidId }) => {
  return (
    <div className="video lg:max-w-[800px] w-[90%] max-w-[600px] my-8 rounded-2xl h-[350px] self-center flex justify-center items-center overflow-hidden">
      {/* <CiPlay1 size={42} className="play cursor-pointer" /> */}
      {vidId && (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${vidId}`}
        ></iframe>
      )}
    </div>
  );
};

export default Video;
