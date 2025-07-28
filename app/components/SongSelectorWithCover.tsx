import { Character, Song } from "@/servers/type";
import { useState, useRef, useEffect } from "react";

interface SongSelectorWithCoverProps {
  character: Character;
  songs: Song[];
  selectedSong?: Song;
  onSongSelect: (characterId: number, song: Song) => void;
}

export function SongSelectorWithCover({
  character,
  songs,
  selectedSong,
  onSongSelect,
}: SongSelectorWithCoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭下拉框
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSongSelect = (song: Song) => {
    onSongSelect(character.id, song);
    setIsOpen(false);
  };

  return (
    <div className="space-y-3">
      {/* 自定义下拉选择器 */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left bg-white hover:bg-gray-50 transition-colors"
        >
          {selectedSong ? (
            <div className="flex items-center space-x-2">
              <img
                src={selectedSong.coverImageUrl}
                alt={selectedSong.title}
                className="w-6 h-6 rounded object-cover flex-shrink-0"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder-cover.png";
                }}
              />
              <span className="truncate">{selectedSong.title}</span>
            </div>
          ) : (
            <span className="text-gray-500">选择歌曲</span>
          )}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </button>

        {/* 下拉选项 */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            <div
              className="p-2 hover:bg-gray-100 cursor-pointer text-xs sm:text-sm text-gray-500"
              onClick={() => {
                setIsOpen(false);
                // 这里可以清除选择，但根据需求我们保持选择
              }}
            ></div>
            {songs.map((song) => (
              <div
                key={song.id}
                className="p-2 hover:bg-blue-50 cursor-pointer border-t border-gray-100 first:border-t-0"
                onClick={() => handleSongSelect(song)}
              >
                <div className="flex items-center space-x-2">
                  <img
                    src={song.coverImageUrl}
                    alt={song.title}
                    className="w-8 h-8 rounded object-cover flex-shrink-0"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder-cover.png";
                    }}
                  />
                  <span className="text-xs sm:text-sm truncate">
                    {song.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 大封面显示 */}
      {selectedSong && (
        <div className="text-center fade-in">
          <div className="relative">
            <img
              src={selectedSong.coverImageUrl}
              alt={selectedSong.title}
              className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = "/placeholder-cover.png";
              }}
            />
          </div>
          <div className="text-xs text-gray-600 mt-2 line-clamp-2 max-w-full">
            {selectedSong.title}
          </div>
        </div>
      )}
    </div>
  );
}
