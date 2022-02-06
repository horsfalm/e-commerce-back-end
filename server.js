const express = require("express");
const routes = require("./routes");
const sequelize = require("./config/connection");
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(routes);

let syncOptions = { force: false };
if (process.env.NODE_ENV === "development") {
  syncOptions.force = true;
}

sequelize.sync(syncOptions).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});
