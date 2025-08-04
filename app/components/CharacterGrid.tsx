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
    <div className="bg-white rounded-xl shadow-xl overflow-visible">
      {/* 每个组合一行，组合Logo在左边，成员在右边 */}
      {units.map((unit, unitIndex) => (
        <div key={unit.id} className="border-b border-gray-200 last:border-b-0 flex overflow-hidden">
          {/* 组合Logo在左侧 */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-r border-gray-200 flex-shrink-0">
            <UnitHeader unit={unit} />
          </div>

          {/* 该组合的4个成员在右侧 */}
          <div className="grid grid-cols-4 divide-x divide-gray-200 flex-1">
            {Array.from({ length: 4 }).map((_, characterIndex) => {
              const character = unit.characters[characterIndex];
              if (!character) {
                return (
                  <div
                    key={`${unit.id}-${characterIndex}-empty`}
                    className="p-2 sm:p-4 min-h-[120px] bg-gray-50"
                  />
                );
              }

              const characterSongs = eventSongs.get(character) || [];
              const selectedSong = selectedSongs.get(character.id);
              const isLastRow = unitIndex === units.length - 1;

              return (
                <CharacterCell
                  key={`${unit.id}-${characterIndex}`}
                  character={character}
                  unit={unit}
                  songs={characterSongs}
                  selectedSong={selectedSong}
                  onSongSelect={onSongSelect}
                  isLastRow={isLastRow}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
