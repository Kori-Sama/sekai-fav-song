import { Unit, Character, Song } from "@/servers/type";
import { UnitHeader } from "./UnitHeader";
import { CharacterCell } from "./CharacterCell";

interface CharacterGridProps {
  units: Unit[];
  eventSongs: Map<Character, Song[]>;
  selectedSongs: Map<number, Song>;
  onSongSelect: (characterId: number, song: Song) => void;
}

export function CharacterGrid({
  units,
  eventSongs,
  selectedSongs,
  onSongSelect,
}: CharacterGridProps) {
  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      {/* 组合 Logo 头部 */}
      <div className="grid grid-cols-5 bg-gradient-to-r from-gray-50 to-gray-100">
        {units.map((unit) => (
          <UnitHeader key={unit.id} unit={unit} />
        ))}
      </div>

      {/* 角色表格 */}
      <div className="grid grid-cols-5 divide-x divide-gray-200">
        {/* 为每个组合创建4行 */}
        {Array.from({ length: 4 })
          .map((_, rowIndex) =>
            units.map((unit) => {
              const character = unit.characters[rowIndex];
              if (!character) {
                return (
                  <div
                    key={`${unit.id}-${rowIndex}-empty`}
                    className="p-2 sm:p-4 border-b border-gray-200 min-h-[120px] bg-gray-50"
                  />
                );
              }

              const characterSongs = eventSongs.get(character) || [];
              const selectedSong = selectedSongs.get(character.id);

              return (
                <CharacterCell
                  key={`${unit.id}-${rowIndex}`}
                  character={character}
                  unit={unit}
                  songs={characterSongs}
                  selectedSong={selectedSong}
                  onSongSelect={onSongSelect}
                />
              );
            })
          )
          .flat()}
      </div>
    </div>
  );
}
