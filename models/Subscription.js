const mongoose = require('mongoose');
const { Schema } = mongoose;


const Subscription = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    plan_duration:{
        type: String
    },
    plan_type:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    },
  });

  module.exports = mongoose.model('Subscription', Subscription);