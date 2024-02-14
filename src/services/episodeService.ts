import { ApiError } from "../erros/api.error";
import { IEpisode } from "../interfaces/episode.interface";
import { episodeRepository } from "../repositories/episodeRepository";
import { seasonRepository } from "../repositories/season.repository";
import { s3Service } from "./s3.service";

class EpisodeService {
  public async addEpisode(dto: IEpisode): Promise<IEpisode> {
    const episode = await episodeRepository.getOneEpisode({
      episodeName: dto.episodeName,
    });
    const entity = await seasonRepository.getOne({ season: dto.season });
    if (!entity) {
      await seasonRepository.createSeason({ season: dto.season, episodes: [] });
    }
    if (episode) {
      throw new ApiError("Episode exists", 400);
    }
    return await episodeRepository.addEpisode(dto.season, { ...dto });
  }

  public async UploadPoster(poster, posterName) {
    return await s3Service.uploadFile(poster, "posters", posterName);
  }
}

export const episodeService = new EpisodeService();
