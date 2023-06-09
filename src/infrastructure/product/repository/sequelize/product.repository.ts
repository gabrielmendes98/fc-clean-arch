import Product from "../../../../domain/product/entity/product";
import ProductInterface from "../../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../../domain/product/repository/product-repository.interface";
import ProductModel from "./product.model";

export default class ProductRepository implements ProductRepositoryInterface {
  async create(product: ProductInterface): Promise<void> {
    await ProductModel.create({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  }

  async update(product: ProductInterface): Promise<void> {
    await ProductModel.update(
      {
        name: product.name,
        price: product.price,
      },
      {
        where: {
          id: product.id,
        },
      }
    );
  }

  async find(id: string): Promise<Product> {
    const productModel = await ProductModel.findByPk(id);
    return new Product(productModel.id, productModel.name, productModel.price);
  }

  async findAll(): Promise<Product[]> {
    const productModels = await ProductModel.findAll();
    return productModels.map(
      (productModel) =>
        new Product(productModel.id, productModel.name, productModel.price)
    );
  }
}
