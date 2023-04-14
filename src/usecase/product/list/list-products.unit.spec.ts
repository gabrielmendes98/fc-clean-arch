import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductsUseCase from "./list-products.usecase";

const products = [
  ProductFactory.create("a", "product", 10),
  ProductFactory.create("a", "product 2", 20),
];

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve(products)),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("List Products usecase unit tests", () => {
  it("should list products", async () => {
    const repository = MockRepository();
    const usecase = new ListProductsUseCase(repository);
    const result = await usecase.execute({});
    expect(result).toEqual({
      products: [
        {
          id: expect.any(String),
          name: products[0].name,
          price: products[0].price,
        },
        {
          id: expect.any(String),
          name: products[1].name,
          price: products[1].price,
        },
      ],
    });
  });
});
