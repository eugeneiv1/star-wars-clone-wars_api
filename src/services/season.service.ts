import { ApiError } from "../erros/api.error";
import { seasonRepository } from "../repositories/season.repository";

class SeasonService {
  public async getAll() {
    const seasons = await seasonRepository.getAll();
    if (!seasons) {
      throw new ApiError("No info", 400);
    }
    return seasons;
  }
}

export const seasonService = new SeasonService();
