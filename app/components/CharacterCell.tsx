import { Character, Song, Unit } from "@/servers/type";
import { SongSelectorWithCover } from "./SongSelectorWithCover";

interface CharacterCellProps {
  character: Character;
  unit: Unit;
  songs: Song[];
  selectedSong?: Song;
  onSongSelect: (characterId: number, song: Song) => void;
  isLastRow?: boolean;
}

export function CharacterCell({
  character,
  unit,
  songs,
  selectedSong,
  onSongSelect,
  isLastRow = false,
}: CharacterCellProps) {

  return (
    <div className="p-2 sm:p-4 hover:bg-gray-50 transition-colors min-h-[120px] flex flex-row items-center space-x-3">
      {/* 角色信息 - 左侧 */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* 角色头像 */}
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 mb-2">
          <img
            src={character.avatarImageUrl}
            alt={character.fullName}
            className="w-full h-full object-cover rounded-full border-2 border-gray-200"
            onError={(e) => {
              // 如果头像加载失败，使用默认占位符
              e.currentTarget.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23f3f4f6' rx='32'/%3E%3Ctext x='32' y='32' text-anchor='middle' dy='0.3em' font-family='Arial' font-size='10' fill='%236b7280'%3E头像%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>

        {/* 角色名字标签 */}
        <div
          className="text-xs font-medium px-2 py-1 rounded-full text-center w-16 truncate"
          style={{
            backgroundColor: `${unit.colorCode}20`,
            color: unit.colorCode,
          }}
        >
          {character.fullName}
        </div>
      </div>

      {/* 歌曲选择和显示 - 右侧 */}
      <div className="flex-1 flex flex-col justify-center">
        <SongSelectorWithCover
          character={character}
          songs={songs}
          selectedSong={selectedSong}
          onSongSelect={onSongSelect}
          isLastRow={isLastRow}
        />

        {/* 歌曲数量提示 */}
        {songs.length > 0 && (
          <div className="text-xs text-gray-500 text-center mt-2">
            {songs.length} 首歌曲
          </div>
        )}
      </div>
    </div>
  );
}
