import axios from "axios";
import { useEffect, useState } from "react";

const DOWNLOAD_HISTORY_KEY = "watch_history_ids";

interface VideoData {
  id: string;
  title: string;
  thumbnail: string;
}

 const useDownloadHistory = () => {
  const [downloadData, setDownloadData] = useState<VideoData[]>([]);

  // ✅ Add to history
const addToDownloadHistory = (id: string) => {
  const existing: string[] = JSON.parse(localStorage.getItem(DOWNLOAD_HISTORY_KEY) || "[]");

  // Check if ID already exists
  if (!existing.includes(id)) {
    // If 12 or more, remove the oldest (first one)
    if (existing.length >= 12) {
      existing.shift();
    }

    const updated = [...existing, id];
    localStorage.setItem(DOWNLOAD_HISTORY_KEY, JSON.stringify(updated));
    fetchVideoData(updated);
  }
};


  // ✅ Remove from history
  const removeFromDownloadHistory = (id: string) => {
    const existing: string[] = JSON.parse(localStorage.getItem(DOWNLOAD_HISTORY_KEY) || "[]");
    const updated = existing.filter((storedId) => storedId !== id);
    localStorage.setItem(DOWNLOAD_HISTORY_KEY, JSON.stringify(updated));
    fetchVideoData(updated);
  };

  // ✅ Fetch video data from server
const fetchVideoData = async (ids: string[]) => {
  try {
    const query = ids.map(id => `ids=${id}`).join("&");
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getHistory?${query}`);

    const data: VideoData[] = response?.data;
    setDownloadData(data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
};


  // ✅ On mount
  useEffect(() => {
    const saved: string[] = JSON.parse(localStorage.getItem(DOWNLOAD_HISTORY_KEY) || "[]");
    if (saved.length) fetchVideoData(saved);
  }, []);

  return {
    downloadData,
    addToDownloadHistory,
    removeFromDownloadHistory,
  };
};


export default useDownloadHistory;