const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const missionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date_begin:{
      type: Date,
      required:true
  },
  date_end:{
      type:Date,
      required: true
  },
  progression:{
    type: Number,
    required:true,
    min: 0,
    max: 100,
    default:0
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  objective:[{
  type: Schema.Types.ObjectId,
    ref: 'objectif'
  }],
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company'
  }

});

module.exports = mongoose.model('mission', missionSchema);
