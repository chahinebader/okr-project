const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const keyResultSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date_begin: {
    type: Date,
    required: true
  },
  date_end: {
    type: Date,
    required: true
  },
  level: {
    type: Number,
    required: true,
    min: 1,
    max: 10

  },
  objective:{
    type: Schema.Types.ObjectId,
    ref: 'objectif'
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'user'
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
 commentaire:[{
    type: Schema.Types.ObjectId,
    ref: 'commentaire'
 }],
 company: {
   type: Schema.Types.ObjectId,
   ref: 'company'
 },
 member: {
  type: Schema.Types.ObjectId,
  ref: 'user'
}  
},{ timestamps: true }
);

module.exports = mongoose.model('KeyResult', keyResultSchema);
