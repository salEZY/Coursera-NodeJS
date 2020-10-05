const MongoClient = require("mongodb").MongoClient;

const dboper = require("./operations");

const url = "mongodb://localhost:27017";
const dbname = "confusion";

MongoClient.connect(url, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to MongoDB server");

    const db = client.db(dbname);
    dboper
      .insertDocument(db, { name: "Lasagne", description: "NJAMI" }, "dishes")
      .then((result) => {
        console.log("Insert Document: \n", result.ops);

        return dboper.findDocuments(db, "dishes");
      })
      .then((docs) => {
        console.log("Found documents: \n", docs);

        return dboper.updateDocument(
          db,
          { name: "Lasagne" },
          { description: "NJAMI NJAMZI" },
          "dishes"
        );
      })
      .then((result) => {
        console.log("Updated document: " + result.result);

        return dboper.findDocuments(db, "dishes");
      })
      .then((docs) => {
        console.log("Found documents: \n", docs);

        return db.dropCollection("dishes");
      })
      .then((result) => {
        console.log("Dropped collection: " + result);

        client.close();
      });
  })
  .catch((err) => console.log(err));
