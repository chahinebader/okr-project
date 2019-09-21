const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companyLogSchema = new Schema({
 keyResult: {
    type: Schema.Types.ObjectId,
    ref: 'KeyResult'
},
 user: {
      type: Schema.Types.ObjectId,
      ref: 'user'
 },
 level: {
    type: Number,
    required: true
  },
  progression:{
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company'
  }
});

module.exports = mongoose.model('companyLog', companyLogSchema);
