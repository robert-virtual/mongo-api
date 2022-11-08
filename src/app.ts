if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
  console.log("NODE_ENV: ",process.env.NODE_ENV);

}
import express from "express";
import cors from "cors";
import prodsRouter from "./routes/products";
import authRouter from "./routes/auth";
const app = express();
const port = process.env.PORT || 3000;


//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())


//routes
app.use("/products",prodsRouter)
app.use("/auth",authRouter)



app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});
