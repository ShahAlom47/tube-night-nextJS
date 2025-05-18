import axios from "axios";
import Image from "next/image";
import React, { useState, } from "react";
import { LuLoaderCircle } from "react-icons/lu";


interface Format {
  format_id: string;
  format_note: string;
  ext: string;
  filesize?: number;
  url: string;
}

interface VideoData {
  title: string;
  thumbnail: string;
  formats: Format[];
  duration: number;
  url: string;
}

interface DownloadModalProps {
  videoId: string;
  videoTitle: string;
  children: React.ReactNode;
}

const DownloadModal: React.FC<DownloadModalProps> = ({
  videoId,
  videoTitle,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<Format | null>(null);

  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  const openModal = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
    setIsLoading(true);
    setVideoData(null);
    setSelectedFormat(null);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/download?url=${youtubeUrl}`
      );

      // Assuming the API returns data in response.data
      setVideoData(response.data);
    } catch (error) {
      console.error("Error fetching video info:", error);
      setVideoData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setVideoData(null);
    setSelectedFormat(null);
  };

  // Helper function to format file size in MB or KB
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "N/A";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  // Shorten title if too long
  const shortTitle = (title: string) => {
    return title.length > 40 ? title.slice(0, 37) + "..." : title;
  };

  // Handle download - trigger browser download of selected format URL
  const handleDownload = () => {
    if (!selectedFormat) return;

    // Create an invisible anchor element and click it to download
    const link = document.createElement("a");
    link.href = selectedFormat.url;
    // Use video title + format + extension as filename
    const cleanTitle = videoData?.title.replace(/[^\w\s]/gi, "").replace(/\s+/g, "_");
    link.download = `${cleanTitle}_${selectedFormat.format_note || selectedFormat.format_id}.${selectedFormat.ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Trigger button */}
      <div
        onClick={openModal}
        className="w-fit mt-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        aria-label={`Download ${videoTitle}`}
      >
        {children}
      </div>

      {/* Modal */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeModal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div
          className="bg-white rounded-md p-6 w-96 max-w-full shadow-lg transform transition-all"
          onClick={(e) => e.stopPropagation()}
        >
          {isLoading ? (
            <div className="flex flex-col items-center space-y-3">
             <LuLoaderCircle className=" animate-spin text-2xl text-red-500" />
              <p>Please wait, fetching video info...</p>
            </div>
          ) : videoData ? (
            <>
              {/* Title & Thumbnail */}
              <div className="flex gap-3 mb-4">
                <Image
                width={600}
                height={300}
                unoptimized
                  src={videoData.thumbnail}
                  alt={videoData.title}
                  className="w-4/12 h-auto rounded-md mb-2"
                />
                <h3
                  id="modal-title"
                  className="text-base font-semibold "
                  title={videoData.title}
                >
                  {shortTitle(videoData.title)}
                </h3>
              </div>

              {/* Format selector */}
              <label htmlFor="formatSelect" className="block mb-1 font-medium">
                Select Format
              </label>
              <select
                id="formatSelect"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                value={selectedFormat?.format_id || ""}
                onChange={(e) => {
                  const format = videoData.formats.find(
                    (f) => f.format_id === e.target.value
                  );
                  setSelectedFormat(format || null);
                }}
              >
                <option value="" disabled>
                   Choose a format
                </option>
                {videoData.formats.map((format) => (
                  <option key={format.format_id} value={format.format_id}>
                    {`${format.format_note || format.format_id} | ${format.ext.toUpperCase()} | Size: ${formatFileSize(
                      format.filesize
                    )}`}
                  </option>
                ))}
              </select>

              {/* Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 transition"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className={`px-4 py-2 rounded text-white transition ${
                    selectedFormat
                      ? "bg-red-500 hover:bg-red-600 cursor-pointer"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  onClick={handleDownload}
                  disabled={!selectedFormat}
                >
                  Download
                </button>
              </div>
            </>
          ) : (
            <p className="text-center text-red-500">
              Failed to load video info. Please try again.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default DownloadModal;
