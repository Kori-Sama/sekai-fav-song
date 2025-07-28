import { Song, SongFromAPI } from "@/servers/type";
import dayjs from "dayjs";
import { listCharacters, listSongs } from "./apis";

export const convertSongFromAPI = async (): Promise<Song[]> => {
  const songs = await listSongs();
  const characters = await listCharacters();

  const data = await fetch(
    "https://sekai-world.github.io/sekai-master-db-diff/musicVocals.json"
  );
  const songVocals = (await data.json()) as Array<{
    musicId: number;
    characters: Array<{
      characterId: number;
    }>;
  }>;

  // combine song data with character data
  return songs.map((song) => {
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
