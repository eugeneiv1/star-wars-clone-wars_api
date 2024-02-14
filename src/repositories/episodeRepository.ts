import { FilterQuery } from "mongoose";

import { IEpisode } from "../interfaces/episode.interface";
import { Episode } from "../models/episode.model";
import { Season } from "../models/season.model";

class EpisodeRepository {
  public async getOneEpisode(params: FilterQuery<Partial<IEpisode>>) {
    return await Episode.findOne(params);
  }
  public async addEpisode(season, episodeInfo): Promise<IEpisode> {
    const createdEpisode = await Episode.create(episodeInfo);
    await Season.findOneAndUpdate(
      { season },
      { $push: { episodes: createdEpisode._id } },
      { new: true, useFindAndModify: false },
    );
    return createdEpisode;
  }
}

export const episodeRepository = new EpisodeRepository();
