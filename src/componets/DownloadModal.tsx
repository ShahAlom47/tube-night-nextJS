import React, { useState } from "react";

interface DownloadModalProps {
  videoId: string;
  videoTitle: string;
  children: React.ReactNode; // trigger button or element
}

const DownloadModal: React.FC<DownloadModalProps> = ({
  videoId,
  videoTitle,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const downloadOptions = [
    {
      label: "1080p MP4",
      value: `https://youtube-download-service.com/download/${videoId}/1080p.mp4`,
    },
    {
      label: "720p MP4",
      value: `https://youtube-download-service.com/download/${videoId}/720p.mp4`,
    },
    {
      label: "480p MP4",
      value: `https://youtube-download-service.com/download/${videoId}/480p.mp4`,
    },
    {
      label: "MP3 Audio",
      value: `https://youtube-download-service.com/download/${videoId}/audio.mp3`,
    },
  ];

  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent bubbling to card click
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedOption("");
  };

  const handleDownload = () => {
    if (!selectedOption) {
      alert("Please select a download option");
      return;
    }
    window.open(selectedOption, "_blank");
    closeModal();
  };

  return (
    <>
      {/* Trigger button */}
      <span
        onClick={openModal}
        className=" w-fit mt-4 w-fit bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition flex items-center gap-2 "
        role="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        style={{ cursor: "pointer" }}
      >
        {children}
      </span>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={closeModal} // clicking on backdrop closes modal
        >
          <div
            className="bg-white rounded-md p-6 w-96 max-w-full shadow-lg"
            onClick={(e) => e.stopPropagation()} // prevent modal content clicks from closing modal
          >
            <h2 className="text-xl font-semibold mb-3 truncate">{videoTitle}</h2>
            <p className="mb-4">Select download option:</p>

            <div className="max-h-60 overflow-y-auto mb-6">
              {downloadOptions.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center mb-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="downloadOption"
                    value={opt.value}
                    className="mr-2"
                    checked={selectedOption === opt.value}
                    onChange={() => setSelectedOption(opt.value)}
                  />
                  {opt.label}
                </label>
              ))}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 rounded text-white ${
                  selectedOption
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-blue-300 cursor-not-allowed"
                }`}
                onClick={handleDownload}
                disabled={!selectedOption}
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DownloadModal;
