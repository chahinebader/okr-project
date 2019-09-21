const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentaireSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  keyResult:{
    type: Schema.Types.ObjectId,
    ref: 'keyResult' 
  },
  creator:{
    type: Schema.Types.ObjectId,
    ref: 'user' 
  }
  
});

module.exports = mongoose.model('commentaire', commentaireSchema);
