import { Document } from "mongoose";

import { IEpisode } from "./episode.interface";

export interface ISeason extends Document {
  seasonNumber: number;
  episodes: IEpisode[];
}
