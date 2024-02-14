import { model, Schema } from "mongoose";

import { IEpisode } from "../interfaces/episode.interface";

const EpisodeSchema = new Schema(
  {
    episodeName: {
      type: Object,
      required: true,
    },
    episodeAvatar: {
      type: String,
    },
    episodeNumber: {
      type: Number,
      required: true,
    },
    season: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Episode = model<IEpisode>("episode", EpisodeSchema);
