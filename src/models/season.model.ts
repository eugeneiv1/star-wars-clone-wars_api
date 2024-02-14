import { model, Schema } from "mongoose";

const SeasonSchema = new Schema(
  {
    season: {
      type: Number,
      required: true,
    },
    episodes: [{ type: Schema.Types.ObjectId, ref: "Episode" }],
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Season = model("season", SeasonSchema);
