/*
{
"id": 64,
"seq": 2201901,
"releaseConditionId": 10,
"categories": [
"mv"
],
"title": "ステラ",
"pronunciation": "すてら",
"creatorArtistId": 29,
"lyricist": "じん",
"composer": "じん",
"arranger": "-",
"dancerCount": 3,
"selfDancerPosition": 0,
"assetbundleName": "jacket_s_064",
"liveTalkBackgroundAssetbundleName": "bg_livetalk_default_002",
"publishedAt": 1603026300000,
"releasedAt": 1602946800000,
"liveStageId": 1,
"fillerSec": 9,
"isNewlyWrittenMusic": true,
"isFullLength": false
},
 */

export interface SongFromAPI {
  id: number;
  seq: number;
  releaseConditionId: number;
  categories: string[];
  title: string;
  pronunciation: string;
  creatorArtistId: number;
  lyricist: string;
  composer: string;
  arranger: string;
  dancerCount: number;
  selfDancerPosition: number;
  assetbundleName: string;
  liveTalkBackgroundAssetbundleName: string;
  publishedAt: number; // timestamp in milliseconds
  releasedAt: number; // timestamp in milliseconds
  liveStageId: number;
  fillerSec?: number; // optional, as not all songs have this
  isNewlyWrittenMusic?: boolean; // optional
  isFullLength?: boolean; // optional
}

export interface Song {
  id: number;
  title: string;
  creatorArtistId: number;
  lyricist: string;
  composer: string;
  arranger: string;
  publishedAt: string;
  releasedAt: string;
  coverImageUrl: string; // URL to the cover image
  characters: Character[];
}

export interface Character {
  id: number;
  firstName?: string; // optional, as some characters may not have a first name
  givenName: string;
  fullName: string;
  unit: string;
}

type UnitID =
  | "light_sound"
  | "idol"
  | "street"
  | "theme_park"
  | "school_refusal"
  | "piapro";

export interface Unit {
  id: UnitID;
  name: string;
  characters: Character[];
  logoImageUrl: string; // URL to the unit's cover image
  colorCode: string; // Hex color code for the unit
}
