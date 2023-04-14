import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUsecase from "./find-product.usecase";

describe("Find Product usecase integration tests", () => {
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

  it("should find a product", async () => {
    const repository = new ProductRepository();
    const product = ProductFactory.create("a", "product", 10);
    await repository.create(product);
    const usecase = new FindProductUsecase(repository);
    const result = await usecase.execute({
      id: product.id,
    });

    expect(result).toEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });
});
