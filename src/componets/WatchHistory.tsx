"use client";

import React from "react";
import useWatchHistory from "../Hooks/useWatchHistory";
import Image from "next/image";
import { useRouter } from "next/navigation";

const WatchHistory = () => {
  const { downloadData } = useWatchHistory();
  const router = useRouter();


  return (
    <div className="p-4 space-y-6 overflow-y-scroll h-[90vh] ">
      {downloadData?.map((item, index: number) => {
        const snippet = item.snippet;
        const title = snippet?.title;
        const image = snippet?.thumbnails?.medium?.url || snippet?.thumbnails?.high?.url;

        return (
          <div
            key={item.id || index}
            onClick={()=>  router.push(`/watch/${item?.id}`)}
            className="bg-white shadow-md rounded-xl p-4 flex flex-col md:flex-row gap-4 border-b-2 border-red-500 border-opacity-40 hover:border-opacity-100 cursor-pointer transition-all duration-300 ease-in-out"
          >
            <Image
            width={80}
            height={80}
            unoptimized
              src={image}
              alt={title}
              className="w-16 h-12 rounded-sm"
            />
            <div>
              <h2 className="text-sm font-semibold">{title}</h2>
            
              <p className="text-xs">
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WatchHistory;
