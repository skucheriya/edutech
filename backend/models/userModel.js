import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  number: {type: String, required: true},
  token: {type: String, required: true},
  educationDesc: {type: String},
  dob: {type: String, required: true},
  picture: {type: String, required: true},
  role: {type: String},
  sector: {type:String},
  stream: {type:String},
  subStream: {type:String}
}, {timestamps: true});

export const User = mongoose.model('User', UserSchema);