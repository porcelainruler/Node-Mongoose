const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    comments: [commentSchema]
},{
    timestamps: true
},{
     usePushEach: true    // for pushing in array and saving new dish (MongoDb 3.6 later release Error)
                          // Sorry but support for usePushEach is also removed from mongodb 5.0 and above
});

const Dishes = mongoose.model('Dish' , dishSchema);

module.exports = Dishes;