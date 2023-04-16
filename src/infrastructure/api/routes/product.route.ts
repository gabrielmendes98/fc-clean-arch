import express, { Request, Response } from "express";
import ListProductsUseCase from "../../../usecase/product/list/list-products.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import CreateProductUseCase from "../../../usecase/product/create/create-product.usecase";
import { InputCreateProductDto } from "../../../usecase/product/create/create-product.dto";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository());
  try {
    const productDto: InputCreateProductDto = {
      name: req.body.name,
      price: req.body.price,
    };
    const output = await usecase.execute(productDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductsUseCase(new ProductRepository());
  const output = await usecase.execute({});

  res.send(output);
});
