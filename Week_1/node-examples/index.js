const rect = require("./rectangle");

const solveRect = (l, b) => {
  console.log(`Solving rectangle with l = ${l} and b = ${b}`);

  rect(l, b, (err, rectangle) => {
    if (err) {
      console.log(`ERROR: ${err.message}`);
    } else {
      console.log(
        `The perimeter for rectangle(${l}, ${b}) is : ${rectangle.perimeter()}`
      );
      console.log(
        `The area for rectangle(${l}, ${b}) is : ${rectangle.area()}`
      );
    }
  });
  console.log("This statement is after the call rect()");
};

solveRect(2, 4);
solveRect(3, 5);
solveRect(0, 5);
solveRect(10, -3);
