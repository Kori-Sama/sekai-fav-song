import { create } from "zustand";
import { Character, Song, Unit } from "./type";
import { listSongs, listCharacters, listSongVocals, listUnits } from "./apis";
import {
  completeCharacterEventSongs,
  completeSongInfo,
  completeUnits as completeUnits,
} from "./server";

export interface Store {
  songs: Song[];
  units: Unit[];
  characters: Character[];
  eventSongs: Map<Character, Song[]>;
  fetchAll: () => Promise<void>;
}

export const useStore = create<Store>()((set, get) => ({
  songs: [],
  units: [],
  characters: [],
  eventSongs: new Map(),
  fetchAll: async () => {
    const [songsFromApis, characters, songVocals, unitsFromApis] =
      await Promise.all([
        listSongs(),
        listCharacters(),
        listSongVocals(),
        listUnits(),
      ]);
    const songs = completeSongInfo(songsFromApis, characters, songVocals);
    const units = completeUnits(unitsFromApis, characters);
    const eventSongs = completeCharacterEventSongs(songs);

    set({ songs, units, characters, eventSongs });
  },
}));
