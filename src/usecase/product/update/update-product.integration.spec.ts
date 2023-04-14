import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUsecase from "./update-product.usecase";

describe("Update Product usecase integration tests", () => {
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

  it("should update a product", async () => {
    const repository = new ProductRepository();
    const product = ProductFactory.create("a", "some name", 100);
    await repository.create(product);
    const usecase = new UpdateProductUsecase(repository);
    const input = {
      id: product.id,
      name: "Product",
      price: 10,
    };
    const result = await usecase.execute(input);

    expect(result).toEqual({
      id: product.id,
      name: input.name,
      price: input.price,
    });
  });
});
