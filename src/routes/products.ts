import { Router } from "express";
import { ProductsMysqlDao } from "../dao/mysql/ProductsMysqlDao";
// import { ProductsMongoDao } from "../dao/mongo/ProductsMongoDao";

const products = new ProductsMysqlDao();
const prodsRouter = Router();

prodsRouter.get("/", async (_req, res) => {
  try {
    const data = await products.find();
    res.json({ msg: "get prodcuts", data });
    
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
});

prodsRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  res.json({ msg: "get prodcuts" });
});

prodsRouter.post("/", async (req, res) => {
  try {
    const data = await products.create(req.body);
    res.json({ msg: "post prodcuts", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

prodsRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  res.json({ msg: "put prodcuts" });
});

prodsRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  res.json({ msg: "delete prodcuts" });
});

export default prodsRouter;
