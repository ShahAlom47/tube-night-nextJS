import React from "react";

type Video = {
  id: string;
  thumbnail: string;
  title: string;
  description: string;
  channel: string;
  uploadDate: string;
};

interface HomeVideoContainerProps {
  videos: Video[];
}

const HomeVideoContainer = ({videos}: HomeVideoContainerProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {/* {videos?.map((video: Video) => (
        //   <VideoCard key={video.id} video={video} />
        <div key={video.id} className="bg-gray-200 p-4 rounded-lg shadow-md">
          <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover rounded-lg mb-2" />
          <h2 className="text-lg font-semibold">{video.title}</h2>
          <p className="text-gray-600">{video.description}</p>  
            <p className="text-gray-600">{video.channel}</p>
            <p className="text-gray-600">{video.uploadDate}</p>
        </div>
        ))} */}
      </div>
    </div>
  );
};

export default HomeVideoContainer;
