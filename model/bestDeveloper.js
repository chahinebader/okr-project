const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bestDeveloperSchema = new Schema({
 name:{
  type: String,
  required: true
 },
 email: {
    type: String,
    required: true
  },
  status:{
    type: String,
    required: true,
  },
  avatar:{
     type: String,
     required: true
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company'
  }
  
});

module.exports = mongoose.model('bestDeveloper', bestDeveloperSchema);
