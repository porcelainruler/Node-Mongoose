const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url, {
    useMongoClient: true
});

connect.then((db) => {

    //  *** Method-2 Using .Create() Method of Dishes
    Dishes.create({
        name: "Uthapizza4",
        description: "text"
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id , {
            $set: {description: 'Updated test'}
        },{
            new: true        // for exec to take updated document and niot non-updated one
        }).exec();
    })
    .then((dish) => {
        console.log(dish);

        dish.comments = dish.comments.concat({                             // Support for usePushEach is removed
                            rating: 5,                                     // from mongodb 5.0 and above hence puch is
                            comment: 'I\'m getting a Sinking feeling',     // not supported and hence concat method is used
                            author: 'Leonardo di Carpaccio'
                        });

        return dish.save();
    })
    .then((dish)=>{
        console.log(dish);    

        return db.collection("dishes").drop();
    })
    .then(() => {
        return db.close();
    })
    .catch((err) => {
        console.log(err);
    })
});

/*  ***  Method-1 First method for Creation of Dish Using new Keyword  ***
var newDish = Dishes({
    name: "Uthapizza",
    description: "text"
});

newDish.save()
    .then((dish) => {
        console.log(dish);

        return Dishes.find({}).exec();
    })
    .then((dishes) => {
        console.log(dishes);

        return db.collection("dishes").drop();
    })
    .then(() => {
        return db.close();
    })
    .catch((err) => {
        console.log(err);
    })
*/