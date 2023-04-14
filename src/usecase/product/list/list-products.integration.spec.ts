import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductsUseCase from "./list-products.usecase";

describe("List Products usecase integration tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list products", async () => {
    const repository = new ProductRepository();
    await repository.create(ProductFactory.create("a", "product", 10));
    await repository.create(ProductFactory.create("a", "product 2", 20));
    const usecase = new ListProductsUseCase(repository);
    const result = await usecase.execute({});

    expect(result).toEqual({
      products: [
        {
          id: expect.any(String),
          name: "product",
          price: 10,
        },
        {
          id: expect.any(String),
          name: "product 2",
          price: 20,
        },
      ],
    });
  });
});
