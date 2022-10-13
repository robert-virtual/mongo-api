import { Router } from "express";
import { ProductsMysqlDao } from "../dao/mysql/ProductsMysqlDao";
// import { ProductsMongoDao } from "../dao/mongo/ProductsMongoDao";

const products = new ProductsMysqlDao();
const prodsRouter = Router();

prodsRouter.get("/", async (req, res) => {
  try {
    const { name } = req.query as { name: string };
    const data = await products.find({ name });
    res.json({ msg: "get products", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

prodsRouter.get("/:id", (req, res) => {
  const id = req.params.id;
  res.json({ msg: "get products" });
});

prodsRouter.post("/", async (req, res) => {
  try {
    const data = await products.create(req.body);
    res.json({ msg: "post products", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

prodsRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await products.update(id, req.body);
    res.json({ msg: "put products", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

prodsRouter.delete("/:id", (req, res) => {
  try {
    const id = req.params.id;
    const data = products.delete(id);
    res.json({ msg: "delete products",data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default prodsRouter;
