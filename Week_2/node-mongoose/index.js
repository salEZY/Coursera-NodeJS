const mongoose = require("mongoose");

const Dishes = require("./models/dishes");

const url = "mongodb://localhost:27017/confusion";
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

connect
  .then((db) => {
    console.log("Connected to MongoDB server!");

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

        return Dishes.deleteMany({});
      })
      .then(() => {
        return mongoose.connection.close();
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
