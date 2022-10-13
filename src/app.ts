import express from "express";
const app = express();
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

app.listen(port, () => {
  console.log(`server running on port ${port}...`);
});
