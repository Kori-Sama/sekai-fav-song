import { Character, Song, SongFromAPI, Unit } from "@/servers/type";
import dayjs from "dayjs";
import { listCharacters, listSongs, listSongVocals, listUnits } from "./apis";

export const completeSongInfo = (
  songs: SongFromAPI[],
  characters: Character[],
  songVocals: {
    musicId: number;
    characters: { characterId: number }[];
  }[]
): Song[] => {
  return songs
    .filter((song) => song.isNewlyWrittenMusic)
    .map((song) => {
      const songVocalsData = songVocals.find(
        (vocal) => vocal.musicId === song.id
      );

      const characterIds =
        songVocalsData?.characters.map((char) => char.characterId) || [];

      const songCharacters = characters.filter((char) =>
        characterIds.includes(char.id)
      );

      return {
        id: song.id,
        title: song.title,
        creatorArtistId: song.creatorArtistId,
        lyricist: song.lyricist,
        composer: song.composer,
        arranger: song.arranger,
        publishedAt: dayjs(song.publishedAt).format("YYYY-MM-DD"),
        releasedAt: dayjs(song.releasedAt).format("YYYY-MM-DD"),
        coverImageUrl: `https://storage.sekai.best/sekai-jp-assets/music/jacket/${song.assetbundleName}/${song.assetbundleName}.webp`,
        characters: songCharacters,
      } as Song;
    });
};

export const completeUnits = (
  units: Omit<Unit, "characters" | "logoImageUrl">[],
  characters: Character[]
): Unit[] => {
  // Combine units with characters
  return units.map((unit) => {
    const unitCharacters = characters.filter((char) => char.unit === unit.id);
    return {
      ...unit,
      characters: unitCharacters,
      logoImageUrl: `https://sekai.best/images/jp/logol_outline/logo_${unit.id}.png`,
    };
  });
};

export const completeCharacterEventSongs = (
  songs: Song[],
  events: Event[]
): Map<Character, Song[]> => {
  const eventSongsMap = new Map<Character, Song[]>();

  // TODO

  return eventSongsMap;
};
