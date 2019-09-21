const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date_send: {
    type: Date,
    required: true
  },
  destination:{
    type: Schema.Types.ObjectId,
    ref: 'user' 
  },
  vu: {
    type: Boolean,
    default: false
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company'
  }
  
});

module.exports = mongoose.model('notification', notificationSchema);
