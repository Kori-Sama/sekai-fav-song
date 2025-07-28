import { create } from "zustand";
import { Song } from "./type";

export interface SongStore {
  songs: Song[];
  fetchSongs: () => Promise<void>;
}

export const useSongStore = create<SongStore>()((set, get) => ({
  songs: [],
  fetchSongs: async () => {},
}));
