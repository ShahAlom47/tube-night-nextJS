import { useEffect, useState } from "react";

const DOWNLOAD_HISTORY_KEY = "download_history_ids";

interface VideoData {
  id: string;
  title: string;
  thumbnail: string;
}

export const useDownloadHistory = () => {
  const [downloadData, setDownloadData] = useState<VideoData[]>([]);

  const addToDownloadHistory = (id: string) => {
    const existing = JSON.parse(localStorage.getItem(DOWNLOAD_HISTORY_KEY) || "[]");
    if (!existing.includes(id)) {
      const updated = [...existing, id];
      localStorage.setItem(DOWNLOAD_HISTORY_KEY, JSON.stringify(updated));
      fetchVideoData(updated);
    }
  };

  const fetchVideoData = async (ids: string[]) => {
    const data = ids.map((id) => ({
      id,
      title: `Video Title for ${id}`,
      thumbnail: `https://img.youtube.com/vi/${id}/0.jpg`,
    }));
    setDownloadData(data);
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(DOWNLOAD_HISTORY_KEY) || "[]");
    if (saved.length) fetchVideoData(saved);
  }, []);

  return { downloadData, addToDownloadHistory };
};
