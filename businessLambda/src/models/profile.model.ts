import mongoose, { Document, Schema } from 'mongoose';

const PROFILE_SCHEMA = new Schema({
  avatar: {
    type: Schema.Types.String,
    required: false,
  },
  description:{
    type: Schema.Types.String,
    required: false,
  },
  reference:{
    type: Schema.Types.String,
    required: false,
  },
  email:{
    type: Schema.Types.String,
    required: false,
  },
  file: {
    type: Schema.Types.String,
    required: false,
  },
}, {
  collection: "profiles",
  timestamps: true,
});

const Profile = mongoose.model('Profile', PROFILE_SCHEMA);

export { Profile};