const { Schema, model } = require("mongoose");
const animeSchema = new Schema(
  {
    canonicalTitle: {
      type: String,
      
    },
    synopsis: String,
  },
  
  {
    
    timestamps: true,
  }
);

const Anime = model("Anime", animeSchema);

module.exports = User;