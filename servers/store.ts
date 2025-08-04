import { create } from "zustand";
import { Character, Song, Unit } from "./type";
import { listSongs, listCharacters, listSongVocals, listUnits, listEventSongs } from "./apis";
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
    const [songsFromApis, characters, songVocals, unitsFromApis, rawEventSongs] =
      await Promise.all([
        listSongs(),
        listCharacters(),
        listSongVocals(),
        listUnits(),
        listEventSongs(),
      ]);
    const songs = completeSongInfo(songsFromApis, characters, songVocals);
    const units = completeUnits(unitsFromApis, characters);
    const eventSongs = completeCharacterEventSongs(songs, rawEventSongs);

    set({ songs, units, characters, eventSongs });
  },
}));
