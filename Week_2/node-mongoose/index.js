const mongoose = require("mongoose");

const Dishes = require("./models/dishes");

const url = "mongodb://localhost:27017/confusion";
const connect = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

connect
  .then((db) => {
    console.log("Connected to MongoDB server!");

    Dishes.create({
      name: "Pizza",
      description: "Biggest EVIL",
    })
      .then((dish) => {
        console.log(dish);

        return Dishes.findByIdAndUpdate(
          dish._id,
          {
            $set: { description: "BIGGEST EVUL EVAR" },
          },
          { new: true }
        ).exec();
      })
      .then((dish) => {
        console.log(dish);

        dish.comments.push({
          rating: 5,
          comment: "Agreeed PIZZA IS THE WORST",
          author: "CHIKA SALEZY",
        });

        return dish.save();
      })
      .then((dish) => {
        console.log(dish);
        return Dishes.deleteMany({});
      })
      .then(() => {
        return mongoose.connection.close();
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
