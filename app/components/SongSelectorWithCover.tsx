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

  // Helper function to get proxy image URL
  const getProxyImageUrl = (originalUrl: string) => {
    return `/api/proxy-image?url=${encodeURIComponent(originalUrl)}`;
  };

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
    const isMobile = window.innerWidth < 640; // sm breakpoint

    if (isMobile) {
      // 移动端：使用更保守的定位策略
      const dropdownWidth = Math.min(180, window.innerWidth * 0.8); // 80% 屏幕宽度，最大180px
      const dropdownHeight = 160; // 稍微小一些的高度
      const padding = 20;

      // 水平居中，但确保在屏幕范围内
      let left = rect.left + rect.width / 2 - dropdownWidth / 2;
      left = Math.max(padding, Math.min(left, window.innerWidth - dropdownWidth - padding));

      // 垂直位置：优先显示在下方，如果空间不够再显示在上方
      let top = rect.bottom + 8;
      if (top + dropdownHeight > window.innerHeight - padding) {
        top = rect.top - dropdownHeight - 8;
        // 如果上方也不够，就显示在可见区域内
        if (top < padding) {
          top = padding;
        }
      }

      return {
        position: 'fixed' as const,
        top: `${top}px`,
        left: `${left}px`,
        width: `${dropdownWidth}px`,
        maxHeight: `${Math.min(dropdownHeight, window.innerHeight - top - padding)}px`,
        zIndex: 9999,
      };
    } else {
      // 桌面端：保持原有逻辑
      const dropdownWidth = 192; // w-48 = 12rem = 192px
      const dropdownHeight = 192; // max-h-48
      const padding = 8;

      let left = rect.left + rect.width / 2 - dropdownWidth / 2;

      // 边界检测 - 确保不超出屏幕
      if (left < padding) {
        left = padding;
      } else if (left + dropdownWidth > window.innerWidth - padding) {
        left = window.innerWidth - dropdownWidth - padding;
      }

      // 计算垂直位置
      let top = isLastRow ? rect.top - dropdownHeight - 4 : rect.bottom + 4;

      // 垂直边界检测
      if (top < padding) {
        top = rect.bottom + 4; // 如果上方空间不够，强制显示在下方
      } else if (top + dropdownHeight > window.innerHeight - padding) {
        top = rect.top - dropdownHeight - 4; // 如果下方空间不够，显示在上方
      }

      return {
        position: 'fixed' as const,
        top: `${Math.max(padding, top)}px`,
        left: `${left}px`,
        width: `${dropdownWidth}px`,
        zIndex: 9999,
      };
    }
  }; const handleSongSelect = (song: Song) => {
    onSongSelect(character.id, song);
    setIsOpen(false);
  };

  return (
    <div className="space-y-2 w-full">
      {/* 点击封面选择歌曲 */}
      <div className="relative w-full" ref={dropdownRef}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="text-center cursor-pointer group w-full"
        >
          {selectedSong ? (
            <div className="w-full">
              <div className="relative flex justify-center">
                <img
                  src={getProxyImageUrl(selectedSong.coverImageUrl)}
                  alt={selectedSong.title}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105 border-2 border-transparent group-hover:border-blue-300"
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
              <div className="text-xs text-gray-500 text-center mt-2 truncate px-1">
                {selectedSong.title}
              </div>
            </div>
          ) : (
            <div className="w-full">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105 border-2 border-dashed border-gray-300 group-hover:border-blue-400 flex items-center justify-center bg-gray-50 group-hover:bg-blue-50">
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
              <div className="text-xs text-gray-500 text-center mt-2">
                选择歌曲
              </div>
            </div>
          )}
        </div>

        {/* 下拉选项 */}
        {isOpen && createPortal(
          <div
            className="dropdown-portal bg-white border border-gray-300 rounded-lg shadow-lg overflow-y-auto"
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
                <div className="flex items-center space-x-2 min-w-0">
                  <img
                    src={getProxyImageUrl(song.coverImageUrl)}
                    alt={song.title}
                    className="w-10 h-10 rounded object-cover flex-shrink-0"
                  />
                  <span className="text-xs truncate text-gray-800 min-w-0 flex-1">
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
