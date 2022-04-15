const { Schema, model } = require("mongoose");
const commentSchema = new Schema(
  { name:{
    type:String,
    
},
animeName:{type: String},
    comment: {
      type: String,
      
      },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  anime: {
    type: Schema.Types.ObjectId,
    ref: "Anime",
  },
},
{
  timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
