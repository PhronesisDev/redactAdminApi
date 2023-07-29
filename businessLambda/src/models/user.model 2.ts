import mongoose, { Document, Schema } from 'mongoose';

const userSchema = new Schema({
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  username: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
}, {
  collection: "businessUsers",
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

export { User};
