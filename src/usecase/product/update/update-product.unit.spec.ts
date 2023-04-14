import ProductFactory from "../../../domain/product/factory/product.factory";
import { InputUpdateProductDto } from "./update-product.dto";
import UpdateProductUsecase from "./update-product.usecase";

const product = ProductFactory.create("a", "some product", 100);

const input: InputUpdateProductDto = {
  id: product.id,
  name: "Product",
  price: 10,
};

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(product),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Update Product usecase unit tests", () => {
  it("should update a product", async () => {
    const repository = MockRepository();
    const usecase = new UpdateProductUsecase(repository);
    const result = await usecase.execute(input);
    expect(result).toEqual({
      id: product.id,
      name: input.name,
      price: input.price,
    });
  });

  it("should throw error when name is empty", () => {
    input.name = "";

    const repository = MockRepository();
    const usecase = new UpdateProductUsecase(repository);
    expect(usecase.execute(input)).rejects.toThrowError("Name is required");
  });

  it("should throw error when product not found", () => {
    const repository = MockRepository();
    repository.find.mockReturnValue(null);
    const usecase = new UpdateProductUsecase(repository);
    expect(usecase.execute(input)).rejects.toThrowError("Product not found");
  });
});
