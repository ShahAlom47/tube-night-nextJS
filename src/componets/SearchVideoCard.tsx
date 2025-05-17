"use client";

import { SearchVideo } from "@/interfaces/videoInterface";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoMdDownload } from "react-icons/io";
import DownloadModal from "./DownloadModal";

interface Props {
  video: SearchVideo;
}

const SearchVideoCard = ({ video }: Props) => {
  const router = useRouter();
  const { videoId } = video.id;
  const { title, thumbnails, channelTitle, publishedAt } = video.snippet;

  const handleClick = () => {
    router.push(`/watch/${videoId}`);
  };

  

  return (
    <div
      className="flex flex-col sm:flex-row gap-4 border rounded-lg p-4 shadow-md hover:shadow-lg transition cursor-pointer"
      onClick={handleClick}
    >
      <Image
        src={thumbnails.high.url}
        alt={title}
        width={320}
        height={180}
        unoptimized
        className="rounded-md"
      />

      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{channelTitle}</p>
          <p className="text-xs text-gray-400">
            {new Date(publishedAt).toLocaleDateString()}
          </p>
        </div>

        {/* Other video info */}
        <DownloadModal videoId={videoId} videoTitle={title}>
          <button className=" flex items-center gap-2">
            Download <IoMdDownload />
          </button>
        </DownloadModal>
      </div>
    </div>
  );
};

export default SearchVideoCard;
