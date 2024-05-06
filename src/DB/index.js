import connect from "./connect.js";
import app from "./server.js";

connect("mongodb://localhost:27017/docketflow").then(() => {
  app.listen(3001, () => {
    console.log("server is running on http://localhost:3001");
  });
});
