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


      const songCharacters = songVocalsData?.characters.map(
        (vocal) => characters.find((char) => char.id === vocal.characterId)
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
  eventSongs: { musicId: number }[],
): Map<Character, Song[]> => {
  const eventSongsMap = new Map<Character, Song[]>();


  songs.filter(
    (song) =>
      song.id === 290 || // 芥末回家
      eventSongs.some((event) => event.musicId === song.id)
  ).forEach(song => {
    const banner = song.characters?.[0];
    if (banner) {
      if (!eventSongsMap.has(banner)) {
        eventSongsMap.set(banner, []);
      }
      eventSongsMap.get(banner)?.push(song);
    }
  })

  // fix
  const fixedSong = songs.find(s => s.id === 62)

  if (fixedSong) {
    const src = fixedSong.characters?.[0];
    const dst = fixedSong.characters?.[1];
    eventSongsMap.get(src)?.shift();
    eventSongsMap.set(dst, [fixedSong, ...eventSongsMap.get(dst) || []]);
  }


  const fixedSong2 = songs.find(s => s.id === 64)

  if (fixedSong2) {
    const src = fixedSong2.characters?.[0];
    const dst = fixedSong2.characters?.[1];
    eventSongsMap.get(src)?.shift();
    eventSongsMap.set(dst, [fixedSong2, ...eventSongsMap.get(dst) || []]);
  }


  return eventSongsMap;
};
