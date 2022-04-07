const { Schema, model } = require("mongoose");
const animeSchema = new Schema(
  {
    canonicalTitle:String,
    synopsis: String,
    averageRating: String,
    favoritesCount: Number,
    startDate: String,
    endDate: String,
    coverImage: String,
    episodeCount: Number,
    episodeLength: Number,
    youtubeVideoId: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    
  },
  
  {
    
    timestamps: true,
  }
);

const Anime = model("Anime", animeSchema);

module.exports = Anime;