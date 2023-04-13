import { InputCreateProductDto } from "./create-product.dto";
import CreateProductUseCase from "./create-product.usecase";

const input: InputCreateProductDto = {
  name: "Product",
  price: 10,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Create Product usecase unit tests", () => {
  it("should create a product", async () => {
    const repository = MockRepository();
    const usecase = new CreateProductUseCase(repository);
    const result = await usecase.execute(input);
    expect(result).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should throw error when name is empty", () => {
    input.name = "";

    const repository = MockRepository();
    const usecase = new CreateProductUseCase(repository);
    expect(usecase.execute(input)).rejects.toThrowError("Name is required");
  });
});
