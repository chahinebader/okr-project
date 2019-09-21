const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const objectiveSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    default: 1,
    min: 1,
    max: 10

  },
  mission:{
    type: Schema.Types.ObjectId,
    ref: 'mission'
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  keyResult:[{
  type: Schema.Types.ObjectId,
  ref: 'keyResult'
  }],
  date_begin: {
    type: Date,
    required: true
  },
  date_end: {
    type: Date,
    required: true
  },
  progression:{
    type: Number,
    required: true,
    min: 0,
    max: 100,
    default:0
  },
  visibility:{
    type: Boolean,
    required: true
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'team'
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company'
  },
  supervisor: {
   type: Schema.Types.ObjectId,
   ref: 'user'
 } 
});

module.exports = mongoose.model('objectif', objectiveSchema);
