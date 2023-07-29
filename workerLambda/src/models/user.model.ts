import mongoose, { Document, Schema } from 'mongoose';

const userSchema = new Schema({
  identityNo: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
}, {
  collection: "Authentication",
  timestamps: true,
});

const Authentication = mongoose.model('Authentication', userSchema);

export { Authentication};
