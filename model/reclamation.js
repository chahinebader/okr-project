const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reclamationSchema = new Schema({
  objet: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  admin:{
    type: Schema.Types.ObjectId,
    ref: 'user' 
  },
  
  
});

module.exports = mongoose.model('reclamation', reclamationSchema);
