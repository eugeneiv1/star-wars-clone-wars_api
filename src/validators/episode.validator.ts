import joi from "joi";

export class EpisodeValidator {
  private static episodeName = joi.string().trim();
  private static episodeNumber = joi.number().positive().integer();
  private static season = joi.number().integer().positive();
  private static minAvatarSize = 1 * 1024;
  private static maxAvatarSize = 10 * 1024 * 1024;
  private static episodeAvatar = joi.object({
    size: joi.number().min(this.minAvatarSize).max(this.maxAvatarSize),
    mimetype: joi.string().valid("imagwe/jpeg", "image/png"),
  });

  public static isEpisodeValid = joi.object({
    episodeName: this.episodeName.required(),
    episodeNumber: this.episodeNumber.required(),
    season: this.season.required(),
    episodeAvatar: this.episodeAvatar,
  });
}
