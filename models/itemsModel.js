let mongoose = require('mongoose').connection
let Schema = require('mongoose').Schema

let itemSchema = new Schema({
    username: {
        type: String, required: true
    },
   name: {
        type: String, required: true
    },
    rentPrice: {
        type:Number,required: true,default:1
    },
    manufactureDate:{
        type:Date, required: true
    },
    actualCost:{
        type:Number,required: true
    },
    isRented:{
        type:Boolean, default:false
    },
    isActive:{
        type:Boolean, default:true
    },
})

const itemsModel = mongoose.model('items', itemSchema, 'items')
const item = new itemsModel();
item.save(function(error) {
  assert.equal(error.errors['name'].message,
    'Path `name` is required.');

  error = cat.validateSync();
  assert.equal(error.errors['name'].message,
    'Path `name` is required.');
});
module.exports = itemsModel