import { join } from "path";
import { Character, SongFromAPI, Unit } from "./type";

export const listSongs = async (): Promise<SongFromAPI[]> => {
  const url = "https://sekai-world.github.io/sekai-master-db-diff/musics.json";
  const response = await fetch(url);
  const data = (await response.json()) as Array<SongFromAPI>;
  return data;
};

export const listCharacters = async (): Promise<Character[]> => {
  const url =
    "https://sekai-world.github.io/sekai-master-db-diff/gameCharacters.json";

  const response = await fetch(url);
  const data = await response.json();
  const characters: Character[] = data.map(
    (char: any) =>
      ({
        id: char.id,
        firstName: char.firstName || undefined, // optional
        givenName: char.givenName,
        fullName: `${char.firstName || ""}${char.givenName}`,
        unit: char.unit,
        avatarImageUrl: `https://sekai.best/images/jp/character/avatar/${char.id}.webp`,
      } as Character)
  );
  return characters;
};

export const listSongVocals = async () => {
  const data = await fetch(
    "https://sekai-world.github.io/sekai-master-db-diff/musicVocals.json"
  );
  const songVocals = (await data.json()) as Array<{
    musicId: number;
    musicVocalType: string;
    characters: Array<{
      characterId: number;
    }>;
  }>;

  return songVocals.filter((vocal) => vocal.musicVocalType === "sekai");
};

export const listUnits = async (): Promise<
  Omit<Unit, "characters" | "logoImageUrl">[]
> => {
  const url =
    "https://sekai-world.github.io/sekai-master-db-diff/unitProfiles.json";
  const response = await fetch(url);
  const data = await response.json();
  return data.map((unit: any) => ({
    id: unit.unit,
    name: unit.unitName,
    colorCode: unit.colorCode,
  }));
};

export const listEventSongs = async () => {
  const url =
    "https://sekai-world.github.io/sekai-master-db-diff/eventMusics.json";
};
