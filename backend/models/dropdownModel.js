import mongoose from 'mongoose';

const DropdownSchema = mongoose.Schema({
  fields: [
    {
      name: {type: String, required: true},
      streams: [{
        name: {type: String, required: true},
        subStreams: [{name:{type: String}}]
      }]
    }
  ],
});

export const DropdownData = mongoose.model('DropdownData', DropdownSchema);