/* eslint-disable no-undef */
import connect from "./connect.js";
import app from "./server.js";

const port = process.env.PORT || 3001;

connect(
  "mongodb+srv://thehetsolanki:het30122004@docketflow.xuxaeoj.mongodb.net/"
).then(() => {
  app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
  });
});
