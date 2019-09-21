const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companySchema = new Schema({
  companyName: {
    type: String,
    required: true
  },
   interval:{
    type :String 
   },
  domain: {
    type: String,
    required: true
  },
  expired: {
    type: Boolean,
    default: false
  },
  companyAvatar: {
    type: String
  },
  ceo: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "company"
  },
  
},{ timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model("company", companySchema);
