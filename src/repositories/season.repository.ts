import { Season } from "../models/season.model";

class SeasonRepository {
  public async getAll() {
    return await Season.find({});
  }
  public async getOne(params) {
    return await Season.findOne(params);
  }
  public async createSeason(dto) {
    return await Season.create(dto);
  }
}

export const seasonRepository = new SeasonRepository();
