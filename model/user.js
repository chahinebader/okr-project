const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
 name:{
  type: String,
  required: true
 },
 email: {
    type: String,
    required: true,
    unique: true
  },
 password: {
    type: String,
    required: true
  },
  status:{
    type: String,
    required: true,
    enum: ['superAdmin','admin','superviseur','membre']
  },
  avatar:{
     type: String,
     required: true
  },
  expired:{
    type: Boolean,
    required: true,
    default: false
  },
  progressofmounth: {
    type: Number,
    default: 0,
  },
  dateofprogress: {
    type: Date

  },
  team: [
    {
      type: Schema.Types.ObjectId,
      ref: 'team'
    }
  ],
  notification:[
    {
      type: Schema.Types.ObjectId,
      ref: 'notification'
    }
  ],
  reclamation:[
    {
      type: Schema.Types.ObjectId,
      ref: 'reclamation'
    }
  ],
  mission:[
    {
      type: Schema.Types.ObjectId,
      ref: 'mission'
    }
  ],
  objective:[
    {
      type: Schema.Types.ObjectId,
      ref: 'objective'
    }
  ],
  keyResult:[
    {
      type: Schema.Types.ObjectId,
      ref: 'keyResult'
    }
  ],
  
    resetPasswordToken: {
      type: String
    },
    resetPasswordExpires:{ 
      type: Date
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: 'company'
    }
});

module.exports = mongoose.model('user', userSchema);
