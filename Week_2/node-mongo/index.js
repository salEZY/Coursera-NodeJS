const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const dboper = require("./operations");

const url = "mongodb://localhost:27017";
const dbname = "confusion";

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  assert.strictEqual(err, null);

  console.log("Connected to MongoDB server");

  const db = client.db(dbname);
  dboper.insertDocument(
    db,
    { name: "Lasagne", description: "NJAMI" },
    "dishes",
    (result) => {
      console.log("Insert Document: \n", result.ops);

      dboper.findDocuments(db, "dishes", (docs) => {
        console.log("Found documents: \n", docs);

        dboper.updateDocument(
          db,
          { name: "Lasagne" },
          { description: "NJAMI NJAMZI" },
          "dishes",
          (result) => {
            console.log("Updated document: " + result.result);

            dboper.findDocuments(db, "dishes", (docs) => {
              console.log("Found documents: \n", docs);

              db.dropCollection("dishes", (result) => {
                console.log("Dropped collection: " + result);

                client.close();
              });
            });
          }
        );
      });
    }
  );
});
