const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logSchema = new Schema({
 missions:{
  type: String,
  required: true
 },
 objectifs: {
    type: String,
    required: true
  },
 keyResults: {
    type: String,
    required: true
  },
  teams:{
    type: String,
    required: true
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company'
  }
 
});

module.exports = mongoose.model('log', logSchema);
