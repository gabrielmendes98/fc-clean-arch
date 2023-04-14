import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUsecase from "./find-product.usecase";

const product = ProductFactory.create("a", "product", 10);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Find Product usecase unit tests", () => {
  it("should find a product", async () => {
    const repository = MockRepository();
    const usecase = new FindProductUsecase(repository);
    const result = await usecase.execute({ id: "123" });
    expect(result).toEqual({
      id: expect.any(String),
      name: product.name,
      price: product.price,
    });
  });

  it("should throw error when do not find product", () => {
    const repository = MockRepository();
    repository.find.mockReturnValue(Promise.resolve(null));
    const usecase = new FindProductUsecase(repository);
    expect(() => {
      return usecase.execute({ id: "123" });
    }).rejects.toThrow("Product not found");
  });
});
