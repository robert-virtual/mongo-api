if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
  console.log("NODE_ENV: ",process.env.NODE_ENV);

}
import express from "express";
import cors from "cors";
import prodsRouter from "./routes/products";
const app = express();
const port = process.env.PORT || 3000;


//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())


//routes
app.use("/products",prodsRouter)



app.listen(port, () => {
  console.log(`server running on port ${port}...`);
});
