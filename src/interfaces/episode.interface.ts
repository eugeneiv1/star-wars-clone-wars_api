import { Document } from "mongoose";
export interface IEpisode extends Document {
  episodeName: string;
  episodeNumber: number;
  season: number;
  episodeAvatar: string;
}
