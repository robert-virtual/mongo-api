import { Router } from "express";
// import { ProductsMysqlDao } from "../dao/mysql/ProductsMysqlDao";
import { ProductsMongoDao } from "../dao/mongo/ProductsMongoDao";
import { checkJwt } from "../middlewares/jwtMW";

// const products = new ProductsMysqlDao();
const products = new ProductsMongoDao();

const prodsRouter = Router();

prodsRouter.get("/", async (req, res) => {
  try {
    const { name } = req.query as { name: string };
    const data = await products.find({ name: {  $regex:new RegExp(name,"i") } });
    res.json({ msg: "get products", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

prodsRouter.get("/get/count", async (_req, res) => {
  try {
    const count = await products.collection.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

prodsRouter.get("/get/size", async (_req, res) => {
  try {
    const result = await products.aggregate([
      {
        $group: {
          _id: "$size",
          count: { $count: {} },
          totalPrice: { $sum: "$price" },
        },
      },
    ]);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

prodsRouter.get("/:id", async (req, res) => {
  try {
    const { id: _id } = req.params;
    const data = await products.findById(_id);
    res.json({ msg: `get ${_id} product`, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

prodsRouter.post("/", checkJwt, async (req, res) => {
  try {
    const data = await products.create({ ...req.body, user: req.user.userId });
    res.json({ msg: "post products", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

prodsRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await products.update(id, req.body);
    res.json({ msg: `put ${id} product`, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

prodsRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await products.delete(id);
    res.json({ msg: `delete ${id} products`, data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default prodsRouter;
