import mongoose, { Document, Schema } from "mongoose";

const userSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    title: {
      type: Schema.Types.String,
      required: true,
    },
    company: {
      type: Schema.Types.Array,
      required: true,
    },
    reference: {
      type: Schema.Types.String,
      required: false,
    },
    description: {
      type: Schema.Types.String,
      required: false,
    },
    applicants: {
      type: Schema.Types.Array,
      required: false,
    },
  },
  {
    collection: "Posts",
    timestamps: true,
  }
);

const Posts = mongoose.model("Posts", userSchema);

export { Posts };
