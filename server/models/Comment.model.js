const { Schema, model } = require("mongoose");
const commentSchema = new Schema(
  { name:{
    type:String,
    // required: "This field is required"
},
animeName:{type: String},
    comment: {
      type: String,
      // required: "This field is required"
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
