"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/servers/store";
import { Song } from "@/servers/type";
import { CharacterGrid } from "./components/CharacterGrid";
import { ProgressStats } from "./components/ProgressStats";

export default function Home() {
  const { units, characters, eventSongs, fetchAll } = useStore();
  const [selectedSongs, setSelectedSongs] = useState<Map<number, Song>>(
    new Map()
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchAll();
        setError(null);
      } catch (err) {
        setError("Failed to load data. Please refresh the page.");
        console.error("Failed to load data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [fetchAll]);

  // 从本地存储加载选择
  useEffect(() => {
    const savedSelections = localStorage.getItem("sekai-fav-songs");
    if (savedSelections) {
      try {
        const parsed = JSON.parse(savedSelections);
        const newMap = new Map();
        for (const [characterId, songData] of Object.entries(parsed)) {
          newMap.set(parseInt(characterId), songData as Song);
        }
        setSelectedSongs(newMap);
      } catch (error) {
        console.error("Failed to load saved selections:", error);
      }
    }
  }, []);

  // 保存选择到本地存储
  useEffect(() => {
    if (selectedSongs.size > 0) {
      const obj = Object.fromEntries(selectedSongs);
      localStorage.setItem("sekai-fav-songs", JSON.stringify(obj));
    }
  }, [selectedSongs]);

  const handleSongSelect = (characterId: number, song: Song) => {
    setSelectedSongs((prev) => new Map(prev).set(characterId, song));
  };

  const clearAllSelections = () => {
    setSelectedSongs(new Map());
    localStorage.removeItem("sekai-fav-songs");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-700">加载中...</div>
          <div className="text-sm text-gray-500 mt-2">正在获取 SEKAI 数据</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="text-xl text-red-600 mb-4">❌ {error}</div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            重新加载
          </button>
        </div>
      </div>
    );
  }

  // 过滤出5个主要组合（排除 piapro）
  const mainUnits = units.filter((unit) => unit.id !== "piapro");
  const totalCharacters = mainUnits.reduce(
    (acc, unit) => acc + unit.characters.length,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <CharacterGrid
          units={mainUnits}
          eventSongs={eventSongs}
          selectedSongs={selectedSongs}
          onSongSelect={handleSongSelect}
        />

        <ProgressStats
          selectedCount={selectedSongs.size}
          totalCount={totalCharacters}
          onClearAll={clearAllSelections}
        />
      </div>
    </div>
  );
}
