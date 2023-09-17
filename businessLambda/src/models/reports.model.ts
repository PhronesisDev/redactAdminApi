import mongoose, { Document, Schema } from "mongoose";

const userSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    name: {
      type: Schema.Types.String,
      required: true,
    },
    status: {
      type: Schema.Types.Array,
      required: false,
    },
    avatar: {
      type: Schema.Types.String,
      required: false,
    },
    identityNo: {
        type: Schema.Types.String,
        required: true,
    }
  },
  {
    collection: "reports",
    timestamps: true,
  }
);

const Reports = mongoose.model("reports", userSchema);

export { Reports };
