import mongoose, { Document, Schema } from 'mongoose';

const userSchema = new Schema({
  registrationNo: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
}, {
  collection: "CompanyAuthentication",
  timestamps: true,
});

const Authentication = mongoose.model('Authentication', userSchema);

export { Authentication};
