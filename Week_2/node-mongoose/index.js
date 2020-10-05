const mongoose = require("mongoose");

const Dishes = require("./models/dishes");

const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url);

connect
  .then((db) => {
    console.log("Connected correctly to the server!");

    let newDish = Dishes({
      name: "Pizza",
      description: "Biggest EVIL",
    });

    newDish
      .save()
      .then((dish) => {
        console.log(dish);

        return Dishes.find({}).exec();
      })
      .then((dishes) => {
        console.log(dishes);

        return Dishes.remove({});
      })
      .then(() => {
        return mongoose.connection.close();
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
