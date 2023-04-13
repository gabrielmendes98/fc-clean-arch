import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create-product.usecase";

describe("Create Product usecase integration tests", () => {
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

  it("should create a product", async () => {
    const repository = new ProductRepository();
    const usecase = new CreateProductUseCase(repository);
    const input = {
      name: "Product",
      price: 10,
    };
    const result = await usecase.execute(input);

    expect(result).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });
});
