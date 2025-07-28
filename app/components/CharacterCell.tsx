import { Character, Song, Unit } from "@/servers/type";
import { SongSelectorWithCover } from "./SongSelectorWithCover";

interface CharacterCellProps {
  character: Character;
  unit: Unit;
  songs: Song[];
  selectedSong?: Song;
  onSongSelect: (characterId: number, song: Song) => void;
}

export function CharacterCell({
  character,
  unit,
  songs,
  selectedSong,
  onSongSelect,
}: CharacterCellProps) {
  // 生成角色头像 URL
  const getCharacterAvatarUrl = (characterId: number) => {
    return `https://storage.sekai.best/sekai-jp-assets/character/member/${characterId}/card_after_training.webp`;
  };

  return (
    <div className="border-b border-gray-200 p-2 sm:p-4 hover:bg-gray-50 transition-colors">
      {/* 角色信息 */}
      <div className="text-center mb-3">
        <div className="mb-2">
          <img
            src={getCharacterAvatarUrl(character.id)}
            alt={character.fullName}
            className="w-12 h-12 sm:w-16 sm:h-16 mx-auto rounded-full object-cover shadow-md"
            onError={(e) => {
              // 如果头像加载失败，使用默认占位符
              e.currentTarget.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23f3f4f6'/%3E%3Ctext x='32' y='32' text-anchor='middle' dy='0.3em' font-family='Arial' font-size='10' fill='%236b7280'%3E头像%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>
        <div
          className="text-xs sm:text-sm font-medium px-2 py-1 rounded-full"
          style={{
            backgroundColor: `${unit.colorCode}20`,
            color: unit.colorCode,
          }}
        >
          {character.fullName}
        </div>
      </div>

      {/* 歌曲选择和显示 */}
      <SongSelectorWithCover
        character={character}
        songs={songs}
        selectedSong={selectedSong}
        onSongSelect={onSongSelect}
      />

      {/* 歌曲数量提示 */}
      {songs.length > 0 && (
        <div className="text-xs text-gray-500 text-center mt-2">
          {songs.length} 首歌曲
        </div>
      )}
    </div>
  );
}
