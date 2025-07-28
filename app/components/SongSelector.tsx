import { Character, Song } from "@/servers/type";

interface SongSelectorProps {
  character: Character;
  songs: Song[];
  selectedSong?: Song;
  onSongSelect: (characterId: number, song: Song) => void;
}

interface SongOptionProps {
  song: Song;
  isSelected: boolean;
}

function SongOption({ song, isSelected }: SongOptionProps) {
  return (
    <div className="flex items-center space-x-2 p-2">
      <img
        src={song.coverImageUrl}
        alt={song.title}
        className="w-8 h-8 rounded object-cover flex-shrink-0"
        onError={(e) => {
          e.currentTarget.src = "/placeholder-cover.png";
        }}
      />
      <span className="text-sm truncate">{song.title}</span>
    </div>
  );
}

export function SongSelector({
  character,
  songs,
  selectedSong,
  onSongSelect,
}: SongSelectorProps) {
  return (
    <div className="space-y-3">
      <select
        className="w-full p-2 border border-gray-300 rounded-lg text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        value={selectedSong?.id || ""}
        onChange={(e) => {
          const songId = parseInt(e.target.value);
          const song = songs.find((s) => s.id === songId);
          if (song) {
            onSongSelect(character.id, song);
          }
        }}
      >
        <option value="">选择歌曲</option>
        {songs.map((song) => (
          <option key={song.id} value={song.id}>
            {song.title}
          </option>
        ))}
      </select>

      {/* 歌曲封面 */}
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
