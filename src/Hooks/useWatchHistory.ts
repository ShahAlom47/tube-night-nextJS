import { Video } from "@/interfaces/videoInterface";
import axios from "axios";
import { useEffect, useState } from "react";

const WATCH_HISTORY_KEY = "watch_history_ids";

const useWatchHistory = () => {
  const [ids, setIds] = useState<string[]>([]);

  // ✅ Add to watch history
  const addToWatchHistory = (id: string) => {
    const existing: string[] = JSON.parse(localStorage.getItem(WATCH_HISTORY_KEY) || "[]");

    // If ID is not already in the list
    if (!existing.includes(id)) {
      // Keep only the last 12 items
      if (existing.length >= 12) {
        existing.pop(); // remove the oldest (last one, since new one will go to the front)
      }

      const updated = [id, ...existing]; // Add new ID to the beginning
      localStorage.setItem(WATCH_HISTORY_KEY, JSON.stringify(updated));
      setIds(updated);
    }
  };

  // ✅ Remove from watch history
  const removeFromWatchHistory = (id: string) => {
    const existing: string[] = JSON.parse(localStorage.getItem(WATCH_HISTORY_KEY) || "[]");
    const updated = existing.filter((storedId) => storedId !== id);
    localStorage.setItem(WATCH_HISTORY_KEY, JSON.stringify(updated));
    fetchWatchHistoryData(updated);
  };

  // ✅ Fetch video data from server 
  const fetchWatchHistoryData = async (ids: string[]) => {
     if (!ids.length) {
    setIds([]);
    return;
  }
    try {
      const query = ids.map((id) => `ids=${id}`).join("&");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/getHistory?${query}`
      );

      const data: Video[] = response?.data;
     return data
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  // ✅ On mount
  useEffect(() => {
    const saved: string[] = JSON.parse(localStorage.getItem(WATCH_HISTORY_KEY) || "[]");
    if (saved.length) fetchWatchHistoryData(saved);
  }, []);

  return {
    ids,
    addToWatchHistory,
    removeFromWatchHistory,
  fetchWatchHistoryData 

  };
};

export default useWatchHistory;
