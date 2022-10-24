import { Router } from "express";
// import { ContainerMemory } from "../Containers/ContainerMemory.js";
import { ProductDao } from "../Dao/index.js";

const productRouter = Router();
//   /api/productos

// const ProductMemory = new ContainerMemory();

// Hacemos que las rutas tengan su controlador async, ya que ahora ProductDao puede ser una instancia de clase Memoria o archivos (y archivos es async) (Entren a la carpeta src/api/index.js y van a ver que ahi se importan todos los Containers, y en base a alguna variable, es que creamos una instancia)
productRouter.get("/", async (req, res) => {
  const products = await ProductDao.getAll();

  res.send({ success: true, data: products });
});

productRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const product = await ProductDao.getById(Number(id));

  if (!product) {
    return res.send({
      success: false,
      data: undefined,
      message: "Product not found",
    });
  }

  res.send({ success: true, data: product });
});

productRouter.post("/", async (req, res) => {
  const { title, price, thumbnail } = req.body;

  const product = await ProductDao.save({ title, price, thumbnail });

  res.send({ success: true, data: { id: product.id } });
});

productRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, price, thumbnail } = req.body;

  const updatedProduct = await ProductDao.updateById(id, {
    title,
    price,
    thumbnail,
  });

  res.send({ success: true, data: { updated: updatedProduct } });
});

export { productRouter };
