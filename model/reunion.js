const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reunionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    
  },
  creator:{
    type: Schema.Types.ObjectId,
    ref: 'user' 
  },
  team: {
      type: Schema.Types.ObjectId,
      ref: 'team'
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company'
  }
  
  
});

module.exports = mongoose.model('reunion', reunionSchema);
