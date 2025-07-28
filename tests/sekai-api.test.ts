import { listSongInfo, listUnitsWithCharacters } from "@/servers/server";
import { expect, test } from "vitest";

test(
  "song-635",
  async () => {
    const songs = await listSongInfo();

    const song635 = songs.find((song) => song.id === 635);
    const characters = song635?.characters || [];

    console.log("Characters in song 635:", characters);

    expect(characters[0].fullName).toBe("花里みのり");
  },
  {
    skip: true,
  }
);

test(
  "unit-school_refusal",
  async () => {
    const units = await listUnitsWithCharacters();
    const schoolRefusalUnit = units.find(
      (unit) => unit.id === "school_refusal"
    );
    const characters = schoolRefusalUnit?.characters || [];
    console.log("Characters in school_refusal unit:", characters);
    expect(characters[3].fullName).toBe("暁山瑞希");
  },
  {
    skip: true, // Skip this test if you don't want to run it
  }
);
