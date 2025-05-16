// components/VideoPage.tsx
"use client";

import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import RelatedVideos from "./RelatedVideos";

interface VideoPageProps {
  videoId: string;
}

const VideoPage: React.FC<VideoPageProps> = ({ videoId }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [videoData, setVideoData] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [relatedVideos, setRelatedVideos] = useState<any[]>([]);

  console.log(videoId,relatedVideos)

  useEffect(() => {
    const fetchVideoData = async () => {
      const res = await fetch(`/api/videos/${videoId}`);
      const data = await res.json();
    
      setVideoData(data);
    };

    // সম্পর্কিত ভিডিও ফেচ করা
    const fetchRelatedVideos = async () => {
      const res = await fetch(`/api/related/${videoId}`);
      const data = await res.json();
      console.log(data)
      setRelatedVideos(data.items);
    };

    fetchVideoData();
    fetchRelatedVideos();
  }, [videoId]);

  if (!videoData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <ReactPlayer
        className="rounded-lg w-full h-full" 
          url={`https://www.youtube.com/watch?v=${videoId}`}
          width="100%"
        //   height="500px"
          controls
        />
        <h1 className="text-2xl font-bold mt-2">{videoData.snippet.title}</h1>
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => {
            window.location.href = `/api/download?videoId=${videoId}`;
          }}
        >
          Download
        </button>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Related Videos</h2>
        <RelatedVideos videos={relatedVideos} />
      </div>
    </div>
  );
};

export default VideoPage;
