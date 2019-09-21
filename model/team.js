const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const teamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  color:{
    type: String,
    required: true
  },
  creator:{
    type: Schema.Types.ObjectId,
      ref: 'user'
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: 'company'
    }
});

module.exports = mongoose.model('team', teamSchema);
