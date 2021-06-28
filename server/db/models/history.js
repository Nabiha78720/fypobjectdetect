let mongoose = require('mongoose');
const { object } = require('yup');

let historySchema=mongoose.Schema({
    referenceId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    date:String,
    image:String,
    objects:[String]
});
let History= mongoose.model('history',historySchema);
module.exports=History;