import { Character, Song } from "@/servers/type";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface SongSelectorWithCoverProps {
  character: Character;
  songs: Song[];
  selectedSong?: Song;
  onSongSelect: (characterId: number, song: Song) => void;
  isLastRow?: boolean;
}

export function SongSelectorWithCover({
  character,
  songs,
  selectedSong,
  onSongSelect,
  isLastRow = false,
}: SongSelectorWithCoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭下拉框
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      // 检查是否点击在下拉框内或触发按钮内
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        // 还需要检查下拉框本身（因为现在通过 Portal 渲染到 body）
        !(target as Element).closest('.dropdown-portal')
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  // 计算下拉框位置 - 直接计算，不使用状态
  const getDropdownStyle = () => {
    if (!dropdownRef.current) return { display: 'none' };

    const rect = dropdownRef.current.getBoundingClientRect();
    const dropdownWidth = 192; // w-48 = 12rem = 192px
    const dropdownHeight = 192; // max-h-48

    let left = rect.left + rect.width / 2 - dropdownWidth / 2;
    let top = isLastRow ? rect.top - dropdownHeight - 4 : rect.bottom + 4;

    // 边界检测
    if (left < 8) left = 8;
    if (left + dropdownWidth > window.innerWidth - 8) {
      left = window.innerWidth - dropdownWidth - 8;
    }

    return {
      position: 'fixed' as const,
      top: `${top}px`,
      left: `${left}px`,
      zIndex: 9999,
    };
  };

  const handleSongSelect = (song: Song) => {
    onSongSelect(character.id, song);
    setIsOpen(false);
  };

  return (
    <div className="space-y-2">
      {/* 点击封面选择歌曲 */}
      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="text-center cursor-pointer group"
        >
          {selectedSong ? (
            <div>
              <div className="relative">
                <img
                  src={selectedSong.coverImageUrl}
                  alt={selectedSong.title}
                  className="w-16 h-16 sm:w-18 sm:h-18 mx-auto rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105 border-2 border-transparent group-hover:border-blue-300"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-cover.png";
                  }}
                />
                {/* 下拉箭头指示器 */}
                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg
                    className="w-3 h-3 text-white"
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
              </div>
            </div>
          ) : (
            <div>
              <div className="w-16 h-16 sm:w-18 sm:h-18 mx-auto rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105 border-2 border-dashed border-gray-300 group-hover:border-blue-400 flex items-center justify-center bg-gray-50 group-hover:bg-blue-50">
                <svg
                  className="w-8 h-8 text-gray-400 group-hover:text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* 下拉选项 */}
        {isOpen && createPortal(
          <div
            className="dropdown-portal w-48 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto"
            style={getDropdownStyle()}
            onMouseDown={(e) => e.stopPropagation()} // 阻止事件冒泡
          >
            {songs.map((song) => (
              <div
                key={song.id}
                className="p-2 hover:bg-blue-50 cursor-pointer border-t border-gray-100 first:border-t-0"
                onMouseDown={(e) => {
                  e.preventDefault(); // 防止默认行为
                  e.stopPropagation(); // 阻止事件冒泡
                  handleSongSelect(song);
                }}
              >
                <div className="flex items-center space-x-2">
                  <img
                    src={song.coverImageUrl}
                    alt={song.title}
                    className="w-10 h-10 rounded object-cover flex-shrink-0"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder-cover.png";
                    }}
                  />
                  <span className="text-xs truncate text-gray-800">
                    {song.title}
                  </span>
                </div>
              </div>
            ))}
          </div>,
          document.body
        )}
      </div>
    </div>
  );
}
