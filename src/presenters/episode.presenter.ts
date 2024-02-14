import { configs } from "../configs/configs";
import { IEpisode } from "../interfaces/episode.interface";

export class EpisodePresenter {
  public static episodeToResponse(episode: IEpisode) {
    return {
      episodeName: episode.episodeName,
      episodeNumber: episode.episodeNumber,
      season: episode.season,
      episodeAvatar: `${configs.AWS_S3_URL}${episode.episodeAvatar}`,
    };
  }
}
